# !Открыто к редактированию!

# Шаг 3 — Docker-базис MVP

Документ фиксирует базовую Docker-конфигурацию для локального запуска микросервисного каркаса MVP.

---

## Состав Docker-базиса

1. `apps/web/Dockerfile`
2. `services/api-gateway/Dockerfile`
3. `services/catalog-service/Dockerfile`
4. `services/media-service/Dockerfile`
5. `infra/docker/docker-compose.yml`
6. `infra/docker/docker-compose.override.yml`

---

## Порты сервисов

- `web`: `3000`
- `api-gateway`: `8080`
- `catalog-service`: `8081`
- `media-service`: `8082`

---

## Команды запуска

Из корня репозитория:

```bash
docker compose -f infra/docker/docker-compose.yml -f infra/docker/docker-compose.override.yml up --build
```

Остановка:

```bash
docker compose -f infra/docker/docker-compose.yml -f infra/docker/docker-compose.override.yml down
```

---

## Что покрыто в шаге 3

- Отдельный `Dockerfile` для каждого сервиса.
- Базовый orchestration через `docker-compose`.
- Dev-override с монтированием директорий сервисов в контейнеры.

---

## Что не покрыто в шаге 3

- Подключение БД/кэша.
- Миграции и инициализация данных.
- Production hardening Docker-образов.

---

## Критерий завершения шага 3

- Контейнеры `web`, `api-gateway`, `catalog-service`, `media-service` собираются.
- Сервисы доступны на локальных портах.
- Конфигурация разделена на базовую и dev override.

