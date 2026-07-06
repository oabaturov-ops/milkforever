import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, message } = body

    if (!name || !phone) {
      return NextResponse.json({ error: 'Заполните обязательные поля (имя и телефон)' }, { status: 400 })
    }

    // На статическом сайте сохраняем в лог (можно подключить email-уведомления)
    console.log('Новая заявка:', { name, phone, email, message })

    return NextResponse.json({ success: true, message: 'Заявка отправлена' }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Ошибка отправки заявки' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json([], { status: 200 })
}
