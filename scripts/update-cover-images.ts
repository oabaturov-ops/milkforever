import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  // Обновляем обложки для всех статей
  const updates: Record<string, string> = {
    'kak-pravilno-sproektirovat-molochnuyu-fermu': '/blog/farm-design.jpg',
    'oborudovanie-dlya-molochnoi-fermy-2025': '/blog/farm-equipment.jpg',
    'gosudarstvennye-subsidii-na-stroitelstvo-ferm': '/blog/farm-subsidies.jpg',
    'stroitelstvo-molochnoi-fermy-pod-klyuch-etapy': '/blog/farm-build.jpg',
    '5-oshibok-pri-stroitelstve-molochnoi-fermy': '/blog/farm-mistakes.jpg',
    'servisnoe-obsluzhivanie-doilnogo-oborudovaniya': '/blog/farm-service.jpg',
    'kak-uvelichit-nadoi-korovy-7-sposobov': '/blog/farm-tips.jpg',
    'grant-dlya-nachinayushchih-fermerov-2025': '/blog/farm-grant.jpg',
    'doilnyj-zal-preimushhestva-pered-privazhnym-doeniem': '/blog/milking-parlor.jpg',
  }

  let updated = 0
  for (const [slug, coverImage] of Object.entries(updates)) {
    const result = await db.post.updateMany({
      where: { slug },
      data: { coverImage },
    })
    if (result.count > 0) {
      updated++
      console.log(`Updated: ${slug}`)
    }
  }

  console.log(`\nUpdated ${updated} article covers.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
