import blogDataJson from '@/data/blog-data.json'

export interface PostTag {
  id: string
  name: string
  slug: string
}

export interface PostCategory {
  id: string
  name: string
  slug: string
}

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  coverImage: string
  published: boolean
  createdAt: string
  updatedAt: string
  views: number
  category: PostCategory
  tags: PostTag[]
  author: { name: string }
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface BlogData {
  posts: Post[]
  categories: Category[]
}

const data: BlogData = blogDataJson as BlogData

export function getAllCategories(): Category[] {
  return data.categories
}

export function getPostsByPage(options: {
  page?: number
  perPage?: number
  categorySlug?: string
  tagSlug?: string
  search?: string
}): { posts: Post[]; total: number; totalPages: number } {
  const { page = 1, perPage = 6, categorySlug, tagSlug, search } = options

  let filtered = data.posts.filter((p) => p.published)

  if (categorySlug) {
    filtered = filtered.filter((p) => p.category.slug === categorySlug)
  }

  if (tagSlug) {
    filtered = filtered.filter((p) => p.tags.some((t) => t.slug === tagSlug))
  }

  if (search) {
    const q = search.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q)
    )
  }

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const start = (page - 1) * perPage
  const posts = filtered.slice(start, start + perPage)

  return { posts, total, totalPages }
}

export function getPostBySlug(slug: string): Post | undefined {
  return data.posts.find((p) => p.slug === slug && p.published)
}

export function getRecentPosts(count: number = 3): Post[] {
  return data.posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, count)
}

export function getPopularPosts(count: number = 3): Post[] {
  return data.posts
    .filter((p) => p.published)
    .sort((a, b) => b.views - a.views)
    .slice(0, count)
}

export function getRelatedPosts(postSlug: string, count: number = 3): Post[] {
  const post = getPostBySlug(postSlug)
  if (!post) return []

  return data.posts
    .filter(
      (p) => p.published && p.slug !== postSlug && p.category.id === post.category.id
    )
    .slice(0, count)
}
