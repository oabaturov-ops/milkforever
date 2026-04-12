import { getPostsByPage } from '@/lib/blog-data'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '6')
    const categoryId = searchParams.get('categoryId')
    const tagSlug = searchParams.get('tag')
    const search = searchParams.get('search')

    const { posts, total, totalPages } = getPostsByPage({
      page,
      perPage: limit,
      categorySlug: categoryId || undefined,
      tagSlug: tagSlug || undefined,
      search: search || undefined,
    })

    return NextResponse.json({
      posts,
      pagination: { page, limit, total, totalPages },
    })
  } catch {
    return NextResponse.json({ error: 'Ошибка загрузки статей' }, { status: 500 })
  }
}
