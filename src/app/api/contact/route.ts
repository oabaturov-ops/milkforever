import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('[CONTACT] New submission:', body)
    return NextResponse.json({ success: true, message: 'Заявка отправлена' }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Ошибка отправки заявки' }, { status: 500 })
  }
}
