import { NextRequest, NextResponse } from 'next/server'
import { getPostBySlug } from '@/lib/blog-data'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) {
      return NextResponse.json({ error: 'Статья не найдена' }, { status: 404 })
    }

    return NextResponse.json({
      ...post,
      comments: [],
    })
  } catch {
    return NextResponse.json({ error: 'Ошибка загрузки статьи' }, { status: 500 })
  }
}
