import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '6')
    const categoryId = searchParams.get('categoryId')
    const tagSlug = searchParams.get('tag')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    const where: Record<string, unknown> = { published: true }

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (tagSlug) {
      where.tags = {
        some: {
          tag: { slug: tagSlug },
        },
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
      ]
    }

    const [posts, total] = await Promise.all([
      db.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: { select: { id: true, name: true, avatar: true } },
          category: { select: { id: true, name: true, slug: true } },
          tags: { include: { tag: true } },
        },
      }),
      db.post.count({ where }),
    ])

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch {
    return NextResponse.json({ error: 'Ошибка загрузки статей' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, content, excerpt, coverImage, published, authorId, categoryId, tagIds } = body

    if (!title || !slug || !authorId) {
      return NextResponse.json({ error: 'Заполните обязательные поля' }, { status: 400 })
    }

    const post = await db.post.create({
      data: {
        title,
        slug,
        content: content || '',
        excerpt,
        coverImage,
        published: published || false,
        authorId,
        categoryId,
        tags: tagIds
          ? {
              create: tagIds.map((tagId: string) => ({ tagId })),
            }
          : undefined,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Ошибка создания статьи' }, { status: 500 })
  }
}
