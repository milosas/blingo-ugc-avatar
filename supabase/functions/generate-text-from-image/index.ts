import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface GenerateRequest {
  imageUrl: string
  tone?: 'professional' | 'friendly' | 'motivating' | 'humorous'
  emoji?: 'yes' | 'no' | 'minimal'
  length?: 'short' | 'medium' | 'long'
}

function buildSystemPrompt(): string {
  return `Tu esi socialinių tinklų turinio ekspertas Lietuvoje.
Tavo užduotis — pagal pateiktą nuotrauką sukurti patrauklų socialinio tinklo įrašo tekstą lietuvių kalba.

TAISYKLĖS:
- Analizuok nuotrauką: kas joje vaizduojama, kokia nuotaika, spalvos, kontekstas
- Rašyk natūraliu lietuvišku tonu, tinkamu socialiniams tinklams
- Tekstas turi būti patrauklus ir skatinti engagement
- VISADA įtrauk raginimą veikti (CTA) pabaigoje
- Pritaikyk tekstą pasirinktam tonui, emoji naudojimui ir ilgiui
- Nerašyk hashtag'ų, nebent jie labai tinkami`
}

function buildUserPrompt(request: GenerateRequest): string {
  const toneMap: Record<string, string> = {
    professional: 'profesionalus',
    friendly: 'draugiškas',
    motivating: 'motyvuojantis',
    humorous: 'humoristinis'
  }

  const emojiMap: Record<string, string> = {
    yes: 'Naudok emoji',
    no: 'Nenaudok emoji',
    minimal: 'Naudok minimaliai emoji (1-2)'
  }

  const lengthMap: Record<string, string> = {
    short: 'Trumpas (2-3 sakiniai)',
    medium: 'Vidutinis (4-6 sakiniai)',
    long: 'Ilgas (7-10 sakiniai)'
  }

  return `Pagal šią nuotrauką sukurk socialinio tinklo įrašo tekstą.

Tonas: ${toneMap[request.tone || 'friendly']}
Emoji: ${emojiMap[request.emoji || 'minimal']}
Ilgis: ${lengthMap[request.length || 'medium']}

Rašyk TIK įrašo tekstą, be jokių paaiškinimų ar komentarų.`
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured')
    }

    const body: GenerateRequest = await req.json()

    if (!body.imageUrl) {
      return new Response(
        JSON.stringify({ error: 'validation_error', message: 'Privalomas laukas: imageUrl' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const systemPrompt = buildSystemPrompt()
    const userPrompt = buildUserPrompt(body)

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
          {
            role: 'user',
            content: [
              { type: 'text', text: userPrompt },
              { type: 'image_url', image_url: { url: body.imageUrl, detail: 'low' } },
            ],
          },
        ],
        stream: true,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', response.status, errorText)
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Generate text from image error:', error.message)
    return new Response(
      JSON.stringify({ error: 'internal_error', message: 'Teksto generavimas nepavyko. Bandykite dar kartą.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
