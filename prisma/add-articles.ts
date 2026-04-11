import { PrismaClient } from '@prisma/client'
import { newArticles } from './new-articles'

const db = new PrismaClient()

async function main() {
  const author = await db.user.findFirst({ where: { role: 'AUTHOR' } })
  if (!author) {
    console.error('Author not found')
    return
  }

  // Build slug-to-id maps
  const categories = await db.category.findMany()
  const tags = await db.tag.findMany()
  const catMap = new Map(categories.map(c => [c.slug, c.id]))
  const tagMap = new Map(tags.map(t => [t.slug, t.id]))

  let created = 0
  for (const article of newArticles) {
    const catId = catMap.get(article.categorySlug)
    if (!catId) {
      console.error(`Category not found: ${article.categorySlug}`)
      continue
    }

    // Check if slug exists
    const existing = await db.post.findUnique({ where: { slug: article.slug } })
    if (existing) {
      console.log(`Skip (exists): ${article.slug}`)
      continue
    }

    const postTags = article.tagSlugs
      .map(s => tagMap.get(s))
      .filter((id): id is string => !!id)
      .map(tagId => ({ tagId }))

    await db.post.create({
      data: {
        title: article.title,
        slug: article.slug,
        content: article.content,
        excerpt: article.excerpt,
        coverImage: article.coverImage,
        published: true,
        authorId: author.id,
        categoryId: catId,
        views: article.views,
        tags: { create: postTags },
      },
    })
    created++
    console.log(`Created: ${article.title}`)
  }

  const total = await db.post.count({ where: { published: true } })
  console.log(`\n✅ Added ${created} new articles. Total published: ${total}`)
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
