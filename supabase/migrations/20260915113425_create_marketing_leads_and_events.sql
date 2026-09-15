create table if not exists public.marketing_leads (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 100),
  shop_name text not null check (char_length(shop_name) between 2 and 150),
  phone text not null check (phone ~ '^[0-9]{10}$'),
  source text not null default 'website',
  landing_page text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  status text not null default 'new' check (status in ('new','contacted','qualified','demo_booked','won','lost')),
  consent_at timestamptz not null,
  user_agent text
);

create table if not exists public.marketing_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  event_name text not null check (event_name in ('page_view','whatsapp_click','phone_click','email_click','pricing_click','lead_submit','lead_error')),
  page_path text,
  session_id uuid,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  metadata jsonb not null default '{}'::jsonb,
  user_agent text
);

create index if not exists marketing_leads_created_at_idx on public.marketing_leads (created_at desc);
create index if not exists marketing_leads_phone_idx on public.marketing_leads (phone);
create index if not exists marketing_events_created_at_idx on public.marketing_events (created_at desc);
create index if not exists marketing_events_name_idx on public.marketing_events (event_name);

alter table public.marketing_leads enable row level security;
alter table public.marketing_events enable row level security;

revoke all on table public.marketing_leads from anon, authenticated;
revoke all on table public.marketing_events from anon, authenticated;
