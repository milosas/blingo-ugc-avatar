import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const LATE_API_KEY = Deno.env.get('LATE_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ConnectRequest {
  action: 'get-auth-url' | 'list-accounts'
  platform?: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!LATE_API_KEY) {
      throw new Error('LATE_API_KEY not configured')
    }

    const body: ConnectRequest = await req.json()

    if (!body.action) {
      return new Response(
        JSON.stringify({ success: false, error: 'Privalomas laukas: action' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (body.action === 'get-auth-url') {
      if (!body.platform) {
        return new Response(
          JSON.stringify({ success: false, error: 'Privalomas laukas: platform' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      console.log('Getting auth URL for platform:', body.platform)

      const response = await fetch(`https://getlate.dev/api/v1/connect/${body.platform}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${LATE_API_KEY}`,
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('LATE API connect error:', response.status, errorText)
        throw new Error(`LATE API error: ${response.status}`)
      }

      const result = await response.json()

      return new Response(
        JSON.stringify({ success: true, authUrl: result.authUrl || result.url }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (body.action === 'list-accounts') {
      console.log('Listing connected accounts')

      const response = await fetch('https://getlate.dev/api/v1/accounts', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${LATE_API_KEY}`,
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('LATE API accounts error:', response.status, errorText)
        throw new Error(`LATE API error: ${response.status}`)
      }

      const result = await response.json()

      return new Response(
        JSON.stringify({ success: true, accounts: result }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Nežinomas action tipas' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Connect social account error:', error.message)
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Prisijungimo klaida. Bandykite dar kartą.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
