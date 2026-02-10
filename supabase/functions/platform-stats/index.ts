import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    const [imagesResult, avatarsResult, postsResult] = await Promise.all([
      supabase.from('generated_images').select('id', { count: 'exact', head: true }),
      supabase.from('custom_avatars').select('id', { count: 'exact', head: true }),
      supabase.from('generated_posts').select('id', { count: 'exact', head: true }),
    ])

    return new Response(JSON.stringify({
      images: imagesResult.count ?? 0,
      avatars: avatarsResult.count ?? 0,
      posts: postsResult.count ?? 0,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Platform stats error:', error.message)
    return new Response(JSON.stringify({ images: 0, avatars: 0, posts: 0 }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
