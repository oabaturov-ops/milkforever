import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('postId')

    if (!postId) {
      return NextResponse.json({ error: 'Укажите postId' }, { status: 400 })
    }

    const comments = await db.comment.findMany({
      where: { postId, approved: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(comments)
  } catch {
    return NextResponse.json({ error: 'Ошибка загрузки комментариев' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, authorName, authorEmail, postId, parentId } = body

    if (!content || !authorName || !authorEmail || !postId) {
      return NextResponse.json({ error: 'Заполните обязательные поля' }, { status: 400 })
    }

    const comment = await db.comment.create({
      data: {
        content,
        authorName,
        authorEmail,
        postId,
        parentId: parentId || null,
        approved: false,
      },
    })

    return NextResponse.json(comment, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Ошибка создания комментария' }, { status: 500 })
  }
}
