-- Custom avatars table and storage bucket
-- Allows users to upload photos and stylized avatars (max 10 per user)

-- ============================================================================
-- CUSTOM AVATARS TABLE
-- ============================================================================
create table public.custom_avatars (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  storage_path text not null,
  image_url text not null,
  description text,
  avatar_type text not null check (avatar_type in ('photo', 'stylized', 'pending')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.custom_avatars enable row level security;

-- Performance indexes
create index custom_avatars_user_id_idx on public.custom_avatars(user_id);
create index custom_avatars_created_at_idx on public.custom_avatars(created_at desc);

-- Auto-update updated_at on row changes
create trigger handle_updated_at before update on public.custom_avatars
  for each row execute procedure moddatetime(updated_at);

-- ============================================================================
-- AVATAR LIMIT TRIGGER (10 max per user)
-- ============================================================================
create function public.check_avatar_limit()
returns trigger
language plpgsql
as $$
begin
  if (select count(*) from public.custom_avatars where user_id = new.user_id) >= 10 then
    raise exception 'Avatar limit reached: maximum 10 avatars per user';
  end if;
  return new;
end;
$$;

create trigger enforce_avatar_limit
  before insert on public.custom_avatars
  for each row execute procedure public.check_avatar_limit();

-- ============================================================================
-- RLS POLICIES - CUSTOM AVATARS
-- ============================================================================

create policy "Users can insert own avatars"
on public.custom_avatars for insert
to authenticated
with check ( (select auth.uid()) = user_id );

create policy "Users can view own avatars"
on public.custom_avatars for select
to authenticated
using ( (select auth.uid()) = user_id );

create policy "Users can update own avatars"
on public.custom_avatars for update
to authenticated
using ( (select auth.uid()) = user_id )
with check ( (select auth.uid()) = user_id );

create policy "Users can delete own avatars"
on public.custom_avatars for delete
to authenticated
using ( (select auth.uid()) = user_id );

-- ============================================================================
-- STORAGE BUCKET
-- ============================================================================
-- Create private bucket for custom avatars
insert into storage.buckets (id, name, public)
values ('custom-avatars', 'custom-avatars', false);

-- ============================================================================
-- STORAGE RLS POLICIES
-- ============================================================================

-- Users can upload to their own folder (user_id/)
create policy "Users can upload to own folder"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'custom-avatars' AND
  (storage.foldername(name))[1] = (select auth.uid()::text)
);

-- Users can read their own files
create policy "Users can read own files"
on storage.objects for select
to authenticated
using (
  bucket_id = 'custom-avatars' AND
  (storage.foldername(name))[1] = (select auth.uid()::text)
);

-- Users can delete their own files
create policy "Users can delete own files"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'custom-avatars' AND
  (storage.foldername(name))[1] = (select auth.uid()::text)
);
