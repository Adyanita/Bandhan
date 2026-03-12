import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL  || '';
const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

export const hasSupabase = Boolean(supabase);

// ─── Supabase DB helpers (used only when supabase is configured) ───────────────

export async function dbGetAllProfiles() {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error(error); return null; }
  return data;
}

export async function dbGetProfileById(id) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null;
  return data;
}

export async function dbUpsertProfile(profile) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('profiles')
    .upsert(profile)
    .select()
    .single();
  if (error) { console.error(error); return null; }
  return data;
}

/*
  ─── Supabase SQL Schema ────────────────────────────────────────────────────────
  Run this in your Supabase SQL editor to create the profiles table:

  create table public.profiles (
    id              text primary key,
    name            text not null,
    gender          text,
    dob             text,
    religion        text,
    caste           text,
    education       text,
    profession      text,
    city            text,
    height          text,
    marital_status  text,
    diet            text,
    complexion      text,
    body_type       text,
    income          text,
    about           text,
    hobbies         text,
    languages       text,
    father_profession text,
    mother_profession text,
    siblings        text,
    partner_religion text,
    partner_min_age text,
    partner_max_age text,
    partner_city    text,
    photo           text,
    verified        boolean default false,
    created_at      timestamptz default now()
  );

  alter table public.profiles enable row level security;
  create policy "Public read" on public.profiles for select using (true);
  create policy "Anyone insert" on public.profiles for insert with check (true);
  create policy "Owner update" on public.profiles for update using (true);
  ────────────────────────────────────────────────────────────────────────────────
*/
