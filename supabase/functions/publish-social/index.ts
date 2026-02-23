import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const LATE_API_KEY = Deno.env.get('LATE_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PublishRequest {
  text: string
  imageUrl?: string
  platforms: { platform: string; accountId: string }[]
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!LATE_API_KEY) {
      throw new Error('LATE_API_KEY not configured')
    }

    const body: PublishRequest = await req.json()

    if (!body.text || !body.platforms?.length) {
      return new Response(
        JSON.stringify({ success: false, error: 'Privalomi laukai: text ir platforms' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Build LATE API request
    const latePayload: Record<string, unknown> = {
      content: body.text,
      publishNow: true,
      platforms: body.platforms.map(p => ({
        platform: p.platform,
        accountId: p.accountId,
      })),
    }

    // Include media if image URL provided
    if (body.imageUrl) {
      latePayload.media = [{ url: body.imageUrl, type: 'image' }]
    }

    console.log('Publishing to LATE API:', JSON.stringify({ platforms: body.platforms.length, hasImage: !!body.imageUrl }))

    const response = await fetch('https://getlate.dev/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LATE_API_KEY}`,
      },
      body: JSON.stringify(latePayload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('LATE API error:', response.status, errorText)
      throw new Error(`LATE API error: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    console.log('LATE API response:', JSON.stringify(result))

    return new Response(
      JSON.stringify({ success: true, results: result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Publish social error:', error.message)
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Skelbimo klaida. Bandykite dar kartą.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
