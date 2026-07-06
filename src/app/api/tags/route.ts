import { NextResponse } from 'next/server'

export async function GET() {
  // Теги из JSON-данных
  const { default: blogDataJson } = await import('@/data/blog-data.json')
  const allTags = new Map<string, { id: string; name: string; slug: string }>()

  for (const post of blogDataJson.posts) {
    for (const tag of post.tags) {
      if (!allTags.has(tag.id)) {
        allTags.set(tag.id, { id: tag.id, name: tag.name, slug: tag.slug })
      }
    }
  }

  return NextResponse.json(Array.from(allTags.values()))
}
