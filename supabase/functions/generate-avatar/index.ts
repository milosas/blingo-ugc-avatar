import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts"

const FAL_KEY = Deno.env.get('FAL_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface GenerateAvatarRequest {
  prompt: string
  reference_image_url?: string // If provided, uses InstantID for identity-preserving generation
  aspect_ratio?: string // '9:16' full body, '3:4' half body, '1:1' headshot
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

// Synchronous fal.ai call (waits for result)
async function falRun(endpoint: string, body: Record<string, unknown>): Promise<unknown> {
  const url = `https://fal.run/${endpoint}`

  console.log('Calling fal.run:', endpoint)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Key ${FAL_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Fal request failed: ${response.status} - ${errorText}`)
  }

  return await response.json()
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!FAL_KEY) {
      throw new Error('FAL_KEY not configured')
    }

    const body: GenerateAvatarRequest = await req.json()

    if (!body.prompt) {
      throw new Error('No prompt provided')
    }

    console.log('Generating avatar with prompt:', body.prompt.substring(0, 100))

    let imageUrl: string

    if (body.reference_image_url) {
      // PuLID FLUX: identity-preserving generation (same person, different pose)
      // Uses FLUX.1 dev backbone — much higher quality than InstantID (SDXL)
      // PuLID uses image_size enum, not aspect_ratio
      const imageSizeMap: Record<string, string> = {
        '9:16': 'portrait_16_9',
        '3:4': 'portrait_4_3',
        '1:1': 'square_hd',
      }
      const imageSize = imageSizeMap[body.aspect_ratio || '1:1'] || 'square_hd'
      console.log('Using PuLID FLUX with face reference, image_size:', imageSize)
      const pulidResult = await falRun('fal-ai/flux-pulid', {
        prompt: body.prompt,
        reference_image_url: body.reference_image_url,
        image_size: imageSize,
        num_inference_steps: 25,
        guidance_scale: 4,
        id_weight: 0.9,
        true_cfg: 1.5,
        max_sequence_length: '256',
      }) as { images?: Array<{ url: string }> }

      if (!pulidResult.images || pulidResult.images.length === 0) {
        throw new Error('No images in PuLID response')
      }
      imageUrl = pulidResult.images[0].url
    } else {
      // FLUX Pro v1.1 Ultra uses aspect_ratio param (not image_size)
      // Valid: 21:9, 16:9, 4:3, 3:2, 1:1, 2:3, 3:4, 9:16, 9:21
      const aspectRatio = body.aspect_ratio || '1:1'
      console.log('Using aspect_ratio:', aspectRatio)
      const fluxResult = await falRun('fal-ai/flux-pro/v1.1-ultra', {
        prompt: body.prompt,
        aspect_ratio: aspectRatio,
        num_images: 1,
        safety_tolerance: '2',
      }) as { images?: Array<{ url: string }> }

      if (!fluxResult.images || fluxResult.images.length === 0) {
        throw new Error('No images in fal response')
      }

      imageUrl = fluxResult.images[0].url
    }
    console.log('Avatar generated, downloading for base64 conversion...')

    const base64Image = await downloadImageAsBase64(imageUrl)
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
