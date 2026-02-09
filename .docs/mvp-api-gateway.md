# !Открыто к редактированию!

# Шаг 6 — API Gateway / BFF

Документ фиксирует реализацию единой точки входа для frontend и агрегацию данных из доменных сервисов.

---

## Реализованные эндпоинты `api-gateway`

- `GET /health`
- `GET /api/v1/home`
- `GET /api/v1/catalog`
- `GET /api/v1/visual-research`

---

## Агрегация данных

- `/api/v1/home`:
  - запрашивает hero media из `media-service`
  - запрашивает catalog preview из `catalog-service`
  - объединяет результат в `{ heroMedia, catalogPreview }`

- `/api/v1/catalog`:
  - проксирует `catalog-service /api/v1/catalog/items`
  - возвращает `{ items }`

- `/api/v1/visual-research`:
  - проксирует `media-service /api/v1/media/visual-research`
  - возвращает `{ entries }`

---

## Валидация и ошибки

- Поддерживается только метод `GET`.
- `locale`: допустимые значения `ru|en`, по умолчанию `ru`.
- Единый формат ошибок:

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "requestId": "string"
  }
}
```

Коды:
- `VALIDATION_ERROR`
- `NOT_FOUND`
- `UPSTREAM_UNAVAILABLE`

---

## Критерий завершения шага 6

- Frontend может работать через одну точку входа (`api-gateway`).
- Данные home/catalog/visual-research собираются через gateway.
- Ошибки нормализуются gateway в единый формат.

