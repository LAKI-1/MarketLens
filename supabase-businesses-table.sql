-- Supabase/PostgreSQL table schema for the businesses table
-- Run this in Supabase SQL editor or psql for the connected project.

create extension if not exists "pgcrypto";

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
  unique (owner_id)
);

-- Optional: keep updated_at current on row updates.
create or replace function public.trigger_set_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger businesses_set_timestamp
  before update on public.businesses
  for each row execute function public.trigger_set_timestamp();
