import { NextResponse } from 'next/server'
import blogDataJson from '@/data/blog-data.json'

export async function GET() {
  try {
    const data = blogDataJson as { posts: { tags: { id: string; name: string; slug: string }[] }[] }
    const tagMap = new Map<string, { id: string; name: string; slug: string; _count: { posts: number } }>()

    for (const post of data.posts) {
      if (!post.published) continue
      for (const tag of post.tags) {
        const existing = tagMap.get(tag.id)
        if (existing) {
          existing._count.posts++
        } else {
          tagMap.set(tag.id, { ...tag, _count: { posts: 1 } })
        }
      }
    }

    return NextResponse.json(Array.from(tagMap.values()).sort((a, b) => a.name.localeCompare(b.name)))
  } catch {
    return NextResponse.json({ error: 'Ошибка загрузки тегов' }, { status: 500 })
  }
}
