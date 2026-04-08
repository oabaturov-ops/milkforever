import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const settings = await db.setting.findMany({
      orderBy: { module: 'asc' },
    })
    return NextResponse.json(settings)
  } catch {
    return NextResponse.json({ error: 'Ошибка загрузки настроек' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const updates = body

    if (!Array.isArray(updates)) {
      return NextResponse.json({ error: 'Ожидается массив настроек' }, { status: 400 })
    }

    const results = await Promise.all(
      updates.map(async (update: { module: string; enabled: boolean; params?: string }) => {
        const data: Record<string, unknown> = { enabled: update.enabled }
        if (update.params !== undefined) {
          data.params = update.params
        }
        return db.setting.upsert({
          where: { module: update.module },
          update: data,
          create: {
            module: update.module,
            enabled: update.enabled,
            params: update.params || '{}',
          },
        })
      })
    )

    return NextResponse.json(results)
  } catch {
    return NextResponse.json({ error: 'Ошибка обновления настроек' }, { status: 500 })
  }
}
