# !Открыто к редактированию!

# Шаг 9 — Локальный QA в контейнерах

Документ фиксирует повторный прогон QA для MVP через Docker Compose.

Дата прогона: `2026-02-09`

---

## Запуск окружения

```bash
docker compose -f infra/docker/docker-compose.yml -f infra/docker/docker-compose.override.yml up -d --build
```

---

## Smoke-проверки

Скрипт:
- `infra/docker/scripts/smoke-check.ps1`

Команда:

```bash
powershell -ExecutionPolicy Bypass -File infra/docker/scripts/smoke-check.ps1
```

Результат:
- `PASS` по всем проверкам:
  - health-check сервисов
  - gateway endpoints и валидация `locale`
  - frontend маршруты `/`, `/ru`, `/en`, `/en/catalog`, `/ru/visual-research`

---

## Build и quality checks

### Frontend build

Команда:

```bash
docker compose -f infra/docker/docker-compose.yml -f infra/docker/docker-compose.override.yml exec web sh -lc "NODE_ENV=production npm run build"
```

Результат:
- `next build` завершился успешно.
- Статическая генерация маршрутов `ru/en` прошла без ошибок.

### Backend syntax checks

Команды:

```bash
docker compose -f infra/docker/docker-compose.yml -f infra/docker/docker-compose.override.yml exec api-gateway sh -lc "node --check src/server.js"
docker compose -f infra/docker/docker-compose.yml -f infra/docker/docker-compose.override.yml exec catalog-service sh -lc "node --check src/server.js"
docker compose -f infra/docker/docker-compose.yml -f infra/docker/docker-compose.override.yml exec media-service sh -lc "node --check src/server.js"
```

Результат:
- Все проверки `node --check` пройдены.

---

## Завершение прогона

```bash
docker compose -f infra/docker/docker-compose.yml -f infra/docker/docker-compose.override.yml down
```

---

## Критерий завершения шага 9

- Полный сценарий MVP подтвержден в контейнерах.
- Smoke-check пройден.
- Frontend production build успешен.
- Синтакс-проверки backend-сервисов успешны.

