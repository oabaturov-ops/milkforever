import { NextResponse } from 'next/server'
import { getAllCategories, getPostsByPage } from '@/lib/blog-data'

export async function GET() {
  try {
    const categories = getAllCategories()

    const categoriesWithCount = categories.map((cat) => {
      const { total } = getPostsByPage({ categorySlug: cat.slug, perPage: 1000 })
      return { ...cat, _count: { posts: total } }
    })

    return NextResponse.json(categoriesWithCount)
  } catch {
    return NextResponse.json({ error: 'Ошибка загрузки категорий' }, { status: 500 })
  }
}
