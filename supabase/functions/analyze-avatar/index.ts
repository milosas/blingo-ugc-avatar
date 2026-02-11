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

// Call OpenAI Vision API to analyze avatar image
async function analyzeAvatarImage(imageUrl: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
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
              image_url: {
                url: imageUrl
              }
            }
          ]
        }
      ],
      max_tokens: 150
    })
  })

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}

// Detect whether avatar is photo or stylized based on AI description
function detectAvatarType(description: string): 'photo' | 'stylized' {
  const keywords = [
    'illustration',
    'stylized',
    'artwork',
    'cartoon',
    'animated',
    'drawn',
    'digital art',
    'painting'
  ]

  const lowerDescription = description.toLowerCase()
  const isStylized = keywords.some(keyword => lowerDescription.includes(keyword))

  return isStylized ? 'stylized' : 'photo'
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Validate API key is configured
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured')
    }

    const body: AnalyzeRequest = await req.json()

    // Validate request
    if (!body.avatarId) {
      return new Response(
        JSON.stringify({ success: false, error: 'avatarId is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!body.imageUrl) {
      return new Response(
        JSON.stringify({ success: false, error: 'imageUrl is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Analyzing avatar:', body.avatarId)

    // Call OpenAI Vision API
    const description = await analyzeAvatarImage(body.imageUrl)
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
        avatar_type: avatarType
      })
      .eq('id', body.avatarId)

    // Non-blocking DB error handling - log but don't fail response
    if (updateError) {
      console.error('Database update failed:', updateError.message)
      // Avatar still usable even if DB update fails
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
      error: error.message
    }

    return new Response(JSON.stringify(response), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})
