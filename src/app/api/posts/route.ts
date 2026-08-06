import { NextRequest, NextResponse } from 'next/server'
import { getPostsByPage, getAllCategories } from '@/lib/blog-data'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '6')
    const categoryId = searchParams.get('categoryId')
    const tagSlug = searchParams.get('tag')
    const search = searchParams.get('search')

    let categorySlug: string | undefined
    if (categoryId && categoryId !== 'all') {
      const cat = getAllCategories().find(c => c.id === categoryId)
      categorySlug = cat?.slug
    }

    const { posts, total, totalPages } = getPostsByPage({
      page,
      perPage: limit,
      categorySlug,
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
    return NextResponse.json({ error: 'шибка загрузки статей' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ error: 'Создание статей недоступно' }, { status: 501 })
}
