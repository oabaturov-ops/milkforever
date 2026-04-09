// ============================================================
// ТИПЫ ДАННЫХ — Описания структур для TypeScript
// Аналог "инструкций" — TypeScript проверяет, чтобы данные
// соответствовали этим описаниям (ловит ошибки до запуска)
// ============================================================

// ─────────────────────────────────────
// Роли пользователей
// ─────────────────────────────────────
export type UserRole = 'ADMIN' | 'AUTHOR' | 'READER'

// ─────────────────────────────────────
// Статусы статей
// ─────────────────────────────────────
export type PostStatus = 'PUBLISHED' | 'DRAFT' | 'ARCHIVED'

// ─────────────────────────────────────
// Статусы комментариев
// ─────────────────────────────────────
export type CommentStatus = 'APPROVED' | 'PENDING' | 'REJECTED'

// ─────────────────────────────────────
// Типы настроек
// ─────────────────────────────────────
export type SettingType = 'BOOLEAN' | 'STRING' | 'NUMBER'

// ─────────────────────────────────────
// Пользователь (упрощённый, без пароля)
// ─────────────────────────────────────
export interface UserPublic {
  id: string
  name: string
  email: string
  role: UserRole
  avatar: string | null
  bio: string | null
  createdAt: string
}

// ─────────────────────────────────────
// Статья (для отображения на сайте)
// ─────────────────────────────────────
export interface PostPublic {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  coverImage: string | null
  status: PostStatus
  views: number
  author: { name: string; avatar: string | null }
  category: { name: string; slug: string } | null
  tags: { name: string; slug: string }[]
  createdAt: string
  updatedAt: string
  _count?: { comments: number }
}

// ─────────────────────────────────────
// Статья в карточке (для ленты — без полного текста)
// ─────────────────────────────────────
export interface PostCard {
  id: string
  title: string
  slug: string
  excerpt: string | null
  coverImage: string | null
  views: number
  author: { name: string; avatar: string | null }
  category: { name: string; slug: string } | null
  tags: { name: string; slug: string }[]
  createdAt: string
  _count: { comments: number }
}

// ─────────────────────────────────────
// Категория
// ─────────────────────────────────────
export interface CategoryPublic {
  id: string
  name: string
  slug: string
  description: string | null
  _count: { posts: number }
}

// ─────────────────────────────────────
// Тег
// ─────────────────────────────────────
export interface TagPublic {
  id: string
  name: string
  slug: string
  _count: { posts: number }
}

// ─────────────────────────────────────
// Комментарий
// ─────────────────────────────────────
export interface CommentPublic {
  id: string
  content: string
  authorName: string
  authorEmail: string
  authorAvatar: string | null
  postId: string
  parentId: string | null
  status: CommentStatus
  createdAt: string
  replies?: CommentPublic[]
}

// ─────────────────────────────────────
// Настройка модуля
// ─────────────────────────────────────
export interface SettingItem {
  id: string
  module: string
  key: string
  value: string
  type: SettingType
}

// ─────────────────────────────────────
// Группа настроек модуля (для админки)
// ─────────────────────────────────────
export interface ModuleSettings {
  module: string
  label: string
  icon: string
  description: string
  settings: SettingItem[]
}

// ─────────────────────────────────────
// Пагинация
// ─────────────────────────────────────
export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
}

// ─────────────────────────────────────
// API-ответы (стандартные обёртки)
// ─────────────────────────────────────
export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface ApiError {
  error: string
  message: string
}
