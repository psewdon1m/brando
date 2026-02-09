# !Открыто к редактированию!

# Шаг 7 — Frontend MVP (`Next.js`)

Документ фиксирует реализацию MVP frontend-приложения на `Next.js` (App Router) с подключением к `api-gateway`.

---

## Реализованные страницы

- `/` (главная)
- `/catalog`
- `/visual-research`

---

## Что реализовано

1. Каркас `Next.js` приложения в `apps/web`:
- `package.json`
- `next.config.mjs`
- `jsconfig.json`
- `app/layout.js`
- `app/globals.css`

2. Интеграция с BFF (`api-gateway`) через `apps/web/lib/api.js`:
- `GET /api/v1/home`
- `GET /api/v1/catalog`
- `GET /api/v1/visual-research`

3. UI-логика страниц:
- Главная: hero-video блок + preview каталога
- Каталог: лента с акцентными карточками
- Визуальное исследование: видео-дневник с короткими подписями

4. Поведение при недоступности API:
- Показываются fallback-блоки вместо падения страницы

---

## Docker

`apps/web/Dockerfile` обновлен для запуска Next.js:
- `npm install`
- `npm run dev`

---

## Критерий завершения шага 7

- Три страницы frontend доступны через `web` сервис.
- Frontend получает данные через `api-gateway`.
- Базовая адаптивность и навигация между страницами работают.

