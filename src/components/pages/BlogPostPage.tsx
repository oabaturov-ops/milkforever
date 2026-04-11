'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Calendar, Eye, Tag, User } from 'lucide-react'
import { useNavigation } from '@/lib/navigation'

interface PostData {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string | null
  coverImage?: string | null
  views: number
  createdAt: string
  author?: { id: string; name: string; avatar?: string | null; bio?: string | null } | null
  category?: { id: string; name: string; slug: string } | null
  tags?: { id: string; tag: { id: string; name: string; slug: string } }[]
}

export default function BlogPostPage() {
  const { currentPostSlug, navigateTo } = useNavigation()
  const [post, setPost] = useState<PostData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchPost = useCallback(async (slug: string) => {
    try {
      setError(false)
      const r = await fetch(`/api/posts/${slug}`)
      if (!r.ok) throw new Error()
      const data = await r.json()
      setPost(data)
      setLoading(false)
    } catch {
      setError(true)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (currentPostSlug) {
      fetchPost(currentPostSlug)
    }
  }, [currentPostSlug, fetchPost])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  // Простой Markdown рендерер для контента статьи
  const renderContent = (content: string) => {
    const lines = content.split('\n')
    const elements: React.ReactNode[] = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

      // Заголовок H2
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-xl md:text-2xl font-bold mt-8 mb-4 text-foreground">
            {line.slice(3)}
          </h2>
        )
        i++
      }
      // Заголовок H1 (пропускаем, т.к. title отображается отдельно)
      else if (line.startsWith('# ')) {
        i++
      }
      // Пустая строка
      else if (line.trim() === '') {
        i++
      }
      // Обычный параграф
      else {
        // Собираем все подряд идущие непустые строки как один абзац
        let paragraph = line
        while (i + 1 < lines.length && lines[i + 1].trim() !== '' && !lines[i + 1].startsWith('#')) {
          i++
          paragraph += ' ' + lines[i]
        }
        elements.push(
          <p key={i} className="text-muted-foreground leading-relaxed mb-4 text-[17px]">
            {paragraph}
          </p>
        )
        i++
      }
    }

    return elements
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-6 w-2/3 mb-8" />
          <Skeleton className="h-72 w-full mb-8 rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Статья не найдена</h2>
          <p className="text-muted-foreground mb-6">Возможно, она была удалена или перемещена</p>
          <Button onClick={() => navigateTo('home')} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Кнопка назад */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigateTo('home')}
            className="mb-8 gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад
          </Button>
        </motion.div>

        {/* Мета-информация */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          {post.category && (
            <Badge variant="outline" className="mb-3 border-green-300 text-green-700 dark:text-green-400 dark:border-green-700">
              {post.category.name}
            </Badge>
          )}
        </motion.div>

        {/* Заголовок */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6"
        >
          {post.title}
        </motion.h1>

        {/* Информация об авторе и дата */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground"
        >
          {post.author && (
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <span>{post.author.name}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="h-4 w-4" />
            <span>{post.views} просмотров</span>
          </div>
        </motion.div>

        {/* Обложка */}
        {post.coverImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
            />
          </motion.div>
        )}

        {/* Теги */}
        {post.tags && post.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            <Tag className="h-4 w-4 text-muted-foreground mt-0.5" />
            {post.tags.map((t) => (
              <Badge key={t.tag.id} variant="secondary" className="text-xs">
                {t.tag.name}
              </Badge>
            ))}
          </motion.div>
        )}

        {/* Контент */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="prose-custom"
        >
          {renderContent(post.content)}
        </motion.div>

        {/* CTA после статьи */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40 border-green-200 dark:border-green-800">
            <CardContent className="p-6 md:p-8 text-center">
              <h3 className="text-xl font-bold mb-3">Нужна консультация по строительству фермы?</h3>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Свяжитесь с нами — рассчитаем стоимость, подберём оборудование и поможем получить субсидию
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://max.ru/590300963613_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold h-11 rounded-lg transition-colors px-6"
                >
                  Написать в Max
                </a>
                <a
                  href="tel:+79026489672"
                  className="inline-flex items-center justify-center gap-2 border-2 border-green-600 text-green-700 hover:bg-green-50 dark:text-green-400 font-semibold h-11 rounded-lg transition-colors px-6"
                >
                  8-902-648-96-72
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Кнопка назад */}
        <div className="mt-10 text-center">
          <Button
            variant="outline"
            onClick={() => navigateTo('home')}
            className="gap-2 border-green-300 text-green-700 hover:bg-green-50 dark:text-green-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Все статьи
          </Button>
        </div>
      </div>
    </div>
  )
}
