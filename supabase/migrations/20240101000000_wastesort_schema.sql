-- ==============================================================================
-- WASTESORT DATABASE ARCHITECTURE & SCHEMA
-- Compatible with Supabase PostgreSQL
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. waste_scans table
CREATE TABLE IF NOT EXISTS public.waste_scans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    item_name TEXT NOT NULL,
    material TEXT NOT NULL,
    category TEXT NOT NULL,
    waste_type TEXT NOT NULL,
    recyclable BOOLEAN NOT NULL,
    confidence NUMERIC(4, 2) NOT NULL,
    disposal_action TEXT NOT NULL,
    instructions JSONB NOT NULL DEFAULT '[]'::jsonb,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. waste_rules table
CREATE TABLE IF NOT EXISTS public.waste_rules (
    id TEXT PRIMARY KEY,
    waste_category TEXT NOT NULL,
    material TEXT NOT NULL,
    disposal_method TEXT NOT NULL,
    preparation_instructions JSONB NOT NULL DEFAULT '[]'::jsonb,
    prohibited_actions JSONB NOT NULL DEFAULT '[]'::jsonb,
    locality TEXT NOT NULL,
    region TEXT NOT NULL,
    source TEXT NOT NULL,
    verification_status TEXT NOT NULL DEFAULT 'demonstration',
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- 3. collection_points table
CREATE TABLE IF NOT EXISTS public.collection_points (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    accepted_categories JSONB NOT NULL DEFAULT '[]'::jsonb,
    contact_number TEXT,
    operating_hours TEXT NOT NULL,
    verification_status TEXT NOT NULL DEFAULT 'demonstration',
    source TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. user_feedback table
CREATE TABLE IF NOT EXISTS public.user_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    feedback_type TEXT NOT NULL,
    related_item TEXT,
    suggested_category TEXT,
    description TEXT NOT NULL,
    email TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_waste_rules_category ON public.waste_rules (waste_category);
CREATE INDEX IF NOT EXISTS idx_waste_rules_locality ON public.waste_rules (locality);
CREATE INDEX IF NOT EXISTS idx_collection_points_coords ON public.collection_points (latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_waste_scans_created ON public.waste_scans (created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.waste_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waste_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collection_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_feedback ENABLE ROW LEVEL SECURITY;

-- Anonymous Select Policies (Public read for rules & collection points)
CREATE POLICY "Public read waste rules" ON public.waste_rules FOR SELECT USING (true);
CREATE POLICY "Public read collection points" ON public.collection_points FOR SELECT USING (true);
CREATE POLICY "Public anonymous insert feedback" ON public.user_feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Public anonymous insert scans" ON public.waste_scans FOR INSERT WITH CHECK (true);

-- ==============================================================================
-- INITIAL SEED DATA FOR DEMONSTRATION REGION (Guwahati, Assam, India)
-- ==============================================================================

INSERT INTO public.waste_rules (id, waste_category, material, disposal_method, preparation_instructions, prohibited_actions, locality, region, source, verification_status)
VALUES 
(
  'rule-plastic-gmc-1',
  'Plastic',
  'PET plastic / Rigid containers',
  'Segregated Dry Waste (Blue Bin) Door-to-Door Municipal Collection',
  '["Empty all liquids completely", "Quick rinse if sticky or oily", "Allow to dry", "Flatten container"]'::jsonb,
  '["Do not burn plastic", "Do not discard in drains or wetlands", "Do not mix with organic wet waste"]'::jsonb,
  'Guwahati Municipal Corporation Area',
  'Assam, India',
  'GMC Solid Waste Management By-laws (Demonstration Rule)',
  'demonstration'
),
(
  'rule-battery-gmc-1',
  'Batteries',
  'Alkaline & Lithium-ion cells',
  'Specialized E-Waste / Hazardous Take-back Center',
  '["Store in dry non-conductive box", "Tape terminal ends with clear tape to prevent short circuits", "Hand over to certified e-waste recycler"]'::jsonb,
  '["Strictly PROHIBITED from regular household waste bins", "Never puncture or incinerate", "Never discard in open land"]'::jsonb,
  'Guwahati Municipal Corporation Area',
  'Assam, India',
  'Batteries (Management and Handling) Rules (Demonstration Rule)',
  'demonstration'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.collection_points (id, name, address, latitude, longitude, accepted_categories, contact_number, operating_hours, verification_status, source)
VALUES
(
  'cp-gmc-beltola-mrf',
  'GMC Beltola Material Recovery Facility (MRF)',
  'Survey Beltola, Near Basistha Road, Guwahati, Assam 781028',
  26.1264,
  91.7852,
  '["Plastic", "Paper and cardboard", "Glass", "Metal"]'::jsonb,
  '+91 361 254 0525',
  'Mon – Sat: 08:00 AM – 04:00 PM',
  'demonstration',
  'GMC Ward 28 Solid Waste Management'
),
(
  'cp-guwahati-ewaste-hub',
  'Guwahati E-Waste & Battery Recycling Center',
  'G.S. Road, Christian Basti, Guwahati, Assam 781005',
  26.1528,
  91.7762,
  '["Batteries", "Electronic waste", "Hazardous waste"]'::jsonb,
  '+91 361 245 8890',
  'Mon – Fri: 09:30 AM – 06:00 PM',
  'demonstration',
  'Authorized Recyclers Registry'
)
ON CONFLICT (id) DO NOTHING;
