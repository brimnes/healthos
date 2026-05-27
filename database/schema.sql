-- Personal Health OS database schema for PostgreSQL / Timeweb.
-- Run this in Timeweb's SQL console or with psql after creating the database.

create extension if not exists pgcrypto;

create table if not exists app_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  created_at timestamptz not null default now()
);

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_users(id) on delete cascade,
  profile_name text not null,
  gender text,
  birth_date date,
  profile_type text not null default 'self',
  created_at timestamptz not null default now()
);

create table if not exists pregnancies (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  start_date date,
  due_date date,
  current_week integer,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  file_url text not null,
  file_name text not null,
  document_type text,
  document_date date,
  lab_name text,
  processing_status text not null default 'uploaded'
    check (processing_status in ('uploaded', 'processing', 'requires_review', 'completed', 'error')),
  raw_ocr_text text,
  ai_extracted_json jsonb,
  created_at timestamptz not null default now()
);

create table if not exists marker_dictionary (
  id uuid primary key default gen_random_uuid(),
  canonical_name text not null unique,
  aliases text[] not null default '{}',
  category text,
  default_unit text,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists lab_results (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  document_id uuid references documents(id) on delete set null,
  category text,
  marker_name text not null,
  canonical_name text,
  value numeric,
  unit text,
  reference_min numeric,
  reference_max numeric,
  reference_text text,
  status text,
  confidence numeric,
  source_text text,
  analysis_date date,
  created_at timestamptz not null default now()
);

create table if not exists ultrasound_results (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  document_id uuid references documents(id) on delete set null,
  date date,
  pregnancy_week integer,
  fetal_heartbeat text,
  crl numeric,
  bpd numeric,
  femur_length numeric,
  placenta text,
  amniotic_fluid text,
  conclusion text,
  recommendations text,
  created_at timestamptz not null default now()
);

create index if not exists idx_profiles_user_id on profiles(user_id);
create index if not exists idx_documents_profile_id on documents(profile_id);
create index if not exists idx_documents_status on documents(processing_status);
create index if not exists idx_lab_results_profile_marker on lab_results(profile_id, canonical_name, analysis_date);
create index if not exists idx_lab_results_document_id on lab_results(document_id);
create index if not exists idx_ultrasound_profile_id on ultrasound_results(profile_id);

insert into marker_dictionary (canonical_name, aliases, category, default_unit, description)
values
  ('Гемоглобин', array['Hb', 'HGB', 'Hemoglobin'], 'Гематология', 'г/л', 'Белок эритроцитов, переносит кислород.'),
  ('Лейкоциты', array['WBC', 'White blood cells'], 'Гематология', '×10^9/л', 'Клетки иммунной системы.'),
  ('Эритроциты', array['RBC', 'Red blood cells'], 'Гематология', '×10^12/л', 'Красные клетки крови.'),
  ('Тромбоциты', array['PLT', 'Platelets'], 'Гематология', '×10^9/л', 'Клетки, участвующие в свёртывании крови.'),
  ('Ферритин', array['Ferritin', 'FER'], 'Микроэлементы', 'нг/мл', 'Белок хранения железа.'),
  ('ТТГ', array['TSH', 'Thyroid-stimulating hormone'], 'Гормоны', 'мЕд/л', 'Тиреотропный гормон.'),
  ('Глюкоза', array['Glucose', 'GLU'], 'Биохимия', 'ммоль/л', 'Показатель углеводного обмена.')
on conflict (canonical_name) do nothing;
