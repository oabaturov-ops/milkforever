import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, message } = body

    if (!name || !phone) {
      return NextResponse.json({ error: 'Заполните обязательные поля (имя и телефон)' }, { status: 400 })
    }

    const submission = await db.contactFormSubmission.create({
      data: {
        name,
        phone,
        email: email || null,
        message: message || null,
      },
    })

    return NextResponse.json(submission, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Ошибка отправки заявки' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const submissions = await db.contactFormSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    })
    return NextResponse.json(submissions)
  } catch {
    return NextResponse.json({ error: 'Ошибка загрузки заявок' }, { status: 500 })
  }
}
