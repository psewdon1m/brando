# !НЕ РЕДАКТИРОВАТЬ!

# Git Management — Управление версиями проекта

Документирует git workflow, версионирование и правила работы с репозиторием.

---

## Содержание

1. [Репозиторий и ветки](#репозиторий-и-ветки)
2. [Версионирование](#версионирование)
3. [Branching Strategy](#branching-strategy)
4. [Commit Guidelines](#commit-guidelines)
5. [Release Process](#release-process)
6. [Documentation Sync](#documentation-sync)

---

## Репозиторий и ветки

**URL:** https://github.com/psewdon1m/brando.git

### Основные ветки

| Ветка | Назначение | Защита | CI/CD |
|-------|------------|--------|-------|
| **mvp** | mvp версия проекта | Нет | Нет |
| **dev** (default) | Основная разработка | Нет | Lint, test, build |
| **stage** | Предпродакшн тестирование | PR review | +Интеграционные тесты, stage deploy |
| **prod** | Продакшн | Multiple approvals | +Security scans, production deploy |

**Особенности:** Теги доступны во всех ветках, но деплой происходит только из соответствующих веток.
**Важно:** Для релизов используем только аннотированные теги (`git tag -a`), lightweight-теги не используем.

### .gitignore стратегия

Единый файл с условными правилами:
- **Dev:** Включает dev-инструменты, логи, кэш
- **Stage/Prod:** Автоочистка через git hooks, только продакшн-ready файлы

**Всегда исключать:** `.env*`, `secrets/`, `*.log`

---

## Версионирование

### Формат версий

Используем короткий формат версий:
- `v1.23`
- `v1.25 → v1.26`
- `v0.02`

### Определение версии

```bash
# Проверить текущую версию
git describe --tags --abbrev=0

# Следующая версия:
# v1.25 → v1.26 
```

### Обновление версии

**Workflow по веткам:**

**Dev ветка:**
1. Реализовать фичи в dev
2. Push в dev (CI/CD тестирование)
3. Создать аннотированный tag при достижении milestones
4. Обновить `.docs/CHANGELOGE.md`

**Stage ветка:**
1. Merge стабильной версии из dev в stage
2. Провести интеграционное тестирование
3. Создать stage tag (v1.2.3-stage.1)
4. Deploy на stage environment

**Prod ветка:**
1. Финальное тестирование на stage
2. Merge в prod ветку
3. Создать production tag (v1.2.3)
4. Manual deploy на production

### Формат обновления CHANGELOGE.md

```
v1.23 (dev) (2026-02-07 19:25): краткое описание
```

**Правила:**
- Новые версии добавляются сверху
- Обязательно указывать ветку: `(mvp)`, `(dev)`, `(stage)`, `(prod)`
- Формат даты: YYYY-MM-DD HH:MM

**Примеры:**
```
v1.30 (dev) (2025-11-25 16:30): persona management system
v1.26 (prod) (2025-11-23 10:00): production deployment
```

---

## Commit Guidelines

### Формат commit message

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`


**Примеры:**
```
feat(projects): add drag-and-drop placeholder reordering
fix(media): increase upload timeout for large files
docs(api): update API usage examples
```

**Проверка:** Pre-commit hooks с commitlint автоматически проверяют формат.

---

## Release Process

### Pre-release Checklist по веткам

**Для dev релиза:**
- [ ] Feature полностью реализована и протестирована
- [ ] Локальные тесты проходят
- [ ] Код соответствует code style
- [ ] [`.docs/CHANGELOGE.md`](CHANGELOGE.md) updated с `(dev)`

**Для stage релиза:**
- [ ] Стабильная версия из dev
- [ ] Интеграционные тесты пройдены
- [ ] QA approval получен
- [ ] [`.docs/CHANGELOGE.md`](CHANGELOGE.md) updated с `(stage)`
- [ ] Stage environment готов

**Для prod релиза:**
- [ ] Stage testing завершено успешно
- [ ] Все acceptance criteria выполнены
- [ ] Performance и security checks пройдены
- [ ] [`.docs/CHANGELOGE.md`](CHANGELOGE.md) updated с `(prod)`
- [ ] Rollback plan подготовлен

---

### Release Steps по веткам

**Dev Release:**
```bash
# В dev ветке
git checkout dev
git pull origin dev

# Обновить CHANGELOGE.md
echo "v1.26 (dev) (2025-11-20 15:30): feature description" >> .docs/CHANGELOGE.md

# Commit и push
git add .docs/CHANGELOGE.md
git commit -m "docs: update CHANGELOGE.md for v1.26 dev release"
git push origin dev

# Создать tag
git tag -a v1.26-dev -m "Dev release v1.26"
git push origin v1.26-dev
```

**Stage Release:**
```bash
# Создать stage ветку от dev
git checkout dev
git pull origin dev
git checkout -b stage
git push origin stage

# Обновить CHANGELOGE.md для stage
echo "v1.26-stage (stage) (2025-11-21 10:00): stage testing" >> .docs/CHANGELOGE.md

# Commit и tag
git add .docs/CHANGELOGE.md
git commit -m "docs: prepare v1.26 for stage testing"
git tag -a v1.26-stage -m "Stage release v1.26-stage"
git push origin stage
git push origin v1.26-stage
```

**Prod Release:**
```bash
# Создать prod ветку от stage
git checkout stage
git pull origin stage
git checkout -b prod
git push origin prod

# Финальное обновление CHANGELOGE.md
echo "v1.26 (prod) (2025-11-22 14:00): production release" >> .docs/CHANGELOGE.md

# Commit и tag
git add .docs/CHANGELOGE.md
git commit -m "docs: production release v1.26"
git tag -a v1.26 -m "Production release v1.26"
git push origin prod
git push origin v1.26
```

---

### GitHub Releases

**Для production релизов:**
- Перейти в GitHub → Releases → New Release
- Select tag: v1.26
- Title: "Venus v1.26 - Production Release"
- Publish release

**Post-release monitoring:**
- Verify production deployment successful
- Monitor error rates и performance metrics
- Rollback готовность (stage ветка)

---

## Documentation Sync

### Какие файлы синхронизировать

**При каждом tag push:**
- [`.docs/CHANGELOGE.md`](CHANGELOGE.md) — обязательно с указанием ветки

**При значительных изменениях:**
Те файлы, которые описывают механики, подвергшиеся изменениям.

---


---


## Troubleshooting

**Забыли обновить CHANGELOGE.md:**
```bash
echo "v1.2.6 (dev) (2025-11-20 15:30): description" >> .docs/CHANGELOGE.md
git add .docs/CHANGELOGE.md && git commit --amend --no-edit
```

**Неправильная версия tag:**
```bash
git tag -d v1.2.6 && git push origin :refs/tags/v1.2.6
git tag -a v1.2.7 -m "Correct version" && git push origin v1.2.7
```

**Committed секретные файлы:**
```bash
git rm --cached .env && git commit -m "chore: remove .env from git"
```

---

## Best Practices

- **Атомарные commits:** Один commit = одна логическая единица изменений
- **Частые commits:** Commit рано и часто для лучшей traceability
- **Pull before push:** Всегда синхронизируйтесь перед push
- **Review changes:** Просматривайте `git diff --staged` перед commit

---

## Связь с CI/CD

Git operations триггерят CI/CD pipeline по веткам:

**Dev ветка:**
- Push: автоматический CI (lint, test, build)
- Tag: создание dev release, обновление CHANGELOGE.md

**Stage ветка:**
- Push: CI + интеграционные тесты
- Tag: deploy на stage environment
- PR review: обязательно перед merge

**Prod ветка:**
- Push: финальный CI + security scans
- Tag: production deployment (manual approval)
- Releases: создание GitHub releases

## Восстановление и откаты

### Откат к предыдущей версии

```bash
# Откатить working directory к тегу
git checkout v1.25

# Создать branch от этой версии
git checkout -b hotfix/rollback-v1.25

# Или hard reset (ОСТОРОЖНО!)
git reset --hard v1.25
```

### Откат к конкретному commit

```bash
# Найти commit hash
git log --oneline

# Soft reset (сохранить changes как uncommitted)
git reset --soft abc123

# Hard reset (удалить все changes)
git reset --hard abc123  # ОСТОРОЖНО!
```

---
