'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Search, Hammer, Truck, ArrowRight, ShieldCheck, FileCheck, Headphones, CheckCircle, Wrench,
} from 'lucide-react'
import { useNavigation } from '@/lib/navigation'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
  }),
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const mainServices = [
  {
    icon: <Search className="h-8 w-8" />,
    title: 'Мы найдём проектировщика',
    description: 'Подберём архитектора с реальным опытом проектирования животноводческих комплексов. Проектирование фермы — это не просто стены, это сложная технологическая система.',
    features: [
      'Поиск специалистов с опытом в молочном животноводстве',
      'Проверка портфолио и реализованных проектов',
      'Согласование технического задания',
      'Контроль качества проектной документации',
    ],
    accent: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    textColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    icon: <Hammer className="h-8 w-8" />,
    title: 'Мы найдём подрядчика',
    description: 'Найдём надёжных подрядчиков — компании с допуском СРО или опытные бригады. Осуществляем контроль качества на каждом этапе строительства.',
    features: [
      'Подбор подрядчиков с допуском СРО',
      'Проверка квалификации и опыта бригад',
      'Технический надзор за строительством',
      'Приёмка работ и контроль качества',
    ],
    accent: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-950/30',
    textColor: 'text-green-600 dark:text-green-400',
  },
  {
    icon: <Truck className="h-8 w-8" />,
    title: 'Мы найдём поставщика',
    description: 'Организуем тендер на оборудование, подготовим спецификации, согласуем логистику и монтаж. От доильных залов до систем охлаждения.',
    features: [
      'Тендерный отбор поставщиков оборудования',
      'Подготовка технических спецификаций',
      'Организация логистики и доставки',
      'Контроль монтажа и пусконаладки',
    ],
    accent: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    textColor: 'text-blue-600 dark:text-blue-400',
  },
]

const fullCycleServices = [
  {
    icon: <ShieldCheck className="h-7 w-7" />,
    title: 'Строительство под ключ',
    description: 'Полный цикл работ — от разработки проекта до запуска фермы и выхода на полную мощность. Гарантия на работы до 3 лет.',
    items: [
      'Разработка и согласование проекта',
      'Строительно-монтажные работы',
      'Поставка и монтаж оборудования',
      'Пусконаладочные работы',
      'Обучение персонала',
      'Гарантийное обслуживание — 3 года',
    ],
  },
  {
    icon: <FileCheck className="h-7 w-7" />,
    title: 'Разрешительная документация',
    description: 'Полное сопровождение в получении всех необходимых разрешений, согласований и экспертиз для строительства и запуска фермы.',
    items: [
      'Получение разрешений на строительство',
      'Согласование с надзорными органами',
      'Проходждение государственной экспертизы',
      'Ввод объекта в эксплуатацию',
    ],
  },
  {
    icon: <Headphones className="h-7 w-7" />,
    title: 'Консалтинг и управление',
    description: 'Техническое консультирование, управление проектом на всех этапах, контроль сроков и бюджета.',
    items: [
      'Техническое консультирование',
      'Управление проектом (PM)',
      'Контроль сроков и бюджета',
      'Взаимодействие с подрядчиками',
      'Отчётность и документооборот',
    ],
  },
]

export default function ServicesPage() {
  const { navigateTo } = useNavigation()

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-emerald-800 text-white py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-green-400 blur-3xl" />
          <div className="absolute bottom-10 left-20 w-80 h-80 rounded-full bg-emerald-400 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="mb-6 bg-white/15 text-green-100 border-white/20 hover:bg-white/25 text-sm px-4 py-1.5 backdrop-blur-sm">
              Услуги
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Полный спектр услуг
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-300 to-green-200">
                для вашего проекта
              </span>
            </h1>
            <p className="text-lg md:text-xl text-green-100/90 max-w-2xl mx-auto leading-relaxed">
              От поиска проектировщика до запуска фермы. Мы берём на себя
              все этапы и гарантируем результат.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3 Main Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <Badge variant="outline" className="mb-4 border-green-300 text-green-700 dark:text-green-400 dark:border-green-700">
              Наши решения
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Три ключевых направления
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Мы решаем главные проблемы при строительстве фермы — находим лучших специалистов
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {mainServices.map((service, i) => (
              <motion.div key={service.title} custom={i} variants={fadeInUp}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-200 dark:hover:border-green-800">
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-2xl ${service.bgColor} flex items-center justify-center mb-4 ${service.textColor}`}>
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {service.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <CheckCircle className={`h-4 w-4 ${service.textColor} flex-shrink-0 mt-0.5`} />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Full Cycle Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <Badge variant="outline" className="mb-4 border-green-300 text-green-700 dark:text-green-400 dark:border-green-700">
              Полный цикл
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Комплексное сопровождение
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Для тех, кто хочет делегировать всё — от идеи до работающей фермы
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {fullCycleServices.map((service, i) => (
              <motion.div key={service.title} custom={i} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400 mb-3">
                      {service.icon}
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-green-800 via-green-700 to-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Нужна помощь со строительством фермы?
            </h2>
            <p className="text-green-100/80 text-lg mb-8">
              Расскажите о вашем проекте — мы подберём оптимальное решение
              и рассчитаем стоимость.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://max.ru/590300963613_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-800 hover:bg-green-50 font-semibold h-12 rounded-lg px-8 transition-colors"
              >
                <Wrench className="h-5 w-5" />
                Получить консультацию
              </a>
              <Button
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:bg-white/15 font-semibold h-12 px-8"
                onClick={() => navigateTo('service')}
              >
                Сервис оборудования
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
