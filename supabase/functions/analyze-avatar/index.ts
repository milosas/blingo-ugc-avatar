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

interface AnalyzeResult {
  description: string
  avatarType: 'photo' | 'stylized'
}

// Analyze avatar image using OpenAI Vision API
async function analyzeAvatarImage(imageUrl: string): Promise<AnalyzeResult> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Describe this person for image generation prompts. Include: gender, approximate age, hair style/color, notable facial features, overall style (casual/professional/athletic). Keep under 50 words. Also state whether this is a real photograph or stylized/illustrated art.'
            },
            {
              type: 'image_url',
              image_url: { url: imageUrl }
            }
          ]
        }
      ],
      max_tokens: 150
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`OpenAI API error: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  const description = data.choices?.[0]?.message?.content?.trim()

  if (!description) {
    throw new Error('No description returned from OpenAI')
  }

  // Detect avatar type from description
  const lowerDesc = description.toLowerCase()
  const isStylized = [
    'illustration',
    'stylized',
    'artwork',
    'cartoon',
    'animated',
    'drawn',
    'digital art',
    'painting'
  ].some(term => lowerDesc.includes(term))

  const avatarType: 'photo' | 'stylized' = isStylized ? 'stylized' : 'photo'

  return { description, avatarType }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Validate API key is configured
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not configured')
      return new Response(
        JSON.stringify({
          success: false,
          error: 'OpenAI API key not configured'
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate Supabase credentials
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Supabase credentials not configured')
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Supabase credentials not configured'
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const body: AnalyzeRequest = await req.json()

    // Validate request parameters
    if (!body.avatarId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing avatarId parameter'
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (!body.imageUrl) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing imageUrl parameter'
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Analyze the avatar image
    console.log('Analyzing avatar:', body.avatarId)
    const { description, avatarType } = await analyzeAvatarImage(body.imageUrl)
    console.log('Analysis complete:', { description, avatarType })

    // Update database with results using service role key (bypasses RLS)
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    const { error: updateError } = await supabase
      .from('custom_avatars')
      .update({
        description,
        avatar_type: avatarType
      })
      .eq('id', body.avatarId)

    if (updateError) {
      console.error('Database update error:', updateError)
      // Log error but don't fail response - avatar is still usable
    } else {
      console.log('Database updated successfully')
    }

    const response: AnalyzeResponse = {
      success: true,
      description,
      avatarType
    }

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error:', error.message)

    const response: AnalyzeResponse = {
      success: false,
      error: error.message || 'Avatar analysis failed'
    }

    return new Response(JSON.stringify(response), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
