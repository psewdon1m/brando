# !Открыто к редактированию!

# Шаг 4 — Инфраструктурные зависимости MVP

Документ фиксирует подключение инфраструктурных зависимостей на этапе MVP и стартовую инициализацию данных.

---

## Добавленные зависимости

1. `PostgreSQL` (`postgres:16-alpine`)
2. `Redis` (`redis:7-alpine`)

Обе зависимости подключены в `infra/docker/docker-compose.yml`.

---

## Подключение сервисов

`catalog-service` и `media-service` получают env-переменные:
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- `REDIS_HOST`, `REDIS_PORT`

`web` и `api-gateway` получают сервисные URL для внутренних вызовов.

---

## Инициализация PostgreSQL

Инициализация выполняется при первом старте контейнера через:
- `infra/docker/postgres/init/001_schema.sql`
- `infra/docker/postgres/init/002_seed.sql`

Созданы таблицы:
- `catalog_items`
- `media_entries`

Добавлены стартовые seed-данные для:
- ленты каталога
- hero media
- visual research media

---

## Healthchecks и зависимости запуска

- `postgres`: `pg_isready`
- `redis`: `redis-cli ping`
- `catalog-service` и `media-service` запускаются после готовности `postgres` и `redis`.

---

## Критерий завершения шага 4

- Инфраструктурные зависимости добавлены в Docker Compose.
- Есть стартовая схема и seed для MVP.
- Базовые сервисы получают параметры подключения к БД и Redis.

