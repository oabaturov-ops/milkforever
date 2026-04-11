# МедиаБлог — Worklog

## [2025-04-08] Полная перестройка проекта

### Описание
Полная перестройка блога/медиа/новостного фреймворка с нуля. Создан полноценный блог-проект с административной панелью, системой модулей и всеми необходимыми API-маршрутами.

### Что было создано

#### 1. База данных (Prisma + SQLite)
- **8 таблиц**: User, Post, Category, Tag, PostTag, Comment, Subscriber, Setting
- Схема включает полные отношения (OneToMany, ManyToMany через PostTag, самосвязь для комментариев)
- Запушена через `bun run db:push`

#### 2. Сид-данные
- 4 пользователя (1 администратор, 3 автора)
- 5 категорий: Технологии, Наука, Бизнес, Культура, Программирование
- 5 тегов: AI, JavaScript, Стартапы, Наука, Бизнес
- 4 опубликованных статьи с развёрнутым русскоязычным контентом
- 3 комментария
- 12 модулей настроек (все включены по умолчанию)

#### 3. API-маршруты (6 эндпоинтов)
- `GET|POST /api/posts` — список с пагинацией/фильтрами + создание
- `GET|DELETE /api/posts/[slug]` — просмотр + удаление статьи
- `GET|POST /api/comments` — комментарии к статье + новый комментарий
- `GET|PUT /api/settings` — все настройки + обновление модулей
- `GET /api/categories` — список категорий с счётчиком статей
- `GET /api/tags` — список тегов
- `POST /api/subscribe` — подписка на рассылку

#### 4. Обновлённые стили (globals.css)
- Брендовые синие цвета для светлой и тёмной тем
- Light: `--primary: oklch(0.55 0.22 260)`
- Dark: `--primary: oklch(0.7 0.18 260)`
- Обновлены `--ring`, `--sidebar-primary`, `--sidebar-ring`

#### 5. Компоненты
- **ThemeProvider** — клиентский компонент с `useSyncExternalStore`, localStorage, системными предпочтениями
- **Header** — sticky хедер с градиентной полосой, навигацией, поиском, переключателем темы, мобильным меню
- **Footer** — 3 колонки (о сайте, рубрики, рассылка), копирайт

#### 6. Layout
- SEO-метаданные на русском языке
- Open Graph теги
- `lang="ru"` на html-теге

#### 7. Главная страница (page.tsx) — SPA с 3 представлениями
- **Blog Feed**: Hero-баннер, сетка карточек статей, пагинация, сайдбар с категориями и тегами
- **Article Detail**: Полная статья (markdown→HTML), карточка автора, теги, комментарии (форма + список)
- **Admin Panel**: Авторизация, дашборд со статистикой, таблица статей, 12 модулей с Switch-переключателями
- Навигация через useState (state-based router)
- Framer Motion анимации переходов

#### 8. Plugin Engine (plugin-settings.ts)
- `getDefaultModules()` — массив из 12 модулей с параметрами
- TypeScript-интерфейсы для ModuleDefinition, ModuleParam

### Файлы проекта

```
prisma/schema.prisma          — Схема БД
prisma/seed.ts                — Сид-данные
src/app/globals.css           — Глобальные стили с brand-blue
src/app/layout.tsx            — Корневой layout
src/app/page.tsx              — Главная страница (SPA)
src/lib/db.ts                 — Prisma клиент
src/lib/plugin/plugin-settings.ts — Конфигурация модулей
src/components/layout/ThemeProvider.tsx — Провайдер темы
src/components/layout/Header.tsx      — Шапка сайта
src/components/layout/Footer.tsx      — Подвал сайта
src/app/api/posts/route.ts           — API: список/создание статей
src/app/api/posts/[slug]/route.ts    — API: статья/удаление
src/app/api/comments/route.ts        — API: комментарии
src/app/api/settings/route.ts        — API: настройки
src/app/api/categories/route.ts      — API: категории
src/app/api/tags/route.ts            — API: теги
src/app/api/subscribe/route.ts       — API: подписка
```

### Зависимости
- Все существующие shadcn/ui компоненты использованы (Card, Button, Badge, Switch, Input, Tabs, Table, Skeleton, etc.)
- framer-motion для анимаций переходов
- react-markdown не использован напрямую — реализован простой markdown-рендерер в page.tsx

### Проблемы и решения
- ESLint ошибка `react-hooks/set-state-in-effect` — исправлена переносом setState в .then() коллбэки
- Удалён старый `/api/route.ts`

### Проверка
- `bun run lint` — пройден без ошибок
- Dev-сервер работает корректно

---

## [2025-04-09] Перестройка сайта «Ферма Под Ключ»

### Описание
Полная перестройка проекта из медиа-блога в B2B-сайт строительной компании «Ферма Под Ключ» (молочные фермы). Все тексты, цвета и функциональность переписаны с нуля.

### Что было изменено

#### 1. globals.css — Брендовые цвета фермы
- **Primary (Green)**: Light `oklch(0.55 0.15 145)`, Dark `oklch(0.65 0.15 145)`
- **Secondary (Blue)**: `oklch(0.50 0.18 250)` для акцентов
- **Background**: светло-зелёный оттенок `oklch(0.97 0.002 120)`
- Все переменные (card, popover, muted, accent, sidebar и др.) обновлены в зелёной палитре
- Chart-цвета пересчитаны в зелёных/изумрудных тонах

#### 2. layout.tsx — Обновлённые метаданные
- Title: «Ферма Под Ключ | Строительство молочных ферм под ключ»
- Description: «Проектирование, строительство и сопровождение молочных ферм...»
- Ключевые слова: ферма под ключ, молочная ферма, строительство ферм и др.
- Open Graph и Twitter Card мета-теги
- Встроен Header и Footer в layout (больше не нужно передавать props)

#### 3. Header.tsx — Профессиональный B2B хедер
- Логотип: «🐄 Ферма Под Ключ» с зелёным градиентом
- Верхняя зелёная полоса: `from-green-700 via-green-400 to-emerald-400`
- Навигация: Главная, О компании, Услуги (dropdown с 5 подпунктами), Блог, Контакты
- Телефон: 8-902-648-96-72 (скрыт на мобильных, отображается в мобильном меню)
- Sticky хедер с backdrop-blur
- Мобильное hamburger-меню с полным набором навигации
- Переключатель тёмной/светлой темы

#### 4. Footer.tsx — Профессиональный подвал
- Описание компании с логотипом
- Блок навигации (5 ссылок)
- Контактная информация (телефон, email, адрес, режим работы)
- Ссылка на Telegram (t.me/Milk_Forever_Business)
- Форма подписки на новости
- Copyright © 2025 Ферма Под Ключ

#### 5. page.tsx — Главная страница с 7 секциями
- **Hero Section**: Заголовок «Молочные фермы под ключ», подзаголовок, 2 CTA-кнопки, градиентный зелёный фон с декоративными эффектами
- **Услуги (6 карточек)**: Проектирование, Строительство, Оборудование, Сервис, Субсидии, Сопровождение — с иконками (emoji) и описаниями
- **Почему мы (4 преимущества)**: 15+ лет опыта, 50+ ферм, гарантия, помощь с финансированием
- **Статистика**: 50+ ферм, 15+ лет, 2000+ коров, 100% довольных клиентов
- **Превью блога**: Загрузка статей из API, 3 карточки с изображениями, скелетон-загрузка
- **CTA-форма**: «Готовы начать строительство?» — форма с полями Имя, Телефон, Сообщение, анимация отправки
- **Контактная информация**: Телефон, email, адрес, режим работы в карточках

#### 6. Prisma Schema — Добавлена модель ContactFormSubmission
- Поля: id, name, phone, email?, message?, createdAt
- Все остальные модели сохранены

#### 7. API-маршруты
- **POST /api/contact** — Отправка контактной формы (создаёт ContactFormSubmission)
- **GET /api/contact** — Получение списка заявок (для админки)
- Все остальные API сохранены: posts, posts/[slug], categories, tags, settings, subscribe, comments

#### 8. Начальные данные (seed.ts)
- 2 пользователя (Олег — admin, Ферма Под Ключ — author)
- 4 категории: Проектирование, Строительство, Оборудование, Гранты и субсидии
- 5 тегов: Молочное животноводство, Фермы, Оборудование, Субсидии, Проектирование
- 4 статьи о молочных фермах (с подробным контентом, cover-изображениями)
- 1 пример заявки из контактной формы
- 12 модулей настроек

#### 9. ThemeProvider.tsx — Обновлён storage key
- Ключ: `ferma-pod-klyuch-theme`
- Исправлен import (React не используется как default export в React 19)

### Проблемы и решения
- **ThemeProvider import**: React 19 с TypeScript 5.9 не поддерживает `import React, { x }` — исправлено на `import { x } from 'react'`
- **Framer Motion type**: `ease: 'easeOut'` требовал тип `Easing`, а не `string` — исправлено через `as const`
- **Dev server EADDRINUSE**: Предыдущий dev-сервер уже занимал порт 3000 — автоматический restart через dev.sh

### Проверка
- ✅ `bun run lint` — пройден без ошибок
- ✅ `npx next build` — скомпилирован успешно
- ✅ `npx prisma generate && npx prisma db push && npx tsx prisma/seed.ts` — БД настроена, данные загружены
- ✅ Dev-сервер работает, страница загружается (GET / 200), API отвечает (GET /api/posts?limit=3 200)

---
Task ID: 1
Agent: Main Agent
Task: Fix blog post links and create BlogPostPage component

Work Log:
- Added 'post' to PageName type in navigation.tsx
- Added currentPostSlug state and slug parameter to navigateTo function
- Created BlogPostPage component with full article view (loading skeleton, error state, markdown renderer, CTA)
- Added onClick handlers to blog preview cards to navigate to post page
- Added BlogPostPage route in PageRouter
- Passed lint checks

Stage Summary:
- Blog posts are now clickable and open full article view
- Article page shows: title, category badge, author, date, views, cover image, tags, full content, CTA with Telegram/phone
- Markdown renderer supports H2 headings and paragraphs

---
Task ID: 2
Agent: Main Agent
Task: Write 5 SEO articles and add to database

Work Log:
- Wrote 5 SEO articles covering requested topics
- Created script to add articles to Prisma/SQLite database
- All articles tagged with relevant categories and tags

Stage Summary:
- Article 1: "Кормление телят: первые 60 дней решают всё" (Советы фермерам)
- Article 2: "Премиксы для коров: зачем платить за витамины в мешке" (Советы фермерам)
- Article 3: "Шроты и жмыхи в рационе коровы: как растительный белок увеличить надои" (Советы фермерам)
- Article 4: "5 добавок, которые реально повышают надои" (Советы фермерам)
- Article 5: "Вентиляция на молочной ферме: как свежий воздух добавляет молока" (Строительство)
- Total articles in blog: 14

---
Task ID: 3
Agent: Main Agent
Task: Generate stock photos for blog articles

Work Log:
- Downloaded 14 stock photos from Unsplash for all blog articles
- Stored in /public/blog/ directory
- Updated all 14 posts in database with local image paths

Stage Summary:
- All 14 blog articles now have local cover images (/blog/*.jpg)
- Images sized 1344x768 for consistent card display
