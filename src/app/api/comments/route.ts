import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, authorName, authorEmail, postId } = body

    if (!content || !authorName || !authorEmail || !postId) {
      return NextResponse.json({ error: 'Заполните обязательные поля' }, { status: 400 })
    }

    console.log('Новый комментарий:', { content, authorName, authorEmail, postId })

    return NextResponse.json({ success: true, message: 'Комментарий отправлен на модерацию' }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Ошибка создания комментария' }, { status: 500 })
  }
}
