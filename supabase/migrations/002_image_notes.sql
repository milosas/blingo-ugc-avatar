-- Image Notes Migration
-- Adds image_notes table for storing user notes on generated images

-- ============================================================================
-- IMAGE NOTES TABLE
-- ============================================================================
-- One-to-one relationship with generated_images
create table public.image_notes (
  id uuid primary key default gen_random_uuid(),
  image_id uuid not null references public.generated_images(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  note_text text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.image_notes enable row level security;

-- Ensure one note per image
create unique index image_notes_image_id_key on public.image_notes(image_id);

-- Performance indexes (critical for RLS and lookups)
create index image_notes_user_id_idx on public.image_notes(user_id);
create index image_notes_image_id_idx on public.image_notes(image_id);

-- Auto-update updated_at on row changes
create trigger handle_updated_at before update on public.image_notes
  for each row execute procedure moddatetime(updated_at);

-- ============================================================================
-- RLS POLICIES - IMAGE NOTES
-- ============================================================================

create policy "Users can insert own notes"
on public.image_notes for insert
to authenticated
with check ( (select auth.uid()) = user_id );

create policy "Users can view own notes"
on public.image_notes for select
to authenticated
using ( (select auth.uid()) = user_id );

create policy "Users can update own notes"
on public.image_notes for update
to authenticated
using ( (select auth.uid()) = user_id )
with check ( (select auth.uid()) = user_id );

create policy "Users can delete own notes"
on public.image_notes for delete
to authenticated
using ( (select auth.uid()) = user_id );
