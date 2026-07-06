import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: 'Укажите email' }, { status: 400 })
    }

    console.log('Новая подписка:', email)

    return NextResponse.json({ success: true, email }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Ошибка подписки' }, { status: 500 })
  }
}
