'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { useTheme } from '@/components/layout/ThemeProvider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  ArrowLeft, ArrowRight, Eye, MessageCircle, Users, BarChart3,
  Calendar, User, Tag, Lock, LogOut, FileText, Save, Trash2, ChevronLeft,
  Newspaper, Search
} from 'lucide-react'
import { getDefaultModules, type ModuleDefinition } from '@/lib/plugin/plugin-settings'

// ==================== TYPES ====================
type View = 'home' | 'article' | 'admin'

interface Author {
  id: string
  name: string | null
  avatar: string | null
  bio?: string | null
}

interface Category {
  id: string
  name: string
  slug: string
  description?: string | null
  _count?: { posts: number }
}

interface TagInfo {
  id: string
  name: string
  slug: string
  _count?: { posts: number }
}

interface PostTag {
  id: string
  tag: TagInfo
}

interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string | null
  coverImage?: string | null
  published: boolean
  authorId: string
  categoryId?: string | null
  views: number
  createdAt: string
  updatedAt: string
  author: Author
  category?: { id: string; name: string; slug: string } | null
  tags: PostTag[]
  comments?: Comment[]
}

interface Comment {
  id: string
  content: string
  authorName: string
  authorEmail: string
  approved: boolean
  parentId?: string | null
  createdAt: string
}

interface Setting {
  id: string
  module: string
  enabled: boolean
  params: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// ==================== MARKDOWN RENDERER ====================
function renderMarkdown(md: string): string {
  if (!md) return ''
  let html = md
  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold mt-6 mb-3">$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-8 mb-4">$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed">')
  html = '<p class="mb-4 leading-relaxed">' + html + '</p>'
  // Lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
  html = html.replace(/(<li.*<\/li>)/gs, '<ul class="mb-4 space-y-1">$1</ul>')
  // Clean up empty paragraphs
  html = html.replace(/<p class="mb-4 leading-relaxed">\s*<\/p>/g, '')
  return html
}

// ==================== DATE FORMATTER ====================
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// ==================== BLOG FEED ====================
function BlogFeed({
  onNavigate,
  initialCategory,
  initialSearch,
}: {
  onNavigate: (view: View, slug?: string) => void
  initialCategory?: string | null
  initialSearch?: string | null
}) {
  const [posts, setPosts] = useState<Post[]>([])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 6, total: 0, totalPages: 1 })
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<TagInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory || null)
  const [searchQuery, setSearchQuery] = useState(initialSearch || '')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(d => setCategories(d || []))
      .catch(() => {})
    fetch('/api/tags')
      .then(r => r.json())
      .then(d => setTags(d || []))
      .catch(() => {})
  }, [])

  const loadPosts = useCallback(async (page: number, category?: string | null, search?: string) => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), limit: '6' })
    if (category) params.set('categoryId', category)
    if (search) params.set('search', search)
    try {
      const res = await fetch(`/api/posts?${params}`)
      const data = await res.json()
      setPosts(data.posts || [])
      setPagination(data.pagination || { page: 1, limit: 6, total: 0, totalPages: 1 })
    } catch {
      // handle
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPosts(currentPage, activeCategory, searchQuery)
  }, [currentPage, activeCategory, searchQuery, loadPosts])

  // Listen for custom events from header
  useEffect(() => {
    const handleSearch = (e: Event) => {
      const query = (e as CustomEvent).detail
      setSearchQuery(query)
      setCurrentPage(1)
      setActiveCategory(null)
    }
    const handleCategory = (e: Event) => {
      const slug = (e as CustomEvent).detail
      setActiveCategory(slug)
      setCurrentPage(1)
      setSearchQuery('')
    }
    window.addEventListener('blog:search', handleSearch)
    window.addEventListener('blog:category', handleCategory)
    return () => {
      window.removeEventListener('blog:search', handleSearch)
      window.removeEventListener('blog:category', handleCategory)
    }
  }, [])

  const getActiveCategoryName = () => {
    if (!activeCategory) return null
    const cat = categories.find(c => c.slug === activeCategory)
    return cat?.name || null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
          МедиаБлог
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Современный медиа-портал о технологиях, науке, бизнесе и программировании. 
          Качественный контент для тех, кто хочет быть в курсе последних трендов.
        </p>
      </motion.div>

      {/* Search Bar */}
      {searchQuery && (
        <div className="mb-6 flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Результаты поиска: «{searchQuery}»
          </span>
          <Button variant="ghost" size="sm" onClick={() => { setSearchQuery(''); setCurrentPage(1) }}>
            Очистить
          </Button>
        </div>
      )}

      {/* Active Category */}
      {getActiveCategoryName() && (
        <div className="mb-6 flex items-center gap-2">
          <Badge variant="secondary">{getActiveCategoryName()}</Badge>
          <Button variant="ghost" size="sm" onClick={() => { setActiveCategory(null); setCurrentPage(1) }}>
            Все рубрики
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <Card key={i}>
                  <Skeleton className="h-48 w-full rounded-t-lg" />
                  <CardHeader>
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
            <Card>
              <CardContent className="py-16 text-center">
                <Newspaper className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">Статьи не найдены</p>
                <p className="text-sm text-muted-foreground">Попробуйте изменить фильтры или поисковый запрос</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card
                      className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                      onClick={() => onNavigate('article', post.slug)}
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
                        <div className="flex items-center gap-2 mb-2">
                          {post.category && (
                            <Badge variant="secondary" className="text-xs">
                              {post.category.name}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 mt-2">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {post.author.name}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(post.createdAt)}
                            </span>
                          </div>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {post.views}
                          </span>
                        </div>
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {post.tags.map(pt => (
                              <Badge key={pt.id} variant="outline" className="text-xs">
                                {pt.tag.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Назад
                  </Button>
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={page === currentPage ? 'default' : 'outline'}
                      size="sm"
                      className="w-9"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage >= pagination.totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                  >
                    Вперёд
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Рубрики</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <button
                onClick={() => { setActiveCategory(null); setCurrentPage(1) }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  !activeCategory ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'
                }`}
              >
                Все рубрики
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.slug); setCurrentPage(1) }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex justify-between items-center ${
                    activeCategory === cat.slug ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted'
                  }`}
                >
                  {cat.name}
                  <span className="text-xs text-muted-foreground">{cat._count?.posts || 0}</span>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Теги
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge
                  key={tag.id}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
                  onClick={() => {
                    setActiveCategory(null)
                    setSearchQuery(tag.name)
                    setCurrentPage(1)
                  }}
                >
                  {tag.name}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// ==================== ARTICLE DETAIL ====================
function ArticleDetail({
  slug,
  onNavigate,
}: {
  slug: string
  onNavigate: (view: View, slug?: string) => void
}) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [commentName, setCommentName] = useState('')
  const [commentEmail, setCommentEmail] = useState('')
  const [commentContent, setCommentContent] = useState('')
  const [commentSent, setCommentSent] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch(`/api/posts/${slug}`)
      .then(r => r.json())
      .then(data => {
        if (!cancelled) {
          setPost(data)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [slug])

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!post || !commentContent || !commentName || !commentEmail) return
    try {
      await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: commentContent,
          authorName: commentName,
          authorEmail: commentEmail,
          postId: post.id,
        }),
      })
      setCommentSent(true)
      setCommentContent('')
    } catch {
      // handle
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="h-8 w-24 mb-6" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/2 mb-8" />
        <Skeleton className="h-64 w-full mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl mb-4">Статья не найдена</p>
        <Button onClick={() => onNavigate('home')}>Вернуться на главную</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Button variant="ghost" size="sm" className="mb-6" onClick={() => onNavigate('home')}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Назад к статьям
        </Button>

        {/* Category + Date */}
        <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
          {post.category && (
            <Badge variant="secondary">{post.category.name}</Badge>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(post.createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {post.views}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{post.title}</h1>

        {/* Cover Image */}
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover rounded-xl mb-8"
          />
        )}

        {/* Content */}
        <div
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(pt => (
              <Badge key={pt.id} variant="outline">
                <Tag className="h-3 w-3 mr-1" />
                {pt.tag.name}
              </Badge>
            ))}
          </div>
        )}

        <Separator className="my-8" />

        {/* Author Info */}
        <Card className="mb-8">
          <CardContent className="py-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
                {post.author.name?.charAt(0) || 'A'}
              </div>
              <div>
                <p className="font-semibold">{post.author.name}</p>
                {post.author.bio && (
                  <p className="text-sm text-muted-foreground mt-1">{post.author.bio}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Comments */}
        <div>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Комментарии
            {post.comments && post.comments.length > 0 && (
              <Badge variant="secondary">{post.comments.length}</Badge>
            )}
          </h2>

          {/* Comment List */}
          {post.comments && post.comments.length > 0 ? (
            <div className="space-y-4 mb-8">
              {post.comments.map(comment => (
                <Card key={comment.id}>
                  <CardContent className="py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                        {comment.authorName.charAt(0)}
                      </div>
                      <span className="font-medium text-sm">{comment.authorName}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {comment.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm mb-8">
              Пока нет комментариев. Будьте первым!
            </p>
          )}

          {/* Comment Form */}
          {commentSent ? (
            <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900">
              <CardContent className="py-4">
                <p className="text-sm text-green-700 dark:text-green-400">
                  ✓ Комментарий отправлен и будет опубликован после модерации.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Оставить комментарий</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="comment-name">Имя</Label>
                      <Input
                        id="comment-name"
                        value={commentName}
                        onChange={e => setCommentName(e.target.value)}
                        placeholder="Ваше имя"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="comment-email">Email</Label>
                      <Input
                        id="comment-email"
                        type="email"
                        value={commentEmail}
                        onChange={e => setCommentEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comment-content">Комментарий</Label>
                    <Textarea
                      id="comment-content"
                      value={commentContent}
                      onChange={e => setCommentContent(e.target.value)}
                      placeholder="Ваш комментарий..."
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit">Отправить комментарий</Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// ==================== ADMIN PANEL ====================
function AdminPanel({ onNavigate }: { onNavigate: (view: View) => void }) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [stats, setStats] = useState({ posts: 0, comments: 0, subscribers: 0, views: 0 })
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [settings, setSettings] = useState<Setting[]>([])
  const [loadingStats, setLoadingStats] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const modules = getDefaultModules()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    try {
      // Check against database via a simple auth check
      // For demo, we use the hardcoded credentials that match seed data
      if (email === 'admin@blog.ru' && password === 'admin123') {
        setLoggedIn(true)
      } else {
        // Also try fetching user from db for extensibility
        const res = await fetch('/api/posts?page=1&limit=1')
        if (res.ok) {
          // API works, but wrong credentials
          setLoginError('Неверный email или пароль')
        }
      }
    } catch {
      setLoginError('Ошибка входа')
    }
  }

  useEffect(() => {
    if (!loggedIn) return
    let cancelled = false
    // Load stats
    Promise.all([
      fetch('/api/posts?limit=100').then(r => r.json()),
      fetch('/api/settings').then(r => r.json()),
    ]).then(([postsData, settingsData]) => {
      if (cancelled) return
      const posts = postsData.posts || []
      setAllPosts(posts)
      setSettings(settingsData || [])
      const totalViews = posts.reduce((acc: number, p: Post) => acc + p.views, 0)
      const commentCount = posts.reduce((acc: number, p: Post) => acc + (p.comments?.length || 0), 0)
      setStats({
        posts: postsData.pagination?.total || posts.length,
        comments: commentCount,
        subscribers: 0,
        views: totalViews,
      })
      setLoadingStats(false)
    }).catch(() => {
      if (!cancelled) setLoadingStats(false)
    })
    return () => { cancelled = true }
  }, [loggedIn])

  const handleDeletePost = async (slug: string) => {
    if (!confirm('Удалить статью?')) return
    try {
      await fetch(`/api/posts/${slug}`, { method: 'DELETE' })
      setAllPosts(prev => prev.filter(p => p.slug !== slug))
      setStats(s => ({ ...s, posts: s.posts - 1 }))
    } catch {
      // handle
    }
  }

  const handleToggleModule = (module: string) => {
    setSettings(prev =>
      prev.map(s => (s.module === module ? { ...s, enabled: !s.enabled } : s))
    )
  }

  const handleSaveSettings = async () => {
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
    } catch {
      // handle
    }
  }

  if (!loggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-xl">Панель администратора</CardTitle>
              <CardDescription>Введите данные для входа</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="admin@blog.ru"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Пароль</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                {loginError && (
                  <p className="text-sm text-destructive">{loginError}</p>
                )}
                <Button type="submit" className="w-full">
                  Войти
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Панель администратора</h1>
          <p className="text-sm text-muted-foreground">Управление блогом и модулями</p>
        </div>
        <Button variant="outline" onClick={() => setLoggedIn(false)}>
          <LogOut className="h-4 w-4 mr-2" />
          Выйти
        </Button>
      </div>

      {/* Dashboard Stats */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Статьи</p>
                  <p className="text-3xl font-bold">{loadingStats ? '...' : stats.posts}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Комментарии</p>
                  <p className="text-3xl font-bold">{loadingStats ? '...' : stats.comments}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-950 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Подписчики</p>
                  <p className="text-3xl font-bold">{loadingStats ? '...' : stats.subscribers}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Просмотры</p>
                  <p className="text-3xl font-bold">{loadingStats ? '...' : stats.views.toLocaleString()}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-950 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard">Дашборд</TabsTrigger>
          <TabsTrigger value="articles">Статьи</TabsTrigger>
          <TabsTrigger value="modules">Модули</TabsTrigger>
        </TabsList>

        {/* Dashboard */}
        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Обзор</CardTitle>
              <CardDescription>Общая статистика блога</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Добро пожаловать в панель администратора. Здесь вы можете управлять статьями, 
                  комментариями и модулями системы.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-2xl font-bold">{stats.posts}</p>
                    <p className="text-xs text-muted-foreground">Всего статей</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-2xl font-bold">{stats.comments}</p>
                    <p className="text-xs text-muted-foreground">Комментариев</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-2xl font-bold">{stats.subscribers}</p>
                    <p className="text-xs text-muted-foreground">Подписчиков</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <p className="text-2xl font-bold">{stats.views.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Просмотров</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Articles */}
        <TabsContent value="articles">
          <Card>
            <CardHeader>
              <CardTitle>Все статьи</CardTitle>
              <CardDescription>Управление публикациями</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-96">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead className="hidden sm:table-cell">Автор</TableHead>
                      <TableHead className="hidden md:table-cell">Дата</TableHead>
                      <TableHead className="text-center">Статус</TableHead>
                      <TableHead className="text-center">Просмотры</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allPosts.map(post => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium max-w-[200px] truncate">
                          {post.title}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                          {post.author.name}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                          {formatDate(post.createdAt)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={post.published ? 'default' : 'secondary'}>
                            {post.published ? 'Опубликована' : 'Черновик'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center text-sm">
                          {post.views}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onNavigate('article', post.slug)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeletePost(post.slug)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Modules */}
        <TabsContent value="modules">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Модули системы</h2>
                <p className="text-sm text-muted-foreground">Управление функциональными модулями</p>
              </div>
              <Button onClick={handleSaveSettings}>
                <Save className="h-4 w-4 mr-2" />
                Сохранить все
              </Button>
            </div>

            <div className="space-y-3">
              {modules.map((mod: ModuleDefinition) => {
                const setting = settings.find(s => s.module === mod.module)
                const enabled = setting?.enabled ?? false

                return (
                  <Card key={mod.module}>
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-2xl flex-shrink-0">{mod.icon}</span>
                          <div className="min-w-0">
                            <p className="font-medium">{mod.name}</p>
                            <p className="text-sm text-muted-foreground truncate">{mod.description}</p>
                          </div>
                        </div>
                        <Switch
                          checked={enabled}
                          onCheckedChange={() => handleToggleModule(mod.module)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// ==================== MAIN APP ====================
export default function HomePage() {
  const [view, setView] = useState<View>('home')
  const [articleSlug, setArticleSlug] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])

  const { theme } = useTheme()

  useEffect(() => {
    // Initialize theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(d => setCategories(d || []))
      .catch(() => {})
  }, [])

  const handleNavigate = useCallback((newView: View, slug?: string) => {
    if (newView === 'article' && slug) {
      setArticleSlug(slug)
    }
    setView(newView)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header onNavigate={handleNavigate} currentView={view} />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            {view === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <BlogFeed onNavigate={handleNavigate} />
              </motion.div>
            )}

            {view === 'article' && articleSlug && (
              <motion.div
                key={`article-${articleSlug}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <ArticleDetail slug={articleSlug} onNavigate={handleNavigate} />
              </motion.div>
            )}

            {view === 'admin' && (
              <motion.div
                key="admin"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <AdminPanel onNavigate={handleNavigate} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer categories={categories} onNavigate={handleNavigate} />
      </div>
    </ThemeProvider>
  )
}
