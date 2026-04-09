'use client'

// ============================================================
// ARTICLE CARD — Карточка статьи для ленты
// Отображается на главной, в категории, в тегах
// Аналог в WP: excerpt template в loop
// ============================================================

import Link from 'next/link'
import { Calendar, Eye, MessageCircle, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface PostCardProps {
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

export default function ArticleCard({
  title,
  slug,
  excerpt,
  coverImage,
  views,
  author,
  category,
  tags,
  createdAt,
  _count,
}: PostCardProps) {
  // Форматируем дату на русском
  const date = new Date(createdAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article className="group rounded-xl border bg-card text-card-foreground overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Обложка */}
      {coverImage ? (
        <Link href={`/article/${slug}`} className="block overflow-hidden">
          <div className="aspect-video bg-muted relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
              📷 {title.slice(0, 30)}...
            </div>
          </div>
        </Link>
      ) : (
        <Link href={`/article/${slug}`} className="block overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-primary/10 via-primary/5 to-muted flex items-center justify-center">
            <span className="text-4xl">📰</span>
          </div>
        </Link>
      )}

      {/* Контент карточки */}
      <div className="p-5">
        {/* Категория */}
        {category && (
          <Link href={`/category/${category.slug}`} className="mb-2 inline-block">
            <Badge variant="secondary" className="text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
              {category.name}
            </Badge>
          </Link>
        )}

        {/* Заголовок */}
        <Link href={`/article/${slug}`}>
          <h2 className="text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h2>
        </Link>

        {/* Анонс */}
        {excerpt && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
        )}

        {/* Теги */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.slice(0, 3).map((tag) => (
              <Link key={tag.slug} href={`/tag/${tag.slug}`}>
                <Badge variant="outline" className="text-xs hover:bg-accent transition-colors">
                  #{tag.name}
                </Badge>
              </Link>
            ))}
          </div>
        )}

        {/* Мета-информация: автор, дата, просмотры, комментарии */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            <span>{author.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            <span>{views}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" />
            <span>{_count.comments}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
