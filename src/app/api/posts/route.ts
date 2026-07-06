import { NextRequest, NextResponse } from 'next/server'
import { getPostsByPage } from '@/lib/blog-data'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '6')
    const categorySlug = searchParams.get('categoryId')
    const tagSlug = searchParams.get('tag')
    const search = searchParams.get('search')

    const { posts, total, totalPages } = getPostsByPage({
      page,
      perPage: limit,
      categorySlug: categorySlug || undefined,
      tagSlug: tagSlug || undefined,
      search: search || undefined,
    })

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    })
  } catch {
    return NextResponse.json({ error: 'Ошибка загрузки статей' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  // Статический сайт — создание статей через JSON-файл
  return NextResponse.json({ error: 'Создание статей недоступно на данной версии' }, { status: 501 })
}
