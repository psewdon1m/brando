# Brando MVP

MVP сайта бренда аксессуаров с микросервисной архитектурой, контейнеризацией через Docker и frontend на Next.js.

## Что реализовано

- Страницы: `Home`, `Catalog`, `Visual Research`.
- Локали UI: `ru/en` (`next-intl`).
- Backend сервисы:
  - `api-gateway` (BFF)
  - `catalog-service`
  - `media-service`
- Инфраструктура:
  - `PostgreSQL`
  - `Redis`
- Контейнеризация:
  - `docker-compose.yml`
  - `docker-compose.override.yml`
- Smoke QA:
  - `infra/docker/scripts/smoke-check.ps1`

## Текущий стек (фактический)

- Frontend: `Next.js` (App Router), `React`, `JavaScript`, `next-intl`, `Framer Motion`, custom CSS.
- Backend: `Node.js` (`http`), `JavaScript`.
- Data/Infra: `PostgreSQL`, `Redis`, `Docker`, `Docker Compose`.
- Package manager: `npm`.

## Структура проекта

```text
.docs/
apps/
  web/
services/
  api-gateway/
  catalog-service/
  media-service/
infra/
  docker/
    postgres/init/
    scripts/smoke-check.ps1
packages/
```

## Локальный запуск

Из корня проекта:

```bash
docker compose -f infra/docker/docker-compose.yml -f infra/docker/docker-compose.override.yml up -d --build
```

Открыть в браузере:

- `http://localhost:3000/`
- `http://localhost:3000/ru`
- `http://localhost:3000/en`
- `http://localhost:3000/en/catalog`
- `http://localhost:3000/ru/visual-research`

Остановка:

```bash
docker compose -f infra/docker/docker-compose.yml -f infra/docker/docker-compose.override.yml down
```

## Проверка работоспособности

Smoke checks:

```bash
powershell -ExecutionPolicy Bypass -File infra/docker/scripts/smoke-check.ps1
```

Frontend build-check:

```bash
docker compose -f infra/docker/docker-compose.yml -f infra/docker/docker-compose.override.yml exec web sh -lc "NODE_ENV=production npm run build"
```

## Документация MVP

- План: `.docs/express-plan.md`
- Ченджлог версий: `.docs/CHANGELOGE.md`
- Ключевые артефакты этапов: `.docs/mvp-*.md`

