import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const KIE_API_KEY = Deno.env.get('KIE_API_KEY')
const KIE_UPLOAD_URL = 'https://kieai.redpandaai.co/api/file-base64-upload'
const KIE_CREATE_TASK_URL = 'https://api.kie.ai/api/v1/jobs/createTask'
const KIE_POLL_URL = 'https://api.kie.ai/api/v1/jobs/recordInfo'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface GenerateRequest {
  prompt: string
  aspect_ratio: string
  resolution: string
  imageCount: number
  images: string[] // base64 data URLs
  avatarId?: string
}

interface GeneratedImage {
  url: string
}

interface GenerateResponse {
  success: boolean
  images?: GeneratedImage[]
  message?: string
  error?: string
}

// Upload base64 image to kie.ai file service
async function uploadImage(base64Data: string): Promise<string> {
  const response = await fetch(KIE_UPLOAD_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${KIE_API_KEY}`,
    },
    body: JSON.stringify({
      base64Data,
      uploadPath: 'ugc',
      fileName: `img${Date.now()}.jpg`,
    }),
  })

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status}`)
  }

  const data = await response.json()
  const downloadUrl = data.data?.downloadUrl

  if (!downloadUrl) {
    throw new Error('Upload failed - no URL returned')
  }

  return downloadUrl
}

// Create generation task
async function createTask(
  imageUrl: string,
  prompt: string,
  aspectRatio: string,
  resolution: string
): Promise<string> {
  const response = await fetch(KIE_CREATE_TASK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${KIE_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'flux-2/pro-image-to-image',
      input: {
        input_urls: [imageUrl],
        prompt,
        aspect_ratio: aspectRatio,
        resolution,
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`Create task failed: ${response.status}`)
  }

  const data = await response.json()
  const taskId = data.data?.taskId

  if (!taskId) {
    throw new Error('No taskId in response')
  }

  return taskId
}

// Poll for task completion
async function pollTask(taskId: string): Promise<GeneratedImage[]> {
  const maxPolls = 8 // 8 polls * 15s = 120s max
  const pollInterval = 15000 // 15 seconds

  for (let i = 0; i < maxPolls; i++) {
    // Wait before polling (except first poll has initial delay)
    if (i > 0) {
      await new Promise(resolve => setTimeout(resolve, pollInterval))
    } else {
      // Initial delay before first poll
      await new Promise(resolve => setTimeout(resolve, pollInterval))
    }

    const response = await fetch(`${KIE_POLL_URL}?taskId=${taskId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${KIE_API_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Poll failed: ${response.status}`)
    }

    const data = await response.json()
    const state = data.data?.state

    if (state === 'success') {
      const resultJson = data.data?.resultJson
      if (resultJson) {
        try {
          const result = JSON.parse(resultJson)
          if (result.resultUrls && result.resultUrls.length > 0) {
            return result.resultUrls.map((url: string) => ({ url }))
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

    // state is 'pending' or 'processing', continue polling
  }

  throw new Error('Generation timed out')
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Validate API key is configured
    if (!KIE_API_KEY) {
      throw new Error('KIE_API_KEY not configured')
    }

    const body: GenerateRequest = await req.json()

    // Validate request
    if (!body.images || body.images.length === 0) {
      throw new Error('No images provided')
    }

    if (!body.prompt) {
      throw new Error('No prompt provided')
    }

    // Use first image (matching n8n behavior)
    const base64Image = body.images[0]

    // Step 1: Upload image
    console.log('Uploading image...')
    const imageUrl = await uploadImage(base64Image)
    console.log('Image uploaded:', imageUrl)

    // Step 2: Create generation task
    console.log('Creating task...')
    const taskId = await createTask(
      imageUrl,
      body.prompt,
      body.aspect_ratio || '2:3',
      body.resolution || '1K'
    )
    console.log('Task created:', taskId)

    // Step 3: Poll for completion
    console.log('Polling for result...')
    const images = await pollTask(taskId)
    console.log('Generation complete:', images.length, 'images')

    const response: GenerateResponse = {
      success: true,
      images,
      message: `Generated ${images.length} image(s)!`,
    }

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error:', error.message)

    const response: GenerateResponse = {
      success: false,
      images: [],
      message: error.message || 'Generation failed',
      error: error.message,
    }

    return new Response(JSON.stringify(response), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
