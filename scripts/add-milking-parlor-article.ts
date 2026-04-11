import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  // Найти категорию "Оборудование" и автора
  const equipment = await db.category.findUnique({ where: { slug: 'oborudovanie' } })
  const author = await db.user.findFirst({ where: { role: 'AUTHOR' } })

  if (!equipment || !author) {
    console.error('Категория или автор не найдены')
    process.exit(1)
  }

  // Найти теги
  const tagEquipment = await db.tag.findUnique({ where: { slug: 'oborudovanie' } })
  const tagDairy = await db.tag.findUnique({ where: { slug: 'molochnoe-zhivotnovodstvo' } })
  const tagTips = await db.tag.findUnique({ where: { slug: 'sovety' } })

  const post = await db.post.create({
    data: {
      title: 'Доильный зал — почему фермеры отказываются от доения в стойле',
      slug: 'doilnyj-zal-preimushhestva-pered-privazhnym-doeniem',
      content: `Если вы доите коров в стойле — вы теряете деньги каждый день. Звучит жёстко, но это факт. Доильные залы стали стандартом на современных молочных фермах, и причины вполне конкретные.

## Скорость — в 3–4 раза быстрее

Один оператор в доильном зале «Ёлочка» обслуживает до 50 коров в час. При привязном доении та же цифра — 12–15 голов. Чем быстрее подоили, тем быстрее корова возвращается к кормушке и отдыху. А больше отдыха — больше молока.

## Качество молока выше

В доильном зале молоко сразу попадает в охладитель через закрытую систему. Минимум контакта с воздухом и бактериями. Соматические клетки ниже, класс молока выше, цена от переработчиков лучше на 1–3 рубля за литр.

## Здоровье коровы

Машинное доение в зале исключает переполнение вымени и травмы сосков. Стандартизированный режим и автоматический отрыв аппарата — маститов становится на 30–40% меньше. Меньше выбраковка — больше доход.

## Полный контроль

Современные залы DeLaval и GEA фиксируют надой каждой коровы, температуру, проводимость молока. Проблемные животные видны за дни до симптомов. Это ранняя диагностика, экономящая ветеринарные расходы.

## Меньше зависимость от людей

Вместо 3–4 доярок — один оператор и автоматика. Меньше текучка, меньше проблем с кадрами.

Доильный зал окупается за 2–3 года за счёт роста надоев на 15–20%, снижения выбраковки и экономии на зарплатах.`,
      excerpt: '5 причин, почему доильный зал выгоднее привязного доения: скорость, качество молока, здоровье коров, контроль и экономия на персонале.',
      coverImage: 'https://picsum.photos/seed/milking-parlor/1200/600',
      published: true,
      authorId: author.id,
      categoryId: equipment.id,
      views: 0,
      tags: {
        create: [
          ...(tagEquipment ? [{ tagId: tagEquipment.id }] : []),
          ...(tagDairy ? [{ tagId: tagDairy.id }] : []),
          ...(tagTips ? [{ tagId: tagTips.id }] : []),
        ],
      },
    },
  })

  console.log(`Статья "${post.title}" добавлена! (ID: ${post.id})`)
  console.log(`Категория: ${equipment.name}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
