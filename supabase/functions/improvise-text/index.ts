import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ImproviseRequest {
  industry: string
  existingText?: string
  target: 'image' | 'post'
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured')
    }

    const body: ImproviseRequest = await req.json()

    if (!body.industry) {
      return new Response(
        JSON.stringify({ success: false, error: 'Industry is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const targetLabel = body.target === 'image' ? 'marketingo nuotraukai' : 'socialinio tinklo įrašui'

    let userContent: string
    if (body.existingText?.trim()) {
      userContent = `Sritis: ${body.industry}\nEsamas tekstas: ${body.existingText}\nPatobulink jį arba sugalvok naują variantą.`
    } else {
      userContent = `Sritis: ${body.industry}\nSugalvok kūrybišką aprašymą.`
    }

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
            role: 'system',
            content: `Tu esi kūrybinis Lietuvos verslo turinio generatorius. Sugalvok konkretų, kūrybišką aprašymą ${targetLabel} pagal nurodytą sritį. Jei pateiktas esamas tekstas - patobulink jį. Rašyk TIKTAI aprašymo tekstą lietuviškai, 1-3 sakinius. Nerašyk jokių paaiškinimų ar komentarų - tik patį tekstą.`
          },
          { role: 'user', content: userContent }
        ],
        temperature: 0.9,
        max_tokens: 200,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI error:', response.status, errorText)
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const result = await response.json()
    const text = result.choices?.[0]?.message?.content?.trim()

    if (!text) {
      throw new Error('No text in OpenAI response')
    }

    return new Response(
      JSON.stringify({ success: true, text }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Improvise text error:', error.message)
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Improvizavimo klaida' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
