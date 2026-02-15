import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AnalyzeRequest {
  avatarId: string
  imageUrl: string
}

interface AnalyzeResponse {
  success: boolean
  description?: string
  avatarType?: 'photo' | 'stylized'
  error?: string
}

/**
 * Analyze avatar image using OpenAI Vision API
 * Returns a description suitable for image generation prompts
 */
async function analyzeAvatarImage(imageUrl: string): Promise<string> {
  console.log('Calling OpenAI Vision API for image analysis...')

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Describe this person for image generation prompts. Include: gender, approximate age, hair style/color, notable facial features, overall style (casual/professional/athletic). Keep under 50 words. Also state whether this is a real photograph or stylized/illustrated art.',
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 150,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`OpenAI API error: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  const description = data.choices[0].message.content
  console.log('OpenAI Vision analysis complete')
  return description
}

/**
 * Detect whether avatar is a photo or stylized art based on description
 */
function detectAvatarType(description: string): 'photo' | 'stylized' {
  const lowerDesc = description.toLowerCase()
  const stylizedKeywords = [
    'illustration',
    'stylized',
    'artwork',
    'cartoon',
    'animated',
    'drawn',
    'digital art',
    'painting',
  ]

  const isStylized = stylizedKeywords.some(keyword => lowerDesc.includes(keyword))
  return isStylized ? 'stylized' : 'photo'
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Validate OpenAI API key
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured')
    }

    // Parse request body
    const body: AnalyzeRequest = await req.json()

    // Validate required fields
    if (!body.avatarId || !body.imageUrl) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields: avatarId and imageUrl',
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    console.log('Analyzing avatar:', body.avatarId)

    // Analyze image with OpenAI Vision
    const description = await analyzeAvatarImage(body.imageUrl)

    // Detect avatar type
    const avatarType = detectAvatarType(description)
    console.log('Analysis complete:', avatarType)

    // Update database with service role key (bypasses RLS)
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { autoRefreshToken: false, persistSession: false }
    })

    const { error: updateError } = await supabase
      .from('custom_avatars')
      .update({
        description,
        avatar_type: avatarType,
      })
      .eq('id', body.avatarId)

    // Non-blocking DB error handling - log but don't throw
    if (updateError) {
      console.error('Database update failed:', updateError.message)
      // Don't throw - allow the response to succeed even if DB update fails
    } else {
      console.log('Avatar metadata updated successfully')
    }

    // Return success response
    const response: AnalyzeResponse = {
      success: true,
      description,
      avatarType,
    }

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Avatar analysis error:', error.message)

    const response: AnalyzeResponse = {
      success: false,
      error: error.message || 'Avatar analysis failed',
    }

    return new Response(JSON.stringify(response), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
