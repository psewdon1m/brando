# !Открыто к редактированию!

# Шаг 8 — Интернационализация и UI-полировка

Документ фиксирует внедрение `next-intl` (`ru/en`) и UI-полировку с анимациями.

---

## Интернационализация

Реализовано через `next-intl`:
- `apps/web/middleware.js`
- `apps/web/i18n/routing.js`
- `apps/web/i18n/request.js`
- `apps/web/messages/ru.json`
- `apps/web/messages/en.json`

Маршруты локалей:
- `/ru`
- `/en`
- `/ru/catalog`, `/en/catalog`
- `/ru/visual-research`, `/en/visual-research`

Переходы без локали:
- `/` -> redirect на `/ru`
- `/catalog` -> redirect на `/ru/catalog`
- `/visual-research` -> redirect на `/ru/visual-research`

---

## UI-полировка

- Обновлен layout под локализованную навигацию и переключатель языка.
- Добавлен `AnimatedSection` на базе `Framer Motion`.
- Усилены визуальные акценты через CSS-анимацию появления секций.

---

## Критерий завершения шага 8

- Интерфейс доступен на `ru/en`.
- Навигация и данные работают в обеих локалях.
- Базовые анимации применены и не ломают адаптивность.

