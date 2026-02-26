import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const FAL_KEY = Deno.env.get('FAL_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const TRYON_CREDIT_COST = 3 // tryon_photo
const TRYON_CREDIT_DESCRIPTION = 'Try-on nuotrauka'

async function checkCredits(authHeader: string, cost: number): Promise<{ userId: string; balance: number }> {
  let userId: string
  try {
    const token = authHeader.replace('Bearer ', '')
    const payload = JSON.parse(atob(token.split('.')[1]))
    userId = payload.sub
    if (!userId) throw new Error('No user ID in token')
  } catch {
    const err = new Error('Unauthorized') as any
    err.type = 'unauthorized'
    throw err
  }

  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)
  const { data: profile } = await supabase
    .from('profiles')
    .select('credits')
    .eq('id', userId)
    .single()

  const balance = profile?.credits || 0
  if (balance < cost) {
    const err = new Error('insufficient_credits') as any
    err.type = 'insufficient_credits'
    err.required = cost
    err.balance = balance
    throw err
  }

  return { userId, balance }
}

async function deductCredits(userId: string, cost: number, description: string): Promise<void> {
  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)
  const { data } = await supabase.from('profiles').select('credits').eq('id', userId).single()
  const newBalance = Math.max(0, (data?.credits || 0) - cost)
  await supabase.from('profiles').update({ credits: newBalance }).eq('id', userId)
  await supabase.from('credit_transactions').insert({
    user_id: userId, amount: -cost, type: 'usage', description
  })
  console.log(`Deducted ${cost} credits from user ${userId}. New balance: ${newBalance}`)
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface GenerateRequest {
  mode: 'tryon' | 'background' | 'relight' | 'edit'
  guest?: boolean
  // tryon fields:
  qualityMode: 'performance' | 'balanced' | 'quality'
  imageCount: number
  images: string[]           // base64 clothing
  avatarImageUrl?: string
  avatarImageBase64?: string
  avatarIsCustom?: boolean
  // post-processing fields:
  sourceImageUrl?: string    // try-on result to post-process
  backgroundPrompt?: string  // for background mode
  lightingStyle?: string     // for relight mode
  editPrompt?: string        // for edit mode
}

interface GeneratedImage {
  url: string
  base64?: string
}

interface GenerateResponse {
  success: boolean
  images?: GeneratedImage[]
  message?: string
  error?: string
}

// Map quality mode to FASHN mode parameter
function mapQualityToMode(qualityMode: string): string {
  switch (qualityMode) {
    case 'performance': return 'performance'
    case 'balanced': return 'balanced'
    case 'quality': return 'quality'
    default: return 'balanced'
  }
}

// Upload base64 image data to fal.ai storage, returns URL
async function uploadToFalStorage(base64Data: string): Promise<string> {
  // Strip data URL prefix if present
  let rawBase64 = base64Data
  if (rawBase64.includes(',')) {
    rawBase64 = rawBase64.split(',')[1]
  }

  // Decode base64 to binary
  const binaryStr = atob(rawBase64)
  const bytes = new Uint8Array(binaryStr.length)
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i)
  }

  // Determine content type from data URL prefix
  let contentType = 'image/jpeg'
  if (base64Data.startsWith('data:image/png')) {
    contentType = 'image/png'
  } else if (base64Data.startsWith('data:image/webp')) {
    contentType = 'image/webp'
  }

  console.log(`Uploading to fal storage: ${bytes.length} bytes, type: ${contentType}`)

  // Try direct upload via fal.run
  const response = await fetch('https://fal.run/fal-ai/fal-file-storage/upload', {
    method: 'PUT',
    headers: {
      'Authorization': `Key ${FAL_KEY}`,
      'Content-Type': contentType,
    },
    body: bytes,
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error(`Fal storage upload failed (${response.status}):`, errorText)

    // Fallback: try REST API upload
    console.log('Trying REST API upload fallback...')
    const initResponse = await fetch('https://rest.alpha.fal.ai/storage/upload/url', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content_type: contentType,
        file_name: `upload-${Date.now()}.${contentType === 'image/png' ? 'png' : 'jpg'}`,
      }),
    })

    if (!initResponse.ok) {
      const initError = await initResponse.text()
      console.error('REST API upload init failed:', initError)
      throw new Error(`Fal storage upload failed: ${response.status} - ${errorText}`)
    }

    const { upload_url, file_url } = await initResponse.json()

    const putResponse = await fetch(upload_url, {
      method: 'PUT',
      headers: { 'Content-Type': contentType },
      body: bytes,
    })

    if (!putResponse.ok) {
      const putError = await putResponse.text()
      console.error('REST API PUT failed:', putError)
      throw new Error(`Fal storage PUT failed: ${putResponse.status}`)
    }

    console.log('Upload via REST API succeeded:', file_url)
    return file_url
  }

  const data = await response.json()
  console.log('Upload succeeded:', data.url)
  return data.url
}

// Fetch and convert URL image to base64
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
  console.log('Downloading image for base64 conversion:', imageUrl.substring(0, 50) + '...')
  const response = await fetch(imageUrl)
  if (!response.ok) {
    throw new Error(`Download failed: ${response.status}`)
  }
  const arrayBuffer = await response.arrayBuffer()
  const base64 = base64Encode(new Uint8Array(arrayBuffer))
  const contentType = response.headers.get('content-type') || 'image/png'
  console.log('Image downloaded, size:', arrayBuffer.byteLength, 'bytes')
  return `data:${contentType};base64,${base64}`
}

// Generic fal.ai queue submit + poll utility
async function falQueueSubmitAndPoll(endpoint: string, body: Record<string, unknown>): Promise<unknown> {
  const queueUrl = `https://queue.fal.run/${endpoint}`

  // Submit to queue
  console.log('Submitting to fal queue:', endpoint)
  const submitResponse = await fetch(queueUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Key ${FAL_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!submitResponse.ok) {
    const errorText = await submitResponse.text()
    console.error(`Fal queue submit failed for ${endpoint}:`, {
      status: submitResponse.status,
      statusText: submitResponse.statusText,
      error: errorText,
    })
    throw new Error(`Fal queue submit failed: ${submitResponse.status} - ${errorText}`)
  }

  const submitData = await submitResponse.json()
  const requestId = submitData.request_id
  if (!requestId) {
    throw new Error('No request_id in fal queue response')
  }
  console.log('Fal request submitted:', requestId)

  // Poll for completion
  const statusUrl = `${queueUrl}/requests/${requestId}/status`
  const resultUrl = `${queueUrl}/requests/${requestId}`
  const maxPolls = 60 // up to 5 minutes
  const pollInterval = 5000

  for (let i = 0; i < maxPolls; i++) {
    await new Promise(resolve => setTimeout(resolve, pollInterval))

    const statusResponse = await fetch(statusUrl, {
      headers: {
        'Authorization': `Key ${FAL_KEY}`,
      },
    })

    if (!statusResponse.ok) {
      console.error('Fal status poll failed:', statusResponse.status)
      continue
    }

    const statusData = await statusResponse.json()
    console.log('Fal status:', statusData.status, `(poll ${i + 1}/${maxPolls})`)

    if (statusData.status === 'COMPLETED') {
      // Fetch result
      const resultResponse = await fetch(resultUrl, {
        headers: {
          'Authorization': `Key ${FAL_KEY}`,
        },
      })

      if (!resultResponse.ok) {
        throw new Error(`Fal result fetch failed: ${resultResponse.status}`)
      }

      return await resultResponse.json()
    }

    if (statusData.status === 'FAILED') {
      console.error('Fal generation FAILED:', JSON.stringify(statusData))
      throw new Error(statusData.error || 'Fal generation failed')
    }
  }

  throw new Error('Fal generation timed out')
}

// Handle try-on via FASHN v1.6
async function handleTryOn(body: GenerateRequest): Promise<GenerateResponse> {
  if (!body.images || body.images.length === 0) {
    throw new Error('No clothing images provided')
  }

  // Prepare clothing image as data URI (fal.ai accepts base64 data URIs directly)
  const garmentDataUri = body.images[0]
  console.log('Clothing image ready (data URI)')

  // Prepare avatar image as data URI
  let modelImageInput: string

  if (body.avatarImageBase64) {
    console.log('Using custom avatar (base64 data URI)')
    modelImageInput = body.avatarImageBase64
  } else if (body.avatarImageUrl) {
    console.log('Fetching preset avatar image...')
    try {
      modelImageInput = await fetchImageAsBase64(body.avatarImageUrl)
      console.log('Preset avatar fetched as base64')
    } catch (avatarError) {
      console.error('Failed to fetch preset avatar:', avatarError.message)
      throw new Error('AVATAR_UPLOAD_FAILED: Could not process avatar image')
    }
  } else {
    throw new Error('No avatar image provided')
  }

  const mode = mapQualityToMode(body.qualityMode || 'balanced')
  const numSamples = body.imageCount || 1

  console.log(`FASHN try-on: mode=${mode}, samples=${numSamples}`)

  // Call FASHN v1.6 via fal queue — pass base64 data URIs directly
  // fal.ai accepts data URIs as file inputs, no separate storage upload needed
  const result = await falQueueSubmitAndPoll('fal-ai/fashn/tryon/v1.6', {
    model_image: modelImageInput,
    garment_image: garmentDataUri,
    mode,
    num_samples: numSamples,
    output_format: 'png',
  }) as { images?: Array<{ url: string }> }

  if (!result.images || result.images.length === 0) {
    throw new Error('No images returned from FASHN')
  }

  console.log('FASHN returned', result.images.length, 'images')

  // Download images as base64 for CORS-free frontend handling
  const images: GeneratedImage[] = await Promise.all(
    result.images.map(async (img: { url: string }) => {
      try {
        const base64 = await downloadImageAsBase64(img.url)
        return { url: img.url, base64 }
      } catch (downloadErr) {
        console.error('Failed to download image, returning URL only:', downloadErr)
        return { url: img.url }
      }
    })
  )

  return {
    success: true,
    images,
    message: `Generated ${images.length} image(s)!`,
  }
}

// Upload source image URL to fal storage (needed for post-processing — some fal.ai models only accept fal storage URLs)
async function ensureFalInputUrl(imageUrl: string): Promise<string> {
  // If already a fal storage/CDN URL, use as-is
  if (imageUrl.includes('fal.media') || imageUrl.includes('fal-cdn') || imageUrl.includes('fal.run')) {
    return imageUrl
  }
  // Convert to base64 data URI — fal.ai accepts these directly
  console.log('Fetching source image as base64...')
  const base64 = await fetchImageAsBase64(imageUrl)
  console.log('Source image ready as base64 data URI')
  return base64
}

// Handle background replacement via Bria
async function handleBackgroundReplace(body: GenerateRequest): Promise<GenerateResponse> {
  if (!body.sourceImageUrl) {
    throw new Error('No source image URL provided')
  }
  if (!body.backgroundPrompt) {
    throw new Error('No background prompt provided')
  }

  console.log('Background replace:', body.backgroundPrompt)
  const sourceUrl = await ensureFalInputUrl(body.sourceImageUrl)

  const result = await falQueueSubmitAndPoll('fal-ai/bria/background/replace', {
    image_url: sourceUrl,
    prompt: body.backgroundPrompt,
  }) as { images?: Array<{ url: string }> }

  if (!result.images || result.images.length === 0) {
    throw new Error('No images returned from background replace')
  }

  const images: GeneratedImage[] = await Promise.all(
    result.images.map(async (img: { url: string }) => {
      try {
        const base64 = await downloadImageAsBase64(img.url)
        return { url: img.url, base64 }
      } catch {
        return { url: img.url }
      }
    })
  )

  return {
    success: true,
    images,
    message: 'Background replaced!',
  }
}

// Handle relighting via Image Apps V2
async function handleRelight(body: GenerateRequest): Promise<GenerateResponse> {
  if (!body.sourceImageUrl) {
    throw new Error('No source image URL provided')
  }
  if (!body.lightingStyle) {
    throw new Error('No lighting style provided')
  }

  console.log('Relighting:', body.lightingStyle)
  const sourceUrl = await ensureFalInputUrl(body.sourceImageUrl)

  const result = await falQueueSubmitAndPoll('fal-ai/image-apps-v2/relighting', {
    image_url: sourceUrl,
    lighting_style: body.lightingStyle,
  }) as { images?: Array<{ url: string }> }

  if (!result.images || result.images.length === 0) {
    throw new Error('No images returned from relighting')
  }

  const images: GeneratedImage[] = await Promise.all(
    result.images.map(async (img: { url: string }) => {
      try {
        const base64 = await downloadImageAsBase64(img.url)
        return { url: img.url, base64 }
      } catch {
        return { url: img.url }
      }
    })
  )

  return {
    success: true,
    images,
    message: 'Relighting applied!',
  }
}

// Handle Kontext edit via FLUX Kontext Pro
async function handleKontextEdit(body: GenerateRequest): Promise<GenerateResponse> {
  if (!body.sourceImageUrl) {
    throw new Error('No source image URL provided')
  }
  if (!body.editPrompt) {
    throw new Error('No edit prompt provided')
  }

  console.log('Kontext edit:', body.editPrompt)
  const sourceUrl = await ensureFalInputUrl(body.sourceImageUrl)

  const result = await falQueueSubmitAndPoll('fal-ai/flux-pro/kontext', {
    image_url: sourceUrl,
    prompt: body.editPrompt,
  }) as { images?: Array<{ url: string }> }

  if (!result.images || result.images.length === 0) {
    throw new Error('No images returned from Kontext edit')
  }

  const images: GeneratedImage[] = await Promise.all(
    result.images.map(async (img: { url: string }) => {
      try {
        const base64 = await downloadImageAsBase64(img.url)
        return { url: img.url, base64 }
      } catch {
        return { url: img.url }
      }
    })
  )

  return {
    success: true,
    images,
    message: 'Edit applied!',
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  let body: GenerateRequest | undefined

  try {
    if (!FAL_KEY) {
      throw new Error('FAL_KEY not configured')
    }

    try {
      body = await req.json()
    } catch (parseError) {
      console.error('JSON parse error:', parseError.message)
      return new Response(JSON.stringify({
        success: false,
        images: [],
        message: 'Invalid JSON in request body',
        error: 'PARSE_ERROR',
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const mode = body!.mode || 'tryon'
    console.log(`Processing request: mode=${mode}`)

    // Credit check for tryon mode only (skip for guest users)
    const isGuest = body!.guest === true
    let creditUser: { userId: string; balance: number } | null = null
    if (mode === 'tryon' && !isGuest) {
      const authHeader = req.headers.get('authorization') || req.headers.get('Authorization')
      if (!authHeader) {
        return new Response(JSON.stringify({
          success: false, images: [],
          error: 'Missing authorization header',
          message: 'Missing authorization header',
        }), {
          status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      try {
        creditUser = await checkCredits(authHeader, TRYON_CREDIT_COST)
      } catch (creditErr: any) {
        if (creditErr.type === 'unauthorized') {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }
        if (creditErr.type === 'insufficient_credits') {
          return new Response(JSON.stringify({
            error: 'insufficient_credits',
            message: 'Nepakanka kreditų',
            required: creditErr.required,
            balance: creditErr.balance,
          }), {
            status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }
        throw creditErr
      }
    }

    let response: GenerateResponse

    switch (mode) {
      case 'tryon':
        response = await handleTryOn(body!)
        break
      case 'background':
        response = await handleBackgroundReplace(body!)
        break
      case 'relight':
        response = await handleRelight(body!)
        break
      case 'edit':
        response = await handleKontextEdit(body!)
        break
      default:
        throw new Error(`Unknown mode: ${mode}`)
    }

    // Deduct credits after successful tryon generation (skip for guests)
    if (mode === 'tryon' && creditUser && response.success && !isGuest) {
      await deductCredits(creditUser.userId, TRYON_CREDIT_COST, TRYON_CREDIT_DESCRIPTION)
    }

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    const mode = body?.mode || 'unknown'
    console.error(`Error in mode=${mode}:`, error.message)

    const response: GenerateResponse = {
      success: false,
      images: [],
      message: error.message || 'Generation failed',
      error: `[${mode}] ${error.message}`,
    }

    return new Response(JSON.stringify(response), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
