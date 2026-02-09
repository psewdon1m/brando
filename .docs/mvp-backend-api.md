# !Открыто к редактированию!

# Шаг 5 — Backend MVP API (catalog-service, media-service)

Документ фиксирует минимальный набор API, реализованный в доменных сервисах MVP.

---

## Реализованные эндпоинты

### `catalog-service`
- `GET /health`
- `GET /api/v1/catalog/items`
- `GET /api/v1/catalog/preview`

### `media-service`
- `GET /health`
- `GET /api/v1/media/hero`
- `GET /api/v1/media/visual-research`

---

## Валидация

- Поддерживается только метод `GET`.
- Параметр `locale`:
  - допустимые значения: `ru`, `en`
  - при невалидном значении возвращается `400 VALIDATION_ERROR`
- Для `media-service` `locale` по умолчанию: `ru`.

---

## Единый формат ошибок

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

---

## Ограничения текущей реализации

- Данные пока выдаются из in-memory набора (MVP baseline).
- Подключение к БД/Redis будет задействовано в следующей итерации сервисной логики.

---

## Критерий завершения шага 5

- Реализованы минимальные API двух доменных сервисов.
- Добавлена базовая валидация входных параметров.
- Ошибки отдаются в едином формате.

