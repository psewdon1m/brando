INSERT INTO catalog_items (id, title, slug, image_url, is_featured, media_type)
VALUES
  ('cat-001', 'Silence Ring', 'silence-ring', 'https://cdn.example.local/catalog/silence-ring.jpg', TRUE, 'image'),
  ('cat-002', 'Metamorph Brooch', 'metamorph-brooch', 'https://cdn.example.local/catalog/metamorph-brooch.jpg', FALSE, 'image'),
  ('cat-003', 'Echo Pendant', 'echo-pendant', 'https://cdn.example.local/catalog/echo-pendant.jpg', FALSE, 'video')
ON CONFLICT (id) DO NOTHING;

INSERT INTO media_entries (id, section, video_url, poster_url, title, caption, locale)
VALUES
  (
    'hero-001-ru',
    'hero',
    'https://cdn.example.local/media/hero-001-ru.mp4',
    'https://cdn.example.local/media/hero-001-ru.jpg',
    'Metamorphosis',
    'Тихая динамика формы',
    'ru'
  ),
  (
    'hero-001-en',
    'hero',
    'https://cdn.example.local/media/hero-001-en.mp4',
    'https://cdn.example.local/media/hero-001-en.jpg',
    'Metamorphosis',
    'Quiet transformation of form',
    'en'
  ),
  (
    'vr-001-ru',
    'visual-research',
    'https://cdn.example.local/media/vr-001-ru.mp4',
    'https://cdn.example.local/media/vr-001-ru.jpg',
    NULL,
    'Видео-дневник исследования материала',
    'ru'
  ),
  (
    'vr-001-en',
    'visual-research',
    'https://cdn.example.local/media/vr-001-en.mp4',
    'https://cdn.example.local/media/vr-001-en.jpg',
    NULL,
    'Video journal of material research',
    'en'
  )
ON CONFLICT (id) DO NOTHING;

