import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  // Очистка существующих данных
  await db.comment.deleteMany()
  await db.postTag.deleteMany()
  await db.post.deleteMany()
  await db.contactFormSubmission.deleteMany()
  await db.subscriber.deleteMany()
  await db.setting.deleteMany()
  await db.tag.deleteMany()
  await db.category.deleteMany()
  await db.user.deleteMany()

  // Создание пользователей
  const admin = await db.user.create({
    data: {
      email: 'admin@ferma-pod-klyuch.ru',
      name: 'Олег',
      password: 'admin123',
      role: 'ADMIN',
      bio: 'Основатель компании «Ферма Под Ключ». Эксперт в области проектирования и строительства молочных ферм.',
    },
  })

  const author1 = await db.user.create({
    data: {
      email: 'info@ferma-pod-klyuch.ru',
      name: 'Ферма Под Ключ',
      password: 'author123',
      role: 'AUTHOR',
      bio: 'Компания «Ферма Под Ключ» — проектирование, строительство и сопровождение молочных ферм в Пермском крае и регионах.',
    },
  })

  // Создание категорий
  const design = await db.category.create({
    data: { name: 'Проектирование', slug: 'proektirovanie', description: 'Проектирование молочных ферм и животноводческих комплексов' },
  })
  const construction = await db.category.create({
    data: { name: 'Строительство', slug: 'stroitelstvo', description: 'Строительство ферм под ключ' },
  })
  const equipment = await db.category.create({
    data: { name: 'Оборудование', slug: 'oborudovanie', description: 'Подбор и обслуживание оборудования для ферм' },
  })
  const grants = await db.category.create({
    data: { name: 'Гранты и субсидии', slug: 'granty-i-subsidii', description: 'Государственная поддержка и финансирование проектов' },
  })

  // Создание тегов
  const tagDairy = await db.tag.create({ data: { name: 'Молочное животноводство', slug: 'molochnoe-zhivotnovodstvo' } })
  const tagFarms = await db.tag.create({ data: { name: 'Фермы', slug: 'fermy' } })
  const tagEquipment = await db.tag.create({ data: { name: 'Оборудование', slug: 'oborudovanie' } })
  const tagSubsidies = await db.tag.create({ data: { name: 'Субсидии', slug: 'subsidi' } })
  const tagDesign = await db.tag.create({ data: { name: 'Проектирование', slug: 'proektirovanie' } })

  // Создание статей
  const post1 = await db.post.create({
    data: {
      title: 'Как правильно спроектировать молочную ферму: ключевые принципы',
      slug: 'kak-pravilno-sproektirovat-molochnuyu-fermu',
      content: `# Как правильно спроектировать молочную ферму: ключевые принципы

Проектирование молочной фермы — это сложный многоэтапный процесс, от качества которого зависит эффективность всего будущего производства. Грамотный проект учитывает не только текущие потребности, но и перспективы развития хозяйства.

## Выбор земельного участка

Первый и один из важнейших этапов — подбор подходящего земельного участка. Необходимо учитывать удалённость от населённых пунктов, наличие подъездных путей, доступ к электричеству и воде, а также рельеф местности. Для молочной фермы на 200-500 голов потребуется участок площадью не менее 3-5 гектаров.

Особое внимание следует уделить геологическим условиям: тип грунта, уровень грунтовых вод, наличие источников водоснабжения. Эти факторы напрямую влияют на стоимость фундаментных работ и долговечность зданий.

## Зоотехнические требования

Проект должен соответствовать всем зоотехническим нормам и ветеринарным требованиям. Это включает правильную планировку зон содержания, доильного зала, ветеринарного блока, родильного отделения и изолятора. Ширина кормовых проходов, высота потолков, система вентиляции — каждый параметр рассчитывается индивидуально.

## Инженерные коммуникации

Молочная ферма требует надёжного энерго- и водоснабжения. Проект должен включать схемы электроснабжения с резервными источниками, системы водоподготовки, канализации и навозоудаления. Современные решения предполагают использование энергосберегающего оборудования и систем рекуперации тепла.`,
      excerpt: 'Подробное руководство по проектированию молочной фермы: от выбора участка до инженерных коммуникаций.',
      coverImage: 'https://picsum.photos/seed/farm-design/1200/600',
      published: true,
      authorId: author1.id,
      categoryId: design.id,
      views: 850,
      tags: {
        create: [
          { tagId: tagDesign.id },
          { tagId: tagFarms.id },
          { tagId: tagDairy.id },
        ],
      },
    },
  })

  const post2 = await db.post.create({
    data: {
      title: 'Оборудование для молочной фермы: что выбрать в 2025 году',
      slug: 'oborudovanie-dlya-molochnoi-fermy-2025',
      content: `# Оборудование для молочной фермы: что выбрать в 2025 году

Выбор оборудования — один из ключевых факторов, определяющих продуктивность молочной фермы. Современный рынок предлагает широкий ассортимент решений от отечественных и зарубежных производителей.

## Доильные залы

Сердце любой молочной фермы — доильное оборудование. На сегодняшний день наиболее популярны доильные залы типа «Ёлочка» и «Параллель». Для ферм с поголовьем до 300 коров оптимальным решением станет зал «Ёлочка 2x12» или «Ёлочка 2x16». Для более крупных хозяйств целесообразно рассмотреть карусельные доильные установки.

Ведущие производители — DeLaval, GEA, BouMatic — предлагают интеллектуальные системы управления дойкой, которые автоматически контролируют качество молока, здоровье вымени и продуктивность каждой коровы.

## Системы охлаждения и хранения молока

Быстрое охлаждение молока до температуры +4°C — обязательное требование для сохранения его качества. Танковые охладители объёмом от 2000 до 30000 литров подбираются исходя из суточного надоя. Рекомендуемые производители: Packo, Mueller, Serap.

## Кормоприготовление

Для кормления коров используютсяmix-feed'ы — смесители-раздатчики кормов. Они позволяют готовить полнорационные кормосмеси с точным соблюдением рецептуры. Выбор типа и вместимости зависит от способа содержания и поголовья.`,
      excerpt: 'Обзор современного оборудования для молочных ферм: доильные залы, системы охлаждения, кормоприготовление.',
      coverImage: 'https://picsum.photos/seed/farm-equipment/1200/600',
      published: true,
      authorId: author1.id,
      categoryId: equipment.id,
      views: 1200,
      tags: {
        create: [
          { tagId: tagEquipment.id },
          { tagId: tagDairy.id },
        ],
      },
    },
  })

  const post3 = await db.post.create({
    data: {
      title: 'Государственные субсидии на строительство ферм: полный гид',
      slug: 'gosudarstvennye-subsidii-na-stroitelstvo-ferm',
      content: `# Государственные субсидии на строительство ферм: полный гид

Строительство молочной фермы — масштабная инвестиция, и государственная поддержка может значительно снизить финансовую нагрузку. В 2025 году действует ряд программ, позволяющих получить субсидии и гранты на развитие животноводства.

## Программа «Комплексное развитие сельских территорий»

Одна из основных федеральных программ, предусматривающая грантовую поддержку на строительство и модернизацию животноводческих ферм. Гранты предоставляются на конкурсной основе, и сумма может достигать 20-30% от стоимости проекта.

Для участия необходимо подготовить бизнес-план, иметь земельный участок с необходимыми разрешениями, а также обеспечить софинансирование проекта из собственных средств в размере не менее 30%.

## Программа «Агростартап»

Для начинающих фермеров предусмотрены гранты на создание крестьянско-фермерского хозяйства (КФХ). Максимальная сумма гранта — 7 миллионов рублей. Средства можно направить на закупку оборудования, строительство помещений, приобретение животных.

## Лизинг сельскохозяйственной техники

Государственный лизинг сельскохозяйственной техники позволяет приобрести оборудование для фермы с минимальным авансовым платежом. Программа предусматривает субсидирование процентной ставки, что делает условия кредитования значительно выгоднее рыночных.`,
      excerpt: 'Подробный обзор государственных программ субсидирования строительства молочных ферм в 2025 году.',
      coverImage: 'https://picsum.photos/seed/farm-subsidies/1200/600',
      published: true,
      authorId: author1.id,
      categoryId: grants.id,
      views: 2100,
      tags: {
        create: [
          { tagId: tagSubsidies.id },
          { tagId: tagFarms.id },
        ],
      },
    },
  })

  const post4 = await db.post.create({
    data: {
      title: 'Строительство молочной фермы под ключ: этапы и сроки',
      slug: 'stroitelstvo-molochnoi-fermy-pod-klyuch-etapy',
      content: `# Строительство молочной фермы под ключ: этапы и сроки

Строительство молочной фермы под ключ — это комплексный подход, при котором подрядчик берёт на себя все этапы работ: от разработки проектной документации до пусконаладки оборудования и передачи объекта заказчику.

## Этап 1: Предпроектная подготовка (1-2 месяца)

На этом этапе проводятся инженерные изыскания, топографическая съёмка участка, геологические исследования. Подготавливается технико-экономическое обоснование и проводится согласование с надзорными органами.

## Этап 2: Проектирование (2-4 месяца)

Разработка проектной и рабочей документации, включающей архитектурные, конструктивные, технологические, инженерные решения. Проект проходит экспертизу и согласовывается в надзорных органах.

## Этап 3: Строительно-монтажные работы (6-12 месяцев)

Основной этап, включающий земляные работы, устройство фундаментов, возведение каркаса и стен, кровельные работы, монтаж инженерных систем. Параллельно ведётся монтаж технологического оборудования.

## Этап 4: Пусконаладка и ввод в эксплуатацию (1-2 месяца)

Настройка и испытание оборудования, обучение персонала, получению разрешительной документации. После успешного завершения объект передаётся заказчику с гарантией на все виды работ.`,
      excerpt: 'Подробное описание всех этапов строительства молочной фермы под ключ: от подготовки до ввода в эксплуатацию.',
      coverImage: 'https://picsum.photos/seed/farm-build/1200/600',
      published: true,
      authorId: author1.id,
      categoryId: construction.id,
      views: 950,
      tags: {
        create: [
          { tagId: tagFarms.id },
          { tagId: tagDairy.id },
          { tagId: tagDesign.id },
        ],
      },
    },
  })

  // Создание примера заявки
  await db.contactFormSubmission.create({
    data: {
      name: 'Иван С.',
      phone: '+7-900-123-45-67',
      email: 'ivan@example.com',
      message: 'Хотел бы узнать стоимость строительства фермы на 200 голов в Пермском крае.',
    },
  })

  // Настройки модулей
  const modules = [
    { module: 'seo', enabled: true, params: JSON.stringify({ autoMeta: true, autoSitemap: true, autoSchema: true, autoOg: true }) },
    { module: 'analytics', enabled: true, params: JSON.stringify({ ga4Id: '', metrikaId: '' }) },
    { module: 'auth', enabled: true, params: JSON.stringify({ registration: true, googleProvider: false, githubProvider: false }) },
    { module: 'forms', enabled: true, params: JSON.stringify({ contactForm: true, subscribeForm: true, telegramNotifications: false }) },
    { module: 'comments', enabled: true, params: JSON.stringify({ moderation: true, requireApproval: true, allowReplies: true }) },
    { module: 'i18n', enabled: true, params: JSON.stringify({ defaultLocale: 'ru', availableLocales: ['ru'] }) },
    { module: 'pwa', enabled: false, params: JSON.stringify({ pushNotifications: false, offlineMode: false }) },
    { module: 'theme', enabled: true, params: JSON.stringify({ defaultTheme: 'light', customColors: false }) },
    { module: 'security', enabled: true, params: JSON.stringify({ rateLimit: true, csrfProtection: true, xssProtection: true }) },
    { module: 'cache', enabled: true, params: JSON.stringify({ isrEnabled: true, revalidateTime: 3600 }) },
    { module: 'notifications', enabled: true, params: JSON.stringify({ emailNotifications: true, inAppNotifications: true, digestEnabled: false }) },
    { module: 'logging', enabled: true, params: JSON.stringify({ errorLogging: true, auditLog: false }) },
  ]

  for (const m of modules) {
    await db.setting.create({ data: m })
  }

  console.log('✅ Начальные данные успешно созданы!')
  console.log('  Пользователи: 2 (1 администратор, 1 автор)')
  console.log('  Категории: 4')
  console.log('  Теги: 5')
  console.log('  Статьи: 4')
  console.log('  Заявки: 1')
  console.log('  Модули: 12')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
