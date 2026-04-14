'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Calendar, Eye, Tag, User, Share2 } from 'lucide-react'
import { useNavigation } from '@/lib/navigation'

// VK share function
const shareToVK = (title: string, url: string) => {
  const shareUrl = `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
  window.open(shareUrl, '_blank', 'width=600,height=400')
}

interface PostData {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string | null
  coverImage?: string | null
  views: number
  createdAt: string
  author?: { id?: string; name: string; avatar?: string | null; bio?: string | null } | null
  category?: { id: string; name: string; slug: string } | null
  tags?: { id: string; name: string; slug: string }[]
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
              <Badge key={t.id} variant="secondary" className="text-xs">
                {t.name}
              </Badge>
            ))}
          </motion.div>
        )}

        {/* Поделиться */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.27 }}
          className="flex items-center gap-3 mb-8"
        >
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-[#0077FF]/30 text-[#0077FF] hover:bg-[#0077FF]/10 hover:text-[#0077FF]"
            onClick={() => shareToVK(post.title, `https://milkforever.ru/blog/${post.slug}`)}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.339-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.847 2.49 2.273 4.675 2.849 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.153-3.574 2.153-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/></svg>
            Поделиться в ВК
          </Button>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Share2 className="h-3 w-3" />
          </span>
        </motion.div>

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
                  href="https://t.me/MilkForeverServiceBot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#229ED9] hover:bg-[#1D8AC1] text-white font-semibold h-11 rounded-lg transition-colors px-6"
                >
                  Написать в Telegram
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
