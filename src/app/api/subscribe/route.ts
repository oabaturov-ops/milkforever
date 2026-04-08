import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: 'Укажите email' }, { status: 400 })
    }

    const subscriber = await db.subscriber.upsert({
      where: { email },
      update: { active: true },
      create: { email },
    })

    return NextResponse.json(subscriber, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Ошибка подписки' }, { status: 500 })
  }
}
