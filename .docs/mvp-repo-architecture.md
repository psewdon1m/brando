# !Открыто к редактированию!

# Шаг 2 — Архитектура репозитория и структура микросервисов

Документ фиксирует целевую структуру монорепозитория для MVP и правила межсервисного взаимодействия на уровне проекта.

---

## Целевая структура репозитория

```text
apps/
  web/                  # Next.js frontend (UI + routes + i18n)
services/
  api-gateway/          # BFF/gateway for frontend
  catalog-service/      # Catalog domain API
  media-service/        # Media domain API
  packages/
    shared-types/         # Shared contracts (DTO, enums, errors)
  ui/                   # Reusable UI components/design primitives
  config/               # Shared configs (eslint, tsconfig, env schema)
infra/
  docker/               # Dockerfiles and compose templates
```

---

## Ответственность модулей

### `apps/web`
- Отрисовка страниц `/`, `/catalog`, `/visual-research`.
- Работа только с `api-gateway`.
- Локальные UI-state и анимации.

### `services/api-gateway`
- Единая точка входа для `web`.
- Композиция и агрегация ответов из доменных сервисов.
- Нормализация ошибок к единому формату.

### `services/catalog-service`
- Лента и секции каталога.
- Подготовка каталог-данных для home preview и catalog page.

### `services/media-service`
- Hero media и visual research media.
- Выдача метаданных и ссылок на медиа-ресурсы.

### `packages/shared-types`
- Общие контракты API запросов/ответов.
- Общие типы ошибок и коды ошибок.

### `packages/ui`
- Библиотека общих frontend-компонентов.
- Токены стилей и адаптеры визуальной системы.

### `packages/config`
- Переиспользуемые конфиги линтинга и переменных окружения.

### `infra/docker`
- Общие Docker-шаблоны.
- Docker Compose файлы для локальной оркестрации сервисов.

---

## Правила межсервисного взаимодействия

- `web` не вызывает `catalog-service` и `media-service` напрямую.
- Внешние запросы frontend идут только в `api-gateway`.
- Межсервисные контракты версионируются через `/api/v1`.
- DTO и коды ошибок синхронизируются через `packages/shared-types`.
- Любое изменение контракта требует обновления:
  - `.docs/mvp-service-boundaries.md`
  - типов в `packages/shared-types`
  - интеграционных проверок в соответствующих сервисах

---

## Критерий завершения шага 2

- Структура репозитория зафиксирована документально.
- Каркас директорий создан в проекте.
- Ответственность модулей и правила взаимодействия определены.
