import { getAllCategories, getPostsByPage } from '@/lib/blog-data'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const categories = getAllCategories().map(cat => {
      const { total } = getPostsByPage({ categorySlug: cat.slug, perPage: 999 })
      return { ...cat, _count: { posts: total } }
    })
    return NextResponse.json(categories)
  } catch {
    return NextResponse.json({ error: 'Ошибка загрузки категорий' }, { status: 500 })
  }
}
