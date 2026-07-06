'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Landmark, Rocket, Tractor, Baby, Building2, MapPin, ListChecks,
  ChevronDown, ChevronUp, CheckCircle, ArrowRight, MessageCircle, Phone,
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

// FAQ Accordion component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <Card className="overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-accent/50 transition-colors"
      >
        <span className="font-semibold text-base pr-4">{question}</span>
        {open ? (
          <ChevronUp className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-4 md:px-5 pb-4 md:pb-5 text-muted-foreground text-sm leading-relaxed">
            {answer}
          </div>
        </motion.div>
      )}
    </Card>
  )
}

// Sidebar anchor nav
const navAnchors = [
  { id: 'intro', label: 'Господдержка' },
  { id: 'agrostartap', label: 'Агростартап' },
  { id: 'technics', label: 'Техника и оборудование' },
  { id: 'breeding', label: 'Племенное дело' },
  { id: 'construction', label: 'Строительство ферм' },
  { id: 'regional', label: 'Пермский край' },
  { id: 'steps', label: 'Пошаговая инструкция' },
  { id: 'faq', label: 'Вопросы и ответы' },
]

const faqItems = [
  {
    question: 'Могу ли я получить несколько видов субсидий одновременно?',
    answer: 'Да, в большинстве случаев вы можете получать несколько видов субсидий одновременно, если они не дублируют одни и те же расходы. Например, грант «Агростартап» и компенсация за технику могут сочетаться. Однако нужно внимательно изучить условия каждого programme, чтобы расходы не пересекались.',
  },
  {
    question: 'Какие документы нужны для подачи заявки на грант «Агростартап»?',
    answer: 'Основной пакет документов включает: бизнес-план, копии учредительных документов, справки из налоговой об отсутствии долгов, свидетельство о государственной регистрации, документы подтверждающие собственные средства (не менее 10%), документы на землю или арендный договор. Точный перечень зависит от региона и может меняться.',
  },
  {
    question: 'Сколько времени занимает рассмотрение заявки?',
    answer: 'Сроки рассмотрения зависят от конкретной программы. Грант «Агростартап» рассматривается 1-2 месяца после подачи. Компенсация за технику — 2-3 месяца. Строительные субсидии могут рассматриваться до 3-4 месяцев. Рекомендуется подавать документы заранее и тщательно проверять их полноту.',
  },
  {
    question: 'Как увеличить шансы на получение субсидии?',
    answer: 'Ключевые факторы: тщательно проработанный бизнес-план с реалистичными расчётами, наличие собственных средств (минимум 10% от стоимости проекта), опыт в аграрной сфере, социально-экономическая значимость проекта для региона, готовность создать рабочие места. Также важно строго соблюдать сроки подачи и требования к документам.',
  },
]

export default function SubsidiesPage() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

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
              Господдержка
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Субсидии и гранты
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-300 to-green-200">
                на строительство ферм
              </span>
            </h1>
            <p className="text-lg md:text-xl text-green-100/90 max-w-2xl mx-auto leading-relaxed">
              Полный гид по государственным программам поддержки сельского хозяйства.
              Более 50 млрд рублей ежегодно.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-20">
              <Card className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-green-600 dark:text-green-400" />
                  Навигация
                </h3>
                <nav className="flex flex-col gap-1">
                  {navAnchors.map((anchor) => (
                    <button
                      key={anchor.id}
                      onClick={() => scrollTo(anchor.id)}
                      className="text-left text-sm py-2 px-3 rounded-lg text-muted-foreground hover:text-green-700 hover:bg-green-50 dark:hover:text-green-400 dark:hover:bg-green-950/40 transition-colors"
                    >
                      {anchor.label}
                    </button>
                  ))}
                </nav>
              </Card>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-12">

            {/* 1. Господдержка */}
            <section id="intro">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-r from-green-700 to-emerald-600 text-white p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Landmark className="h-8 w-8" />
                      <h2 className="text-2xl md:text-3xl font-bold">Господдержка АПК</h2>
                    </div>
                    <p className="text-green-100/90 text-base md:text-lg leading-relaxed">
                      Государство выделяет более <span className="font-bold text-white">50 млрд рублей</span> ежегодно
                      на поддержку сельского хозяйства. Субсидии охватывают строительство ферм, закупку оборудования,
                      племенное дело и многое другое.
                    </p>
                  </div>
                  <CardContent className="p-6 md:p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        'Гранты начинающим фермерам',
                        'Компенсация за сельхозтехнику',
                        'Субсидии на строительство',
                        'Племенное животноводство',
                        'Льготное кредитование',
                        'Региональные программы',
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* 2. Агростартап */}
            <section id="agrostartap">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center">
                        <Rocket className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Грант «Агростартап»</CardTitle>
                        <CardDescription>Для начинающих фермеров и семейных ферм</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 text-base px-3 py-1">
                      до 10 млн рублей
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">6 условий получения:</h4>
                      <ul className="space-y-2">
                        {[
                          'Регистрация в качестве ИП или КФХ не менее 6 месяцев',
                          'Наличие собственного вклада — не менее 10% от суммы гранта',
                          'Отсутствие долгов по налогам',
                          'Бизнес-план с детальным описанием проекта',
                          'Опыт в сельском хозяйстве или специальное образование',
                          'Готовность создать не менее 1 рабочего места',
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                              {i + 1}
                            </span>
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Направления расходов (6 категорий):</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          'Приобретение земли',
                          'Покупка сельхозтехники',
                          'Строительство помещений',
                          'Закупка оборудования',
                          'Покупка животных',
                          'Подключение коммуникаций',
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-900/50">
                      <p className="text-sm text-amber-800 dark:text-amber-300">
                        <strong>Сроки приёма заявок:</strong> обычно с января по март каждого года.
                        Следите за обновлениями на сайте Минсельхоза вашего региона.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* 3. Техника и оборудование */}
            <section id="technics">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center">
                        <Tractor className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Техника и оборудование</CardTitle>
                        <CardDescription>Компенсация затрат на техническое оснащение фермы</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 text-base px-3 py-1">
                      30-50% компенсация
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { title: 'Сельхозтехника', desc: 'Тракторы, комбайны, погрузчики — до 30% компенсации' },
                        { title: 'Доильное оборудование', desc: 'Доильные залы, охладители, танки — до 40% компенсации' },
                        { title: 'Кормоприготовление', desc: 'Миксеры, кормораздатчики — до 35% компенсации' },
                        { title: 'Спецоборудование', desc: 'Навозоуборочные системы, вентиляция — до 50% компенсации' },
                      ].map((item, i) => (
                        <div key={i} className="p-4 rounded-lg bg-muted/50 border">
                          <h5 className="font-semibold text-sm mb-1">{item.title}</h5>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* 4. Племенное дело */}
            <section id="breeding">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-950/40 flex items-center justify-center">
                        <Baby className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Племенное дело</CardTitle>
                        <CardDescription>Поддержка племенного животноводства</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 text-base px-3 py-1">
                      до 15 000 ₽/гол./год
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        'Субсидия на содержание племенных животных — до 15 000 руб./гол./год',
                        'Компенсация за покупку племенного скота — до 30% от стоимости',
                        'Бесплатная бонитировка и оценка продуктивности',
                        'Гранты на развитие племенных хозяйств — до 5 млн руб.',
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm p-3 rounded-lg bg-muted/50">
                          <CheckCircle className="h-4 w-4 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* 5. Строительство ферм */}
            <section id="construction">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <CardTitle className="text-xl">Строительство ферм</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-4">5 направлений финансирования:</h4>
                    <div className="space-y-4 mb-6">
                      {[
                        { title: 'Грант на развитие семейной фермы', amount: 'до 30 млн руб.', desc: 'Для семейных ферм с минимум 2 членами КФХ' },
                        { title: 'Льготный кредит на строительство', amount: 'до 3% годовых', desc: 'Ставка значительно ниже рыночной' },
                        { title: 'Компенсация процентов по кредиту', amount: 'до 100%', desc: 'Полная или частичная компенсация процентов' },
                        { title: 'Субсидия на модернизацию', amount: 'до 40%', desc: 'Для реконструкции действующих ферм' },
                        { title: 'Целевая субсидия на строительство', amount: 'до 25%', desc: 'Возмещение части затрат на строительство' },
                      ].map((item, i) => (
                        <div key={i} className="p-4 rounded-lg border bg-muted/30">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h5 className="font-semibold text-sm">{item.title}</h5>
                            <Badge variant="secondary" className="text-xs whitespace-nowrap">{item.amount}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-4 border border-emerald-200 dark:border-emerald-900/50">
                      <h5 className="font-semibold text-sm mb-2">Требования к конкурсам:</h5>
                      <ul className="space-y-1.5 text-xs text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                          Подробный бизнес-план с финансовой моделью
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                          Наличие земли и разрешительной документации
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                          Собственные средства от 15% стоимости проекта
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* 6. Региональные программы (Пермский край) */}
            <section id="regional">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="h-7 w-7" />
                      <h3 className="text-xl font-bold">Пермский край</h3>
                    </div>
                    <p className="text-amber-100/90 text-sm">
                      Дополнительные региональные программы поддержки для жителей Пермского края
                    </p>
                  </div>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900/50">
                        <CardContent className="p-4">
                          <Badge className="mb-2 bg-green-600 text-white">Грант</Badge>
                          <h4 className="font-bold text-lg mb-1">Семейная ферма</h4>
                          <p className="text-2xl font-extrabold text-green-600 dark:text-green-400 mb-2">
                            до 30 млн ₽
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Грант на развитие семейной фермы в Пермском крае. Минимум 2 члена КФХ.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50">
                        <CardContent className="p-4">
                          <Badge className="mb-2 bg-blue-600 text-white">Субсидия</Badge>
                          <h4 className="font-bold text-lg mb-1">Дотация на молоко</h4>
                          <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
                            до 3 ₽/кг
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Субсидия на каждый килограмм произведённого товарного молока.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* 7. Пошаговая инструкция */}
            <section id="steps">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                        <ListChecks className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <CardTitle className="text-xl">Пошаговая инструкция</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          step: 1,
                          title: 'Определите программу',
                          desc: 'Выберите подходящую государственную программу в зависимости от вашего проекта и статуса (ИП, КФХ, ООО).',
                        },
                        {
                          step: 2,
                          title: 'Подготовьте документы',
                          desc: 'Соберите полный пакет документов: учредительные, финансовые, бизнес-план, документы на землю.',
                        },
                        {
                          step: 3,
                          title: 'Подайте заявку',
                          desc: 'Обратитесь в местное управление сельского хозяйства или подайте заявку через портал Госуслуг.',
                        },
                        {
                          step: 4,
                          title: 'Пройдите конкурсный отбор',
                          desc: 'Защитите проект перед комиссией. Покажите реалистичность расчётов и социальную значимость.',
                        },
                        {
                          step: 5,
                          title: 'Получите финансирование',
                          desc: 'После одобрения подпишите договор и получите средства на специальный счёт.',
                        },
                        {
                          step: 6,
                          title: 'Реализуйте и отчитайтесь',
                          desc: 'Освойте средства по целевому назначению в установленные сроки и предоставьте отчётность.',
                        },
                      ].map((item) => (
                        <div key={item.step} className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-green-700 dark:text-green-400">{item.step}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* 8. FAQ */}
            <section id="faq">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  Часто задаваемые вопросы
                </h2>
                <div className="space-y-3">
                  {faqItems.map((item, i) => (
                    <FAQItem key={i} question={item.question} answer={item.answer} />
                  ))}
                </div>
              </motion.div>
            </section>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gradient-to-r from-green-700 to-emerald-600 text-white">
                <CardContent className="p-6 md:p-8 text-center">
                  <h3 className="text-xl md:text-2xl font-bold mb-3">
                    Нужна помощь с получением субсидии?
                  </h3>
                  <p className="text-green-100/80 mb-6 max-w-lg mx-auto">
                    Мы помогаем подготовить документы, составить бизнес-план и пройти конкурсный отбор.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="https://max.ru/590300963613_bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-white text-green-800 hover:bg-green-50 font-semibold h-12 rounded-lg px-8 transition-colors"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Написать в Max
                    </a>
                    <a
                      href="tel:+79026489672"
                      className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white hover:bg-white/15 font-semibold h-12 rounded-lg transition-colors px-8"
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
      </div>
    </>
  )
}
