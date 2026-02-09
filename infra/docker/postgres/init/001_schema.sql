CREATE TABLE IF NOT EXISTS catalog_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS media_entries (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL CHECK (section IN ('hero', 'visual-research')),
  video_url TEXT NOT NULL,
  poster_url TEXT NOT NULL,
  title TEXT,
  caption TEXT,
  locale TEXT NOT NULL CHECK (locale IN ('ru', 'en')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

