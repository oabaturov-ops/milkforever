import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  // Clean existing data
  await db.comment.deleteMany()
  await db.postTag.deleteMany()
  await db.post.deleteMany()
  await db.subscriber.deleteMany()
  await db.setting.deleteMany()
  await db.tag.deleteMany()
  await db.category.deleteMany()
  await db.user.deleteMany()

  // Create users
  const admin = await db.user.create({
    data: {
      email: 'admin@blog.ru',
      name: 'Администратор',
      password: 'admin123',
      role: 'ADMIN',
      bio: 'Главный администратор и основатель МедиаБлог',
    },
  })

  const author1 = await db.user.create({
    data: {
      email: 'ivan@blog.ru',
      name: 'Иван Петров',
      password: 'author123',
      role: 'AUTHOR',
      bio: 'Технологический журналист с 10-летним опытом в IT-индустрии',
    },
  })

  const author2 = await db.user.create({
    data: {
      email: 'maria@blog.ru',
      name: 'Мария Сидорова',
      password: 'author123',
      role: 'AUTHOR',
      bio: 'Научный обозреватель, кандидат физико-математических наук',
    },
  })

  const author3 = await db.user.create({
    data: {
      email: 'alexey@blog.ru',
      name: 'Алексей Козлов',
      password: 'author123',
      role: 'AUTHOR',
      bio: 'Предприниматель и эксперт по стартапам',
    },
  })

  // Create categories
  const tech = await db.category.create({
    data: { name: 'Технологии', slug: 'tehnologii', description: 'Последние новости из мира технологий' },
  })
  const science = await db.category.create({
    data: { name: 'Наука', slug: 'nauka', description: 'Научные открытия и исследования' },
  })
  const business = await db.category.create({
    data: { name: 'Бизнес', slug: 'biznes', description: 'Мир бизнеса и предпринимательства' },
  })
  const culture = await db.category.create({
    data: { name: 'Культура', slug: 'kultura', description: 'Искусство, музыка, кино и литература' },
  })
  const programming = await db.category.create({
    data: { name: 'Программирование', slug: 'programmirovanie', description: 'Уроки, туториалы и тренды в разработке' },
  })

  // Create tags
  const tagAI = await db.tag.create({ data: { name: 'AI', slug: 'ai' } })
  const tagJS = await db.tag.create({ data: { name: 'JavaScript', slug: 'javascript' } })
  const tagStartups = await db.tag.create({ data: { name: 'Стартапы', slug: 'startapy' } })
  const tagScience = await db.tag.create({ data: { name: 'Наука', slug: 'nauka' } })
  const tagBusiness = await db.tag.create({ data: { name: 'Бизнес', slug: 'biznes' } })

  // Create posts
  const post1 = await db.post.create({
    data: {
      title: 'Искусственный интеллект в 2025: что нас ждёт',
      slug: 'iskusstvennyi-intellekt-2025',
      content: `# Искусственный интеллект в 2025: что нас ждёт

Искусственный интеллект продолжает развиваться невероятными темпами. В 2025 году мы ожидаем революционных изменений в том, как AI интегрируется в нашу повседневную жизнь и рабочие процессы. Крупнейшие технологические компании инвестируют миллиарды долларов в исследования и разработку новых моделей машинного обучения.

## Трансформация промышленности

Промышленный сектор переживает настоящую революцию благодаря внедрению AI. Умные фабрики уже сегодня используют компьютерное зрение для контроля качества, предиктивную аналитику для обслуживания оборудования и автономные системы для оптимизации логистических цепочек. По оценкам экспертов, к 2030 году AI сможет увеличить производительность труда на 40%.

Особенно впечатляющие результаты показывает AI в медицине. Алгоритмы машинного обучения уже превосходят врачей в диагностике определённых заболеваний по рентгеновским снимкам и МРТ-сканам. В 2025 году ожидается массовое внедрение AI-ассистентов в клиническую практику, что позволит сократить время диагностики в несколько раз и значительно повысить точность поставленных диагнозов.

## Этические вызовы

Однако бурное развитие AI поднимает серьёзные этические вопросы. Автоматизация рабочих мест, проблемы конфиденциальности данных, предвзятость алгоритмов — всё это требует внимания regulators и общества в целом. Необходимо найти баланс между технологическим прогрессом и защитой прав граждан, иначе мы рискуем создать мир, который будет работать не на благо человечества.`,
      excerpt: 'Обзор главных трендов развития искусственного интеллекта в 2025 году и его влияния на промышленность, медицину и общество.',
      coverImage: 'https://picsum.photos/seed/ai2025/1200/600',
      published: true,
      authorId: author1.id,
      categoryId: tech.id,
      views: 1250,
      tags: {
        create: [
          { tagId: tagAI.id },
        ],
      },
    },
  })

  const post2 = await db.post.create({
    data: {
      title: 'Квантовые вычисления: от теории к практике',
      slug: 'kvantovye-vychisleniya-teoriya-praktika',
      content: `# Квантовые вычисления: от теории к практике

Квантовые вычисления перестали быть чисто теоретической концепцией и всё больше проникают в реальный мир. Компании вроде IBM, Google и стартапы нового поколения создают квантовые процессоры, способные решать задачи, недоступные классическим компьютерам. В 2025 году мы наблюдаем переход от лабораторных экспериментов к первым коммерческим применениям.

## Как работают квантовые компьютеры

В отличие от классических битов, которые могут быть либо 0, либо 1, квантовые биты (кубиты) существуют в состоянии суперпозиции, представляя одновременно оба значения. Это свойство, в сочетании с квантовой запутанностью, позволяет квантовым компьютерам обрабатывать огромные объёмы данных параллельно.

Современные квантовые процессоры содержат сотни кубитов, но главная проблема — декогеренция. Кубиты крайне чувствительны к внешним воздействиям, и даже малейшая вибрация или изменение температуры может разрушить квантовое состояние. Учёные работают над методами квантовой коррекции ошибок, чтобы сделать квантовые вычисления надёжными и воспроизводимыми.

## Практические применения

Среди наиболее перспективных направлений применения квантовых вычислений — криптография, фармацевтика и оптимизация логистических маршрутов. Квантовые алгоритмы способны моделировать молекулы с беспрецедентной точностью, что открывает двери к созданию новых лекарств и материалов. Параллельно развивается квантовая криптография, которая обеспечит принципиально новый уровень защиты данных.`,
      excerpt: 'Как квантовые компьютеры переходят от теории к реальным коммерческим применениям в криптографии и фармацевтике.',
      coverImage: 'https://picsum.photos/seed/quantum/1200/600',
      published: true,
      authorId: author2.id,
      categoryId: science.id,
      views: 890,
      tags: {
        create: [
          { tagId: tagScience.id },
        ],
      },
    },
  })

  const post3 = await db.post.create({
    data: {
      title: 'Стартап-экосистема: как запустить свой бизнес в 2025',
      slug: 'startup-ekosistema-2025',
      content: `# Стартап-экосистема: как запустить свой бизнес в 2025

Стартап-экосистема продолжает эволюционировать, и 2025 год приносит новые правила игры. Инвесторы стали более требовательными к метрикам, а конкурентов на рынке — больше. Тем не менее, возможности для амбициозных предпринимателей остаются огромными, особенно в сферах AI, климат-технологий и цифрового здравоохранения.

## Стратегии привлечения инвестиций

В нынешних реалиях успешный питч-дек — это лишь начало. Инвесторы хотят видеть валидированную бизнес-модель, растущие метрики и сильную команду с релевантным опытом. По данным Crunchbase, средний раунд посевных инвестиций в 2024 году составил $3.2 млн, но конкуренция за эти средства выросла на 35% по сравнению с предыдущим годом.

Ключевую роль играют бизнес-акселераторы и incubator программы. Y Combinator, 500 Startups и российские аналоги вроде ФРИИ продолжают выпускать успешные компании. Однако эксперты советуют начинающим предпринимателям не ограничиваться одной программой — участие в нескольких акселераторах позволяет получить доступ к более широкой сети контактов и менторов.

## Главные ошибки новичков

Анализ провалившихся стартапов показывает повторяющиеся паттерны ошибок. На первом месте — попытка решить проблему, которой не существует. На втором — игнорирование обратной связи от первых пользователей. На третьем — неэффективное расходование ресурсов, особенно на ранних стадиях, когда каждый рубль на счету. Успешные фаундеры рекомендуют строить MVP за минимальные средства и тестировать гипотезы как можно раньше.`,
      excerpt: 'Практическое руководство по запуску стартапа: стратегии привлечения инвестиций, экосистема и типичные ошибки.',
      coverImage: 'https://picsum.photos/seed/startup2025/1200/600',
      published: true,
      authorId: author3.id,
      categoryId: business.id,
      views: 2100,
      tags: {
        create: [
          { tagId: tagStartups.id },
          { tagId: tagBusiness.id },
        ],
      },
    },
  })

  const post4 = await db.post.create({
    data: {
      title: 'Современный JavaScript: новые возможности и тренды',
      slug: 'sovremennyi-javascript-trendy',
      content: `# Современный JavaScript: новые возможности и тренды

JavaScript продолжает оставаться самым популярным языком программирования в мире, и экосистема вокруг него развивается стремительно. В 2025 году мы видим значительные улучшения в производительности движков, новые языковые конструкции и эволюцию фреймворков, которые меняют подход к веб-разработке.

## Новые возможности языка

Стандарт ECMAScript 2025 принёс ряд важных нововведений. Pipe-операторы значительно упрощают цепочку преобразований данных, декораторы стали стабильной фичей, а Record и Tuple позволяют работать с неизменяемыми структурами данных без дополнительных библиотек. Эти изменения делают код более читаемым и поддерживаемым.

Особое внимание стоит уделить улучшениям в работе с асинхронным кодом. Новые API для управления конкурентностью и улучшенная поддержка structured cloning упрощают работу с сложными асинхронными сценариями. Вместе с тем, WebAssembly продолжает расширять горизонты возможностей JavaScript, позволяя выполнять вычислительно интенсивные задачи на уровне нативного кода.

## Эволюция фреймворков

Экосистема фреймворков переживает интересный период. React Server Components меняют парадигму разработки фронтенд-приложений, Svelte 5 с рунами предлагает новый подход к реактивности, а Bun стремительно набирает популярность как замена Node.js для сборки и запуска приложений. Выбор инструмента становится всё важнее, и разработчикам необходимо постоянно обновлять свои знания, чтобы оставаться конкурентоспособными.`,
      excerpt: 'Обзор новых возможностей JavaScript в 2025 году: свежие стандарты ECMAScript, эволюция фреймворков и тренды разработки.',
      coverImage: 'https://picsum.photos/seed/js2025/1200/600',
      published: true,
      authorId: author1.id,
      categoryId: programming.id,
      views: 3400,
      tags: {
        create: [
          { tagId: tagJS.id },
          { tagId: tagAI.id },
        ],
      },
    },
  })

  // Create comments
  await db.comment.create({
    data: {
      content: 'Отличная статья! Очень интересно узнать о перспективах AI в медицине.',
      authorName: 'Анна Иванова',
      authorEmail: 'anna@example.com',
      postId: post1.id,
      approved: true,
    },
  })

  await db.comment.create({
    data: {
      content: 'Квантовые вычисления — это будущее. Жду с нетерпением коммерческих продуктов.',
      authorName: 'Дмитрий К.',
      authorEmail: 'dmitry@example.com',
      postId: post2.id,
      approved: true,
    },
  })

  await db.comment.create({
    data: {
      content: 'Подскажите, какой фреймворк лучше изучать в 2025 году?',
      authorName: 'Ольга Смирнова',
      authorEmail: 'olga@example.com',
      postId: post4.id,
      approved: true,
    },
  })

  // Create module settings
  const modules = [
    { module: 'seo', enabled: true, params: JSON.stringify({ autoMeta: true, autoSitemap: true, autoSchema: true, autoOg: true }) },
    { module: 'analytics', enabled: true, params: JSON.stringify({ ga4Id: '', metrikaId: '' }) },
    { module: 'auth', enabled: true, params: JSON.stringify({ registration: true, googleProvider: false, githubProvider: false }) },
    { module: 'forms', enabled: true, params: JSON.stringify({ contactForm: true, subscribeForm: true, telegramNotifications: false }) },
    { module: 'comments', enabled: true, params: JSON.stringify({ moderation: true, requireApproval: true, allowReplies: true }) },
    { module: 'i18n', enabled: true, params: JSON.stringify({ defaultLocale: 'ru', availableLocales: ['ru', 'en'] }) },
    { module: 'pwa', enabled: true, params: JSON.stringify({ pushNotifications: false, offlineMode: false }) },
    { module: 'theme', enabled: true, params: JSON.stringify({ defaultTheme: 'light', customColors: false }) },
    { module: 'security', enabled: true, params: JSON.stringify({ rateLimit: true, csrfProtection: true, xssProtection: true }) },
    { module: 'cache', enabled: true, params: JSON.stringify({ isrEnabled: true, revalidateTime: 3600 }) },
    { module: 'notifications', enabled: true, params: JSON.stringify({ emailNotifications: true, inAppNotifications: true, digestEnabled: false }) },
    { module: 'logging', enabled: true, params: JSON.stringify({ errorLogging: true, auditLog: false }) },
  ]

  for (const m of modules) {
    await db.setting.create({ data: m })
  }

  console.log('✅ Seed data created successfully!')
  console.log(`  Users: 4 (1 admin, 3 authors)`)
  console.log(`  Categories: 5`)
  console.log(`  Tags: 5`)
  console.log(`  Posts: 4`)
  console.log(`  Comments: 3`)
  console.log(`  Modules: 12`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
