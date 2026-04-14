'use client'

import { useState, useEffect, useCallback, useReducer } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ArrowLeft, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useNavigation } from '@/lib/navigation'

interface Category {
  id: string
  name: string
  slug: string
  _count?: { posts: number }
}

interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  coverImage?: string | null
  published: boolean
  views: number
  createdAt: string
  category?: { id: string; name: string; slug: string } | null
  tags?: { id: string; name: string; slug: string }[]
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' as const },
  }),
}

interface State {
  posts: Post[]
  categories: Category[]
  loading: boolean
  activeCategory: string
  searchQuery: string
  totalPosts: number
  page: number
}

type Action =
  | { type: 'SET_LOADING'; value: boolean }
  | { type: 'SET_POSTS'; posts: Post[]; total: number }
  | { type: 'SET_CATEGORIES'; categories: Category[] }
  | { type: 'SET_CATEGORY'; category: string }
  | { type: 'SET_SEARCH'; query: string }
  | { type: 'SET_PAGE'; page: number }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LOADING': return { ...state, loading: action.value }
    case 'SET_POSTS': return { ...state, posts: action.posts, totalPosts: action.total }
    case 'SET_CATEGORIES': return { ...state, categories: action.categories }
    case 'SET_CATEGORY': return { ...state, activeCategory: action.category, page: 1 }
    case 'SET_SEARCH': return { ...state, searchQuery: action.query, page: 1 }
    case 'SET_PAGE': return { ...state, page: action.page }
    default: return state
  }
}

const LIMIT = 9

export default function BlogListPage() {
  const { navigateTo } = useNavigation()
  const [state, dispatch] = useReducer(reducer, {
    posts: [],
    categories: [],
    loading: true,
    activeCategory: 'all',
    searchQuery: '',
    totalPosts: 0,
    page: 1,
  })

  const { posts, categories, loading, activeCategory, searchQuery, totalPosts, page } = state

  const loadPosts = useCallback(async (p?: number, cat?: string, q?: string) => {
    const currentPage = p ?? page
    const currentCat = cat ?? activeCategory
    const currentQ = q ?? searchQuery
    try {
      let url = `/api/posts?page=${currentPage}&limit=${LIMIT}`
      if (currentCat !== 'all') url += `&categoryId=${currentCat}`
      if (currentQ) url += `&search=${encodeURIComponent(currentQ)}`

      const r = await fetch(url)
      const data = await r.json()
      dispatch({ type: 'SET_POSTS', posts: data.posts || [], total: data.pagination?.total || 0 })
    } catch {
      dispatch({ type: 'SET_POSTS', posts: [], total: 0 })
    }
  }, [page, activeCategory, searchQuery])

  const loadCategories = useCallback(async () => {
    try {
      const r = await fetch('/api/categories')
      if (r.ok) {
        const data = await r.json()
        dispatch({ type: 'SET_CATEGORIES', categories: data || [] })
      }
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', value: true })
    Promise.all([loadPosts(), loadCategories()]).then(() => {
      dispatch({ type: 'SET_LOADING', value: false })
    })
  }, [loadPosts, loadCategories])

  const handleCategoryChange = (catId: string) => {
    dispatch({ type: 'SET_CATEGORY', category: catId })
    loadPosts(1, catId, searchQuery)
  }

  const handleSearchChange = (q: string) => {
    dispatch({ type: 'SET_SEARCH', query: q })
    loadPosts(1, activeCategory, q)
  }

  const handlePageChange = (newPage: number) => {
    dispatch({ type: 'SET_PAGE', page: newPage })
    loadPosts(newPage)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const totalPages = Math.ceil(totalPosts / LIMIT)

  return (
    <div className="min-h-screen bg-background">
      {/* Заголовок */}
      <div className="bg-gradient-to-b from-green-800 via-green-700 to-emerald-700 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="ghost"
              onClick={() => navigateTo('home')}
              className="mb-6 gap-2 text-green-100 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              На главную
            </Button>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
              Блог
            </h1>
            <p className="text-green-100/80 text-lg max-w-2xl">
              Полезные материалы о молочном животноводстве, строительстве ферм, оборудовании и субсидиях
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Поиск */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8 max-w-md"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск статей..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Фильтр по категориям */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === 'all'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-400'
            }`}
          >
            Все ({totalPosts})
          </button>
          {categories.map((cat) => {
            const count = cat._count?.posts || 0
            if (count === 0) return null
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-700 dark:hover:text-green-400'
                }`}
              >
                {cat.name}
              </button>
            )
          })}
        </motion.div>

        {/* Сетка статей */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="h-full">
                <Skeleton className="h-48 w-full rounded-t-lg" />
                <CardHeader>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground mb-2">Статьи не найдены</p>
            <p className="text-muted-foreground text-sm">Попробуйте изменить фильтры или поисковый запрос</p>
          </div>
        ) : (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {posts.map((post, i) => (
                <motion.div key={post.id} custom={i} variants={fadeInUp}>
                  <Card
                    className="group h-full hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => navigateTo('post', post.slug)}
                  >
                    {post.coverImage && (
                      <div className="overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <CardHeader className="flex-1">
                      {post.category && (
                        <Badge variant="secondary" className="w-fit text-xs mb-2">
                          {post.category.name}
                        </Badge>
                      )}
                      <CardTitle className="text-lg leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 mt-2">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(post.createdAt)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {post.views} просмотров
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Пагинация */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => handlePageChange(page - 1)}
                  className="border-green-300 text-green-700 dark:text-green-400"
                >
                  Назад
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                        page === p
                          ? 'bg-green-600 text-white'
                          : 'hover:bg-green-100 dark:hover:bg-green-900/30 text-muted-foreground'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  disabled={page >= totalPages}
                  onClick={() => handlePageChange(page + 1)}
                  className="border-green-300 text-green-700 dark:text-green-400"
                >
                  Далее
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
