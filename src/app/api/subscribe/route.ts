import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('[SUBSCRIBE] New subscriber:', body.email)
    return NextResponse.json({ success: true, message: 'Подписка оформлена' }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Ошибка подписки' }, { status: 500 })
  }
}
