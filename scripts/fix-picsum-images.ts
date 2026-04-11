import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  // Найти все посты с picsum обложками и обновить на локальные
  const posts = await db.post.findMany({
    where: { coverImage: { contains: 'picsum' } },
  })

  for (const post of posts) {
    await db.post.update({
      where: { id: post.id },
      data: { coverImage: '/blog/farm-design.jpg' },
    })
    console.log(`Updated: ${post.title}`)
  }

  console.log(`\nUpdated ${posts.length} posts with local images.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
