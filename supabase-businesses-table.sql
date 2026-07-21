-- Supabase/PostgreSQL Complete Schema & RLS Setup for MarketLens
-- Copy and run this ENTIRE script in your Supabase SQL Editor:
-- Supabase Dashboard -> SQL Editor -> New Query -> Paste & Click Run

create extension if not exists "pgcrypto";

-- ==========================================
-- 1. TABLES CREATION
-- ==========================================

-- 1. Businesses Table
create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  business_name text not null,
  tagline text,
  industry text,
  business_stage text,
  business_model text,
  country text,
  currency text,
  company_size text,
  founded_year integer,
  employee_count integer,
  annual_revenue text,
  customer_count integer,
  website_visitors integer,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint businesses_owner_id_key unique (owner_id)
);

-- 2. Products Table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name text not null,
  description text,
  price numeric(10,2),
  pricing_model text,
  category text,
  created_at timestamp with time zone not null default now()
);

-- 3. Competitors Table
create table if not exists public.competitors (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  competitor_name text not null,
  website text,
  created_at timestamp with time zone not null default now()
);

-- 4. Growth Goals Table
create table if not exists public.growth_goals (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  goal text not null,
  priority text check (priority in ('primary', 'secondary')),
  created_at timestamp with time zone not null default now()
);

-- 5. Marketing Channels Table
create table if not exists public.marketing_channels (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  channel_name text not null,
  is_active boolean default true,
  monthly_budget numeric(10,2),
  created_at timestamp with time zone not null default now()
);

-- ==========================================
-- 2. ROW LEVEL SECURITY (RLS) & POLICIES
-- ==========================================

alter table public.businesses enable row level security;
alter table public.products enable row level security;
alter table public.competitors enable row level security;
alter table public.growth_goals enable row level security;
alter table public.marketing_channels enable row level security;

-- Drop existing policies if any to avoid duplication
drop policy if exists "Businesses full access" on public.businesses;
drop policy if exists "Products full access" on public.products;
drop policy if exists "Competitors full access" on public.competitors;
drop policy if exists "Growth Goals full access" on public.growth_goals;
drop policy if exists "Marketing Channels full access" on public.marketing_channels;

-- Create Policies
create policy "Businesses full access"
on public.businesses for all
using (auth.uid() = owner_id or auth.role() = 'anon' or auth.role() = 'authenticated')
with check (auth.uid() = owner_id or auth.role() = 'anon' or auth.role() = 'authenticated');

create policy "Products full access"
on public.products for all
using (true)
with check (true);

create policy "Competitors full access"
on public.competitors for all
using (true)
with check (true);

create policy "Growth Goals full access"
on public.growth_goals for all
using (true)
with check (true);

create policy "Marketing Channels full access"
on public.marketing_channels for all
using (true)
with check (true);

-- ==========================================
-- 3. TIMESTAMP TRIGGERS
-- ==========================================

create or replace function public.trigger_set_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists businesses_set_timestamp on public.businesses;
create trigger businesses_set_timestamp
  before update on public.businesses
  for each row execute function public.trigger_set_timestamp();
