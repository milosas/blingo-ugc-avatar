import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts"

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
  images: string[] // base64 data URLs (clothing)
  avatarId?: string
  avatarImageUrl?: string // Avatar reference image URL (for preset avatars)
  avatarImageBase64?: string // Avatar reference image as base64 (for custom avatars)
  avatarIsCustom?: boolean
}

interface GeneratedImage {
  url: string
  base64?: string // Base64 data URL for CORS-free frontend handling
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

// Fetch and convert URL image to base64 (using Deno std library for large files)
async function fetchImageAsBase64(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl)
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.status}`)
  }
  const arrayBuffer = await response.arrayBuffer()
  const base64 = base64Encode(new Uint8Array(arrayBuffer))
  const contentType = response.headers.get('content-type') || 'image/jpeg'
  return `data:${contentType};base64,${base64}`
}

// Download generated image and convert to base64 for CORS-free frontend handling
async function downloadImageAsBase64(imageUrl: string): Promise<string> {
  try {
    console.log('Downloading image for base64 conversion:', imageUrl.substring(0, 50) + '...')
    const response = await fetch(imageUrl)
    if (!response.ok) {
      console.error('Failed to download image:', response.status)
      throw new Error(`Download failed: ${response.status}`)
    }
    const arrayBuffer = await response.arrayBuffer()
    // Use Deno std library for proper base64 encoding of large files
    const base64 = base64Encode(new Uint8Array(arrayBuffer))
    const contentType = response.headers.get('content-type') || 'image/png'
    console.log('Image downloaded, size:', arrayBuffer.byteLength, 'bytes')
    return `data:${contentType};base64,${base64}`
  } catch (err) {
    console.error('Error downloading image:', err)
    throw err
  }
}

// Create generation task
async function createTask(
  clothingUrl: string,
  prompt: string,
  aspectRatio: string,
  resolution: string,
  avatarUrl?: string
): Promise<string> {
  // Build input URLs array - avatar first (person), clothing second (outfit)
  // Per kie.ai docs: "Change the man into the outfit shown in picture two"
  const inputUrls = avatarUrl
    ? [avatarUrl, clothingUrl]  // Avatar first, clothing second
    : [clothingUrl]             // Just clothing if no avatar

  const response = await fetch(KIE_CREATE_TASK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${KIE_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'flux-2/pro-image-to-image',
      input: {
        input_urls: inputUrls,
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
            // Download each image and convert to base64 for CORS-free frontend handling
            const images: GeneratedImage[] = await Promise.all(
              result.resultUrls.map(async (url: string) => {
                try {
                  const base64 = await downloadImageAsBase64(url)
                  return { url, base64 }
                } catch (downloadErr) {
                  console.error('Failed to download image, returning URL only:', downloadErr)
                  return { url } // Fallback: return URL only if download fails
                }
              })
            )
            return images
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

    // Step 1: Upload clothing image
    console.log('Uploading clothing image...')
    const clothingImageUrl = await uploadImage(base64Image)
    console.log('Clothing image uploaded:', clothingImageUrl)

    // Step 2: Upload avatar image (if provided) for identity reference
    let avatarUploadedUrl: string | undefined

    // Priority: base64 (custom avatars) > URL (preset avatars)
    // CRITICAL: If avatar is provided, it MUST be uploaded - do NOT continue without it
    if (body.avatarImageBase64) {
      // Custom avatar: already have base64, upload directly
      console.log('Uploading custom avatar (base64)...')
      try {
        avatarUploadedUrl = await uploadImage(body.avatarImageBase64)
        console.log('Custom avatar uploaded:', avatarUploadedUrl)
      } catch (avatarError) {
        // CRITICAL: Do NOT continue without avatar - user expects their avatar to be used
        console.error('Failed to upload custom avatar:', avatarError.message)
        throw new Error('AVATAR_UPLOAD_FAILED: Could not process custom avatar image')
      }
    } else if (body.avatarImageUrl) {
      // Preset avatar: fetch URL and convert to base64
      console.log('Processing preset avatar image...')
      try {
        const avatarBase64 = await fetchImageAsBase64(body.avatarImageUrl)
        avatarUploadedUrl = await uploadImage(avatarBase64)
        console.log('Preset avatar uploaded:', avatarUploadedUrl)
      } catch (avatarError) {
        // CRITICAL: Do NOT continue without avatar - user expects their avatar to be used
        console.error('Failed to upload preset avatar:', avatarError.message)
        throw new Error('AVATAR_UPLOAD_FAILED: Could not process avatar image')
      }
    }

    // Step 3: Build prompt - reference picture two for clothing when avatar is present
    let finalPrompt = body.prompt
    if (avatarUploadedUrl) {
      // When avatar image is provided, tell the model to use outfit from picture two
      // STRICT: Do not add or modify any clothing elements - use EXACTLY as shown
      finalPrompt = `${body.prompt}, wearing EXACTLY the clothing shown in picture two. IMPORTANT: Do not add sleeves, pockets, buttons, patterns or any elements not visible in the reference clothing image. Preserve the exact design, length, and style of the garment as photographed.`
    }

    // Step 4: Create generation task with both images
    console.log('Creating task with prompt:', finalPrompt)
    const taskId = await createTask(
      clothingImageUrl,
      finalPrompt,
      body.aspect_ratio || '2:3',
      body.resolution || '1K',
      avatarUploadedUrl
    )
    console.log('Task created:', taskId)

    // Step 5: Poll for completion
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
