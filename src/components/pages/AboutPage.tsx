'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  User, Award, Target, CheckCircle, ArrowRight, Building2, ClipboardList, Users, Wrench,
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

const keyFacts = [
  { icon: <Award className="h-6 w-6" />, value: '30+', label: 'лет в строительстве' },
  { icon: <Users className="h-6 w-6" />, value: '10+', label: 'лет в животноводстве' },
  { icon: <Building2 className="h-6 w-6" />, value: '50+', label: 'реализованных проектов' },
  { icon: <ClipboardList className="h-6 w-6" />, value: '100%', label: 'проектов под контролем' },
]

const missionPoints = [
  'Полный цикл управления проектом — от идеи до запуска',
  'Индивидуальный подход к каждой ферме и клиенту',
  'Контроль качества на каждом этапе строительства',
  'Сопровождение после сдачи объекта',
  'Помощь в получении субсидий и финансирования',
]

export default function AboutPage() {
  const { navigateTo } = useNavigation()

  return (
    <>
      {/* Hero Section */}
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
              О компании
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Строим фермы
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-300 to-green-200">
                с умом и опытом
              </span>
            </h1>
            <p className="text-lg md:text-xl text-green-100/90 max-w-2xl mx-auto leading-relaxed">
              Более 30 лет в строительстве, 10+ лет в молочном животноводстве.
              Мы знаем, как построить ферму, которая работает и приносит прибыль.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Director Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="mb-4 border-green-300 text-green-700 dark:text-green-400 dark:border-green-700">
                Руководитель
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Абатуров Олег Борисович
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Руководитель компании «Ферма Под Ключ» — человек, который совмещает глубокий
                  строительный опыт с практическими знаниями в молочном животноводстве.
                </p>
                <p>
                  <span className="font-semibold text-foreground">30+ лет в строительстве</span> —
                  от фундамента до крыши, знает все тонкости возведения зданий и сооружений
                  любого уровня сложности.
                </p>
                <p>
                  <span className="font-semibold text-foreground">10+ лет в животноводстве</span> —
                  практический опыт работы с молочными фермами, понимание технологических процессов,
                  требований к содержанию животных и оборудования.
                </p>
                <p>
                  <span className="font-semibold text-foreground">Работа с ИИ в различных областях</span> —
                  использует современные технологии для оптимизации проектирования, расчётов и управления
                  проектами. Применение искусственного интеллекта позволяет повысить точность и
                  эффективность на каждом этапе.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="shadow-xl border-green-200 dark:border-green-900">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                      <User className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">ИП Абатуров О.Б.</h3>
                      <p className="text-sm text-muted-foreground">Генеральный директор</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { icon: <Building2 className="h-5 w-5" />, text: '30+ лет в строительной отрасли' },
                      { icon: <Wrench className="h-5 w-5" />, text: '10+ лет опыта в животноводстве' },
                      { icon: <Target className="h-5 w-5" />, text: 'Применение ИИ для оптимизации проектов' },
                      { icon: <ClipboardList className="h-5 w-5" />, text: '50+ успешно реализованных проектов' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-950/40 flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0">
                          {item.icon}
                        </div>
                        <span className="text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
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
              Миссия
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Наша миссия
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Управление проектом полного цикла — от первой идеи до стабильной работы фермы
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            {missionPoints.map((point, i) => (
              <motion.div key={i} custom={i} variants={fadeInUp}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-base leading-relaxed">{point}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="py-16 bg-gradient-to-r from-green-800 via-green-700 to-emerald-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {keyFacts.map((fact, i) => (
              <motion.div
                key={fact.label}
                custom={i}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center text-green-200">
                  {fact.icon}
                </div>
                <div className="text-3xl md:text-4xl font-extrabold mb-1">
                  {fact.value}
                </div>
                <div className="text-green-100/80 text-sm md:text-base">
                  {fact.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Готовы обсудить ваш проект?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Получите бесплатную консультацию от специалиста с 30-летним опытом
              в строительстве и 10-летним опытом в животноводстве.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://max.ru/590300963613_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold h-12 rounded-lg px-8 transition-colors"
              >
                Написать в Max
                <ArrowRight className="h-4 w-4" />
              </a>
              <Button
                variant="outline"
                size="lg"
                className="border-green-300 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-700 dark:hover:bg-green-950 font-semibold h-12 px-8"
                onClick={() => navigateTo('contacts')}
              >
                Контакты
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
