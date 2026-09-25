-- Apex Truckin — initial schema
-- Run in the Supabase SQL editor, or `supabase db push`.

-- Blog posts
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT, -- HTML content
  cover_image_url TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  category TEXT DEFAULT 'General',
  author TEXT DEFAULT 'Apex Truckin Team',
  read_time INT DEFAULT 5,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS posts_published_idx ON posts (is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS posts_category_idx ON posts (category);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  carrier_name TEXT NOT NULL,
  truck_type TEXT,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT NOT NULL,
  location TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  equipment_type TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public read access for posts and testimonials
CREATE POLICY "Public posts read" ON posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public testimonials read" ON testimonials FOR SELECT USING (true);
-- Allow inserts from anon for forms
CREATE POLICY "Public contact insert" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public newsletter insert" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
-- Writes to posts go through the CMS API using the service role key (bypasses RLS).
