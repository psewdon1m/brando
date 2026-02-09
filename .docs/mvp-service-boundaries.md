# !Открыто к редактированию!

# Шаг 1 — Границы MVP и API-контракты

Документ фиксирует минимальный состав микросервисов на этапе MVP, их ответственность и базовые контракты взаимодействия.

---

## Состав сервисов MVP

1. `web` (`Next.js`)
- Отвечает за UI (`/`, `/catalog`, `/visual-research`), навигацию, i18n и рендеринг.
- Не ходит напрямую в доменные сервисы.
- Работает только через `api-gateway`.

2. `api-gateway` (BFF)
- Единая точка входа для frontend.
- Агрегирует данные из `catalog-service` и `media-service`.
- Нормализует ошибки в единый формат.

3. `catalog-service`
- Отвечает за секции и ленту каталога.
- Источник данных по элементам каталога для главной и страницы каталога.

4. `media-service`
- Отвечает за данные видео/постеров для hero и visual research.
- Возвращает только метаданные и URL медиа.

---

## Межсервисные правила

- Протокол: HTTP/REST + JSON.
- Версионирование API: префикс `/api/v1`.
- Таймаут между сервисами: 3s (MVP baseline).
- Идентификаторы сущностей: `string` (`uuid`-совместимые).
- Все даты в формате ISO 8601 UTC.

---

## Внешний контракт (web -> api-gateway)

### `GET /api/v1/home`
Назначение: данные для главной страницы.

```json
{
  "heroMedia": [
    {
      "id": "string",
      "videoUrl": "string",
      "posterUrl": "string",
      "title": "string",
      "locale": "ru|en"
    }
  ],
  "catalogPreview": [
    {
      "id": "string",
      "title": "string",
      "imageUrl": "string",
      "isFeatured": true
    }
  ]
}
```

### `GET /api/v1/catalog`
Назначение: данные ленты каталога.

```json
{
  "items": [
    {
      "id": "string",
      "title": "string",
      "slug": "string",
      "imageUrl": "string",
      "isFeatured": true,
      "mediaType": "image|video"
    }
  ]
}
```

### `GET /api/v1/visual-research`
Назначение: данные визуального исследования.

```json
{
  "entries": [
    {
      "id": "string",
      "videoUrl": "string",
      "posterUrl": "string",
      "caption": "string",
      "locale": "ru|en"
    }
  ]
}
```

---

## Внутренние контракты (api-gateway -> сервисы)

### `catalog-service`
- `GET /api/v1/catalog/items`
- `GET /api/v1/catalog/preview`

### `media-service`
- `GET /api/v1/media/hero`
- `GET /api/v1/media/visual-research`

---

## Формат ошибок (единый)

Все сервисы через gateway возвращают:

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "requestId": "string"
  }
}
```

Рекомендуемые коды на MVP:
- `VALIDATION_ERROR`
- `NOT_FOUND`
- `UPSTREAM_UNAVAILABLE`
- `INTERNAL_ERROR`

---

## Что не входит в шаг 1

- Полная схема БД и миграции.
- Авторизация/аутентификация.
- Production SLA и rate limiting.
- Финальные бизнес-правила ранжирования каталога.

---

## Критерий завершения шага 1

- Зафиксирован состав сервисов MVP.
- Зафиксированы зоны ответственности.
- Зафиксированы внешние и внутренние API-контракты `v1`.
- Зафиксирован единый формат ошибок.

