-- Add credits and subscription fields to profiles for dashboard
-- All users start with 10 free credits

-- ============================================================================
-- ADD CREDITS AND SUBSCRIPTION TO PROFILES
-- ============================================================================

-- Add credits column with default 10 free credits
alter table public.profiles
add column if not exists credits integer default 10 not null;

-- Add subscription column (free, pro, enterprise)
alter table public.profiles
add column if not exists subscription text default 'free' not null
check (subscription in ('free', 'pro', 'enterprise'));

-- ============================================================================
-- UPDATE EXISTING PROFILES
-- ============================================================================
-- Give existing users their free credits
update public.profiles
set credits = 10
where credits is null;
