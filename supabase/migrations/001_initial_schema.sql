-- Initial database schema for Virtual Clothing Model Generator
-- Profiles and generated images tables with RLS policies

-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists moddatetime schema extensions;

-- ============================================================================
-- PROFILES TABLE
-- ============================================================================
-- One-to-one relationship with auth.users
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- Auto-create profile on user signup
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================================
-- GENERATED IMAGES TABLE
-- ============================================================================
-- Stores metadata for user-generated images
create table public.generated_images (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  image_url text not null,
  storage_path text not null,
  prompt text,
  config jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.generated_images enable row level security;

-- Performance indexes (critical for RLS and gallery queries)
create index generated_images_user_id_idx on public.generated_images(user_id);
create index generated_images_created_at_idx on public.generated_images(created_at desc);

-- Auto-update updated_at on row changes
create trigger handle_updated_at before update on public.generated_images
  for each row execute procedure moddatetime(updated_at);

-- ============================================================================
-- RLS POLICIES - PROFILES
-- ============================================================================

create policy "Users can view own profile"
on public.profiles for select
to authenticated
using ( (select auth.uid()) = id );

create policy "Users can update own profile"
on public.profiles for update
to authenticated
using ( (select auth.uid()) = id )
with check ( (select auth.uid()) = id );

-- ============================================================================
-- RLS POLICIES - GENERATED IMAGES
-- ============================================================================

create policy "Users can insert own images"
on public.generated_images for insert
to authenticated
with check ( (select auth.uid()) = user_id );

create policy "Users can view own images"
on public.generated_images for select
to authenticated
using ( (select auth.uid()) = user_id );

create policy "Users can delete own images"
on public.generated_images for delete
to authenticated
using ( (select auth.uid()) = user_id );

-- ============================================================================
-- STORAGE BUCKET
-- ============================================================================
-- Create private bucket for generated images
insert into storage.buckets (id, name, public)
values ('generated-images', 'generated-images', false);

-- ============================================================================
-- STORAGE RLS POLICIES
-- ============================================================================

-- Users can upload to their own folder (user_id/)
create policy "Users can upload to own folder"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'generated-images' AND
  (storage.foldername(name))[1] = (select auth.uid()::text)
);

-- Users can read their own files
create policy "Users can read own files"
on storage.objects for select
to authenticated
using (
  bucket_id = 'generated-images' AND
  (storage.foldername(name))[1] = (select auth.uid()::text)
);

-- Users can delete their own files
create policy "Users can delete own files"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'generated-images' AND
  (storage.foldername(name))[1] = (select auth.uid()::text)
);
