import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ImproviseRequest {
  industry: string
  existingText?: string
  target: 'image' | 'post' | 'topic'
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

    let systemPrompt: string
    let userContent: string
    let maxTokens = 200

    if (body.target === 'topic') {
      // Generate just a short topic/theme idea, not a full post
      systemPrompt = `Tu esi kūrybinis Lietuvos verslo turinio strategas. Sugalvok trumpą, konkrečią TEMĄ socialinio tinklo įrašui pagal nurodytą sritį. Rašyk tik temą/idėją lietuviškai - vieną trumpą sakinį arba frazę (5-15 žodžių). Tai turi būti temos pasiūlymas, NE pilnas įrašo tekstas. Nerašyk jokių paaiškinimų - tik pačią temą.`
      maxTokens = 60

      if (body.existingText?.trim()) {
        userContent = `Sritis: ${body.industry}\nEsama tema: ${body.existingText}\nPasiūlyk kitą panašią arba geresnę temą.`
      } else {
        userContent = `Sritis: ${body.industry}\nPasiūlyk įdomią temą socialinio tinklo įrašui.`
      }
    } else {
      const targetLabel = body.target === 'image' ? 'marketingo nuotraukai' : 'socialinio tinklo įrašui'
      systemPrompt = `Tu esi kūrybinis Lietuvos verslo turinio generatorius. Sugalvok konkretų, kūrybišką aprašymą ${targetLabel} pagal nurodytą sritį. Jei pateiktas esamas tekstas - patobulink jį. Rašyk TIKTAI aprašymo tekstą lietuviškai, 1-3 sakinius. Nerašyk jokių paaiškinimų ar komentarų - tik patį tekstą.`

      if (body.existingText?.trim()) {
        userContent = `Sritis: ${body.industry}\nEsamas tekstas: ${body.existingText}\nPatobulink jį arba sugalvok naują variantą.`
      } else {
        userContent = `Sritis: ${body.industry}\nSugalvok kūrybišką aprašymą.`
      }
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
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent }
        ],
        temperature: 0.9,
        max_tokens: maxTokens,
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
