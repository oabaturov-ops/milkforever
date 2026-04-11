'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Droplets, Wrench, AlertTriangle, CheckCircle, Clock, DollarSign, BookOpen, MessageCircle, Phone,
} from 'lucide-react'

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

// Промывка вакуумной линии
const washConditions = [
  'Потери удоя до 15% из-за невидимой проблемы',
  'Рост бактериальной обсеменённости до 30%',
  'Снижение качества молока и класса',
  'Увеличение себестоимости продукции',
  'Риск попадания в молоко вредных бактерий',
  'Сокращение срока службы оборудования',
]

const washSolution = [
  'Профессиональная диагностика системы',
  'Промывка вакуумной линии специализированным оборудованием',
  'Устранение органических и минеральных отложений',
  'Дезинфекция всей системы доения',
  'Рекомендации по регулярному обслуживанию',
]

// Техническое обслуживание
const maintenanceSchedule = [
  {
    period: '2500 доений или 6 месяцев',
    icon: <Clock className="h-5 w-5" />,
    items: [
      'Замена пульсаторов и мембран',
      'Проверка и замена доильных стаканов',
      'Осмотр и обслуживание вакуумного насоса',
      'Замена резиновых уплотнителей',
      'Калибровка доильного оборудования',
    ],
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-950/30',
  },
  {
    period: 'Ежеквартально',
    icon: <Wrench className="h-5 w-5" />,
    items: [
      'Полная диагностика доильной установки',
      'Проверка вакуумной системы',
      'Калибровка молочных счётчиков',
      'Проверка системы охлаждения',
      'Осмотр электросистемы',
    ],
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
  },
  {
    period: 'Ежемесячно',
    icon: <CheckCircle className="h-5 w-5" />,
    items: [
      'Визуальный осмотр всех узлов',
      'Проверка герметичности соединений',
      'Очистка фильтров и систем',
      'Проверка уровня масла и смазок',
      'Тестирование автоматических систем',
    ],
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    period: 'Ежегодно',
    icon: <DollarSign className="h-5 w-5" />,
    items: [
      'Комплексное ТО всего оборудования',
      'Глубокая диагностика и замена изношенных деталей',
      'Переборка доильного зала',
      'Проверка и обновление программного обеспечения',
      'Полная перенастройка системы',
    ],
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-950/30',
  },
]

const wornPartsEffects = [
  'Снижение удоя на 10-15% за счёт неполного выдаивания',
  'Травмирование сосков вымени — маститы и воспаления',
  'Увеличение времени доения — снижение пропускной способности',
  'Повышенное потребление электроэнергии',
  'Премикробное заражение молока',
  'Преждевременный выход из строя дорогостоящего оборудования',
]

export default function ServiceEquipmentPage() {
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
              Сервис
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Сервис оборудования
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-300 to-green-200">
                для молочных ферм
              </span>
            </h1>
            <p className="text-lg md:text-xl text-green-100/90 max-w-2xl mx-auto leading-relaxed">
              Профессиональное обслуживание и ремонт доильного оборудования.
              Промывка вакуумной линии, техобслуживание, диагностика.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Промывка вакуумной линии */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Droplets className="h-6 w-6 text-green-600 dark:text-green-400" />
              <Badge variant="outline" className="border-green-300 text-green-700 dark:text-green-400 dark:border-green-700">
                Важная услуга
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Промывка вакуумной линии
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Невидимая проблема, которая стоит вам до <span className="font-bold text-red-600 dark:text-red-400">15% удоя</span> и приводит к росту
              бактериальной обсеменённости на <span className="font-bold text-red-600 dark:text-red-400">30%</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Проблема */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-red-200 dark:border-red-900">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <CardTitle className="text-xl text-red-700 dark:text-red-400">
                      Чем грозит загрязнённая линия?
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {washConditions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Решение */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full border-green-200 dark:border-green-900">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                      <Droplets className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-xl text-green-700 dark:text-green-400">
                      Наше решение
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {washSolution.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Card className="inline-block bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40 border-green-200 dark:border-green-900 p-6">
              <p className="text-base mb-4 font-medium">
                Запишитесь на промывку вакуумной линии через нашего Telegram-бота
              </p>
              <a
                href="https://t.me/Milk_Forever_Business"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold h-11 rounded-lg px-6 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                Написать в Telegram
              </a>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Техническое обслуживание */}
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
              Регулярное обслуживание
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Техническое обслуживание оборудования
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Регулярное техобслуживание — залог стабильной работы фермы и высоких удоев.
              Изношенные детали прямо влияют на здоровье коров и качество молока.
            </p>
          </motion.div>

          {/* Влияние изношенных деталей */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-red-200 dark:border-red-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                  Чем грозит несвоевременная замена деталей
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wornPartsEffects.map((effect, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-red-500 mt-1 flex-shrink-0">•</span>
                      <span className="text-sm">{effect}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* График обслуживания */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {maintenanceSchedule.map((schedule, i) => (
              <motion.div key={schedule.period} custom={i} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl ${schedule.bg} flex items-center justify-center ${schedule.color}`}>
                        {schedule.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{schedule.period}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {schedule.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <CheckCircle className={`h-4 w-4 ${schedule.color} flex-shrink-0 mt-0.5`} />
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

      {/* Economic justification */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <Badge variant="outline" className="mb-4 border-green-300 text-green-700 dark:text-green-400 dark:border-green-700">
                Экономика
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Экономическое обоснование
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-lg border-green-200 dark:border-green-900">
                <CardContent className="p-6 md:p-8 space-y-6">
                  <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4 text-green-700 dark:text-green-400">
                      Пример расчёта для фермы на 200 голов
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Средний надой до ТО:</span>
                        <span className="font-semibold">18 л/день</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Средний надой после ТО:</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">22 л/день</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Прирост удоя:</span>
                          <span className="font-bold text-green-600 dark:text-green-400">+4 л/день</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Дополнительный доход в мес.:</span>
                        <span className="font-bold text-green-600 dark:text-green-400">
                          +{(200 * 4 * 30.5 * 34).toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Стоимость ТО:</span>
                        <span className="font-semibold">от 50 000 ₽</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground text-center">
                    * Расчёт приблизительный и зависит от множества факторов.
                    Для точного расчёта свяжитесь с нами.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://t.me/Milk_Forever_Business"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold h-12 rounded-lg transition-colors"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Заказать ТО
                    </a>
                    <a
                      href="tel:+79026489672"
                      className="flex-1 flex items-center justify-center gap-2 border-2 border-green-300 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-700 dark:hover:bg-green-950 font-semibold h-12 rounded-lg transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      Позвонить
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recommended literature */}
      <section className="py-16 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
              <h2 className="text-2xl font-bold">Рекомендуемая литература</h2>
            </div>
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {[
                    '«Машинное доение коров» — Морозов Н.М.',
                    '«Оборудование для молочных ферм» — Горбатюк В.И.',
                    '«Технология молочного производства» — ГОСТ Р 54686-2011',
                    'Руководства производителей: DeLaval, GEA, Lely',
                  ].map((book, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <BookOpen className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{book}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  )
}
