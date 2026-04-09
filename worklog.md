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
