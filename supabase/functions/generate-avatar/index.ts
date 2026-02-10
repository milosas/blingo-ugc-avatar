import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts"

const KIE_API_KEY = Deno.env.get('KIE_API_KEY')
const KIE_CREATE_TASK_URL = 'https://api.kie.ai/api/v1/jobs/createTask'
const KIE_POLL_URL = 'https://api.kie.ai/api/v1/jobs/recordInfo'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface GenerateAvatarRequest {
  prompt: string
}

// Download generated image and convert to base64
async function downloadImageAsBase64(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl)
  if (!response.ok) {
    throw new Error(`Download failed: ${response.status}`)
  }
  const arrayBuffer = await response.arrayBuffer()
  const base64 = base64Encode(new Uint8Array(arrayBuffer))
  const contentType = response.headers.get('content-type') || 'image/png'
  return `data:${contentType};base64,${base64}`
}

// Create text-to-image generation task
async function createTask(prompt: string): Promise<string> {
  const response = await fetch(KIE_CREATE_TASK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${KIE_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'seedream/4.5-text-to-image',
      input: {
        prompt,
        aspect_ratio: '1:1',
        quality: 'high',
      },
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    console.error('Create task error response:', response.status, errorBody)
    throw new Error(`Create task failed: ${response.status} - ${errorBody}`)
  }

  const data = await response.json()
  console.log('Create task response:', JSON.stringify(data))
  const taskId = data.data?.taskId

  if (!taskId) {
    throw new Error(`No taskId in response: ${JSON.stringify(data)}`)
  }

  return taskId
}

// Poll for task completion
async function pollTask(taskId: string): Promise<string> {
  const maxPolls = 8
  const pollInterval = 15000

  for (let i = 0; i < maxPolls; i++) {
    await new Promise(resolve => setTimeout(resolve, pollInterval))

    const response = await fetch(`${KIE_POLL_URL}?taskId=${taskId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${KIE_API_KEY}`,
      },
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error('Poll error response:', response.status, errorBody)
      throw new Error(`Poll failed: ${response.status} - ${errorBody}`)
    }

    const data = await response.json()
    const state = data.data?.state
    console.log(`Poll attempt ${i + 1}/${maxPolls}: state=${state}`)

    if (state === 'success') {
      const resultJson = data.data?.resultJson
      if (resultJson) {
        try {
          const result = JSON.parse(resultJson)
          if (result.resultUrls && result.resultUrls.length > 0) {
            const base64 = await downloadImageAsBase64(result.resultUrls[0])
            return base64
          }
        } catch (e) {
          throw new Error('Failed to parse result')
        }
      }
      throw new Error('No result URLs in response')
    }

    if (state === 'fail') {
      throw new Error(data.data?.failMsg || 'Generation failed')
    }
  }

  throw new Error('Generation timed out')
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!KIE_API_KEY) {
      throw new Error('KIE_API_KEY not configured')
    }

    const body: GenerateAvatarRequest = await req.json()

    if (!body.prompt) {
      throw new Error('No prompt provided')
    }

    console.log('Generating avatar with prompt:', body.prompt.substring(0, 100))

    const taskId = await createTask(body.prompt)
    console.log('Task created:', taskId)

    const base64Image = await pollTask(taskId)
    console.log('Avatar generated successfully')

    return new Response(JSON.stringify({
      success: true,
      image: base64Image,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error:', error.message)

    return new Response(JSON.stringify({
      success: false,
      error: error.message,
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
