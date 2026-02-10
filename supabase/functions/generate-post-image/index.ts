import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const KIE_API_KEY = Deno.env.get('KIE_API_KEY')
const KIE_API_URL = 'https://api.kie.ai/api/v1/jobs'
const KIE_MODEL = 'seedream/4.5-text-to-image'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface KieCreateTaskResponse {
  code: number
  message: string
  data?: { taskId: string }
}

interface KieQueryTaskResponse {
  code: number
  message: string
  data?: {
    state: 'pending' | 'running' | 'success' | 'fail'
    resultJson?: string
    failMsg?: string
  }
}

async function createKieTask(prompt: string): Promise<string> {
  const response = await fetch(`${KIE_API_URL}/createTask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${KIE_API_KEY}`,
    },
    body: JSON.stringify({
      model: KIE_MODEL,
      input: {
        prompt,
        aspect_ratio: '1:1',
        quality: 'high',
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`KIE API error: ${response.status} ${response.statusText}`)
  }

  const result: KieCreateTaskResponse = await response.json()

  if (result.code !== 200 || !result.data?.taskId) {
    throw new Error(`KIE task creation failed: ${result.message}`)
  }

  return result.data.taskId
}

async function queryKieTask(taskId: string): Promise<{ state: string; imageUrl?: string; error?: string }> {
  const response = await fetch(`${KIE_API_URL}/queryTask?taskId=${taskId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${KIE_API_KEY}`,
    },
  })

  if (!response.ok) {
    throw new Error(`KIE API error: ${response.status} ${response.statusText}`)
  }

  const result: KieQueryTaskResponse = await response.json()

  if (result.code !== 200 || !result.data) {
    throw new Error(`KIE task query failed: ${result.message}`)
  }

  const { state, resultJson, failMsg } = result.data

  if (state === 'success' && resultJson) {
    const parsed = JSON.parse(resultJson)
    const imageUrl = parsed.resultUrls?.[0] || parsed.imageUrl
    return { state, imageUrl }
  }

  if (state === 'fail') {
    return { state, error: failMsg || 'Image generation failed' }
  }

  return { state }
}

async function waitForKieResult(taskId: string, maxWaitMs: number = 55000): Promise<string> {
  const startTime = Date.now()
  const pollInterval = 2000

  while (Date.now() - startTime < maxWaitMs) {
    const result = await queryKieTask(taskId)

    if (result.state === 'success' && result.imageUrl) {
      return result.imageUrl
    }

    if (result.state === 'fail') {
      throw new Error(result.error || 'Image generation failed')
    }

    await new Promise(resolve => setTimeout(resolve, pollInterval))
  }

  throw new Error('Image generation timed out')
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!KIE_API_KEY) {
      throw new Error('KIE_API_KEY not configured')
    }

    const body: { industry: string; prompt: string } = await req.json()

    if (!body.industry || !body.prompt) {
      return new Response(
        JSON.stringify({ error: 'validation_error', message: 'Privalomi laukai: industry ir prompt' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const imagePrompt = `${body.prompt} for ${body.industry} business, professional, high-quality, social media post image, modern aesthetic, clean composition`

    console.log('Creating image task:', imagePrompt.substring(0, 100))
    const taskId = await createKieTask(imagePrompt)
    console.log('Task created:', taskId)

    const imageUrl = await waitForKieResult(taskId)
    console.log('Image generated:', imageUrl.substring(0, 50))

    return new Response(
      JSON.stringify({ success: true, imageUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Generate post image error:', error.message)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    if (errorMessage.includes('timed out')) {
      return new Response(
        JSON.stringify({ error: 'timeout', message: 'Paveikslėlio generavimas užtruko per ilgai. Bandykite dar kartą.' }),
        { status: 504, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: 'internal_error', message: 'Generavimo klaida. Bandykite dar kartą.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
