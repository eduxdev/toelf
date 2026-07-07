-- TOEFL ITP Practice Platform - Initial schema
-- Store questions, practice sessions and per-answer detail.

create extension if not exists "pgcrypto";

-- Sections (structure, written-expression, ...)
create table if not exists public.sections (
  id text primary key,
  name text not null,
  short_description text not null,
  long_description text,
  time_limit_minutes integer not null default 10,
  question_count integer not null default 0,
  created_at timestamptz not null default now()
);

-- Question bank
create table if not exists public.questions (
  id text primary key,
  section_id text not null references public.sections(id) on delete cascade,
  number integer not null,
  type text not null check (type in ('structure','written-expression')),
  payload jsonb not null,
  correct text not null check (correct in ('A','B','C','D')),
  explanation text,
  created_at timestamptz not null default now()
);

create index if not exists questions_section_number_idx
  on public.questions(section_id, number);

-- Practice sessions (single-user profile for now)
create table if not exists public.practice_sessions (
  id uuid primary key default gen_random_uuid(),
  profile_id text not null default 'local',
  section_id text not null references public.sections(id) on delete cascade,
  total_questions integer not null,
  correct_answers integer not null default 0,
  score_percent integer not null default 0,
  duration_seconds integer not null default 0,
  completed_at timestamptz not null default now()
);

create index if not exists practice_sessions_profile_idx
  on public.practice_sessions(profile_id, completed_at desc);

-- Per-question answers for review
create table if not exists public.session_answers (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.practice_sessions(id) on delete cascade,
  question_id text not null references public.questions(id),
  answer text check (answer in ('A','B','C','D')),
  is_correct boolean not null default false
);

create index if not exists session_answers_session_idx
  on public.session_answers(session_id);
