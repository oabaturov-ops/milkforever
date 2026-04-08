import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const tags = await db.tag.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    })
    return NextResponse.json(tags)
  } catch {
    return NextResponse.json({ error: 'Ошибка загрузки тегов' }, { status: 500 })
  }
}
