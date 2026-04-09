import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const post = await db.post.findUnique({
      where: { slug },
      include: {
        author: { select: { id: true, name: true, avatar: true, bio: true } },
        category: { select: { id: true, name: true, slug: true } },
        tags: { include: { tag: true } },
        comments: {
          where: { approved: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    if (!post) {
      return NextResponse.json({ error: 'Статья не найдена' }, { status: 404 })
    }

    // Increment views
    await db.post.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    })

    post.views += 1

    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: 'Ошибка загрузки статьи' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    await db.post.delete({ where: { slug } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Ошибка удаления статьи' }, { status: 500 })
  }
}
