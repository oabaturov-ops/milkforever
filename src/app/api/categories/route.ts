import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const categories = await db.category.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { posts: { where: { published: true } } },
        },
      },
    })
    return NextResponse.json(categories)
  } catch {
    return NextResponse.json({ error: 'Ошибка загрузки категорий' }, { status: 500 })
  }
}
