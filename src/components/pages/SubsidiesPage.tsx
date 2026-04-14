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
  ChevronDown, ChevronUp, CheckCircle, ArrowRight, Send, Phone,
  FileText, Users, Calendar, AlertTriangle, Banknote, Clock,
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
  { id: 'intro', label: 'Господдержка 2025-2026' },
  { id: 'agrostartap', label: 'Агростартап' },
  { id: 'family-farm', label: 'Семейная ферма' },
  { id: 'technics', label: 'Техника и оборудование' },
  { id: 'breeding', label: 'Племенное дело' },
  { id: 'construction', label: 'Строительство ферм' },
  { id: 'loans', label: 'Льготное кредитование' },
  { id: 'regional', label: 'Пермский край' },
  { id: 'steps', label: 'Пошаговая инструкция' },
  { id: 'documents', label: 'Документы' },
  { id: 'faq', label: 'Вопросы и ответы' },
]

const faqItems = [
  {
    question: 'Могу ли я получить несколько видов субсидий одновременно?',
    answer: 'Да, в большинстве случаев вы можете получать несколько видов субсидий одновременно, если они не дублируют одни и те же расходы. Например, грант «Агростартап» и компенсация за технику могут сочетаться. Однако нужно внимательно изучить условия каждой программы, чтобы расходы не пересекались. Один и тот же трактор не может быть оплачен из двух источников одновременно, но разные виды техники — могут.',
  },
  {
    question: 'Какие документы нужны для подачи заявки на грант «Агростартап»?',
    answer: 'Основной пакет документов включает: бизнес-план (по утверждённой форме Минсельхоза), копии учредительных документов (ЕГРИП/ЕГРЮЛ), справки из налоговой об отсутствии долгов по налогам и сборам, свидетельство о государственной регистрации ИП или КФХ, документы подтверждающие наличие собственных средств (не менее 10% от суммы гранта), выписку из ЕГРН на землю или договор аренды, паспорт гражданина РФ. Для семейной фермы дополнительно требуется копия решения о создании КФХ и состав семьи.',
  },
  {
    question: 'Сколько времени занимает рассмотрение заявки?',
    answer: 'Сроки рассмотрения зависят от конкретной программы. Грант «Агростартап» — от 1 до 3 месяцев после закрытия приёма заявок. Грант на развитие семейной фермы — 2-3 месяца. Компенсация за технику — 2-4 месяца после предоставления подтверждающих документов. Строительные субсидии могут рассматриваться до 4-6 месяцев. Рекомендуется подавать документы в первые недели приёма и тщательно проверять их полноту — это существенно ускоряет процесс.',
  },
  {
    question: 'Как увеличить шансы на получение субсидии?',
    answer: 'Ключевые факторы успеха: детально проработанный бизнес-план с реалистичными финансовыми расчётами (доходы, расходы, точка безубыточности), наличие собственных средств не менее 10-15% от стоимости проекта, опыт работы в сельском хозяйстве или профильное сельскохозяйственное образование, социально-экономическая значимость проекта для региона (создание рабочих мест, налоговые поступления), наличие собственной земли или долгосрочного договора аренды, готовность софинансировать проект из собственных или заёмных средств.',
  },
  {
    question: 'Что делать, если заявку отклонили?',
    answer: 'Если заявку отклонили, вы имеете право запросить мотивированный отказ в письменной форме. Частые причины отказа: неполный пакет документов, ошибки в бизнес-плане, наличие налоговых долгов, несоответствие статусу (например, ИП зарегистрировано менее 6 месяцев назад), повторная подача на ту же программу в текущем году. Исправьте ошибки и подайте заявку повторно в следующем конкурсном периоде. Рекомендуется проконсультироваться с профильными консультантами перед повторной подачей.',
  },
  {
    question: 'Можно ли использовать субсидию на покупку подержанного оборудования?',
    answer: 'По большинству федеральных программ (включая «Агростартап» и грант на семейную ферму) допускается закупка только нового оборудования у российских производителей или официальных дилеров. Подержанная техника не subsidируется. Однако по региональным программам компенсации за уже приобретённую технику могут допустить покупку б/у оборудования при условии, что оно не старше 3-5 лет и прошло техническую экспертизу. Уточняйте условия в местном управлении сельского хозяйства.',
  },
  {
    question: 'Нужно ли возвращать грантовые средства?',
    answer: 'Грантовые средства не нужно возвращать при условии, что вы освоили их по целевому назначению в установленные сроки и предоставили подтверждающие документы. Однако если средства использованы не по назначению, не освоены в срок, или вы прекратили сельскохозяйственную деятельность в течение 5 лет после получения гранта — средства могут быть взысканы в судебном порядке. По программе «Агростартап» обязанность вести сельхозпроизводство — не менее 5 лет.',
  },
  {
    question: 'Подходит ли субсидия для строительства молочной фермы на 100-200 голов?',
    answer: 'Да, это один из наиболее популярных сценариев. Для фермы на 100-200 голов наиболее подходят: грант «Агростартап» (до 10 млн руб., если вы начинающий фермер), грант на развитие семейной фермы (до 30 млн руб., для КФХ), льготный кредит на строительство (ставка от 1-3% годовых, срок до 15 лет), компенсация за доильное оборудование (30-40%). Комбинируя программы, можно покрыть до 40-50% стоимости проекта.',
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
              Актуально на 2025-2026 год
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Полный гайд по субсидиям
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-300 to-green-200">
                на строительство молочной фермы
              </span>
            </h1>
            <p className="text-lg md:text-xl text-green-100/90 max-w-2xl mx-auto leading-relaxed">
              Все государственные программы поддержки: гранты, льготные кредиты,
              компенсации. Как получить от 10 до 50 млн рублей на свой проект.
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
                  Навигация по гайду
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

              {/* Quick contact card */}
              <Card className="mt-4 p-4 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900/50">
                <h4 className="font-semibold text-sm mb-2">Бесплатная консультация</h4>
                <p className="text-xs text-muted-foreground mb-3">Поможем подобрать программу и подготовить документы</p>
                <a
                  href="https://t.me/MilkForeverServiceBot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#229ED9] hover:bg-[#1D8AC1] text-white text-sm font-semibold h-10 rounded-lg transition-colors"
                >
                  <Send className="h-4 w-4" />
                  Telegram
                </a>
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
                      <h2 className="text-2xl md:text-3xl font-bold">Государственная поддержка АПК 2025-2026</h2>
                    </div>
                    <p className="text-green-100/90 text-base md:text-lg leading-relaxed mb-4">
                      Государство выделяет более <span className="font-bold text-white">350 млрд рублей</span> ежегодно
                      на поддержку сельского хозяйства. Программы покрывают до 50% затрат на строительство ферм,
                      закупку оборудования и развитие производства.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                      {[
                        { value: '350+ млрд', label: 'рублей в год' },
                        { value: '15+', label: 'программ поддержки' },
                        { value: 'до 50%', label: 'компенсация затрат' },
                        { value: '1-3%', label: 'льготная ставка' },
                      ].map((stat, i) => (
                        <div key={i} className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
                          <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                          <div className="text-xs text-green-200 mt-1">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <CardContent className="p-6 md:p-8">
                    <h4 className="font-semibold mb-4">Основные направления господдержки:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'Гранты начинающим фермерам (Агростартап)',
                        'Гранты на развитие семейных ферм',
                        'Компенсация за сельхозтехнику и оборудование',
                        'Субсидии на строительство и модернизацию ферм',
                        'Племенное животноводство',
                        'Льготное кредитование (1-3% годовых)',
                        'Дотации на молоко и молочную продукцию',
                        'Региональные программы поддержки',
                        'Компенсация процентов по кредитам',
                        'Страхование сельхозпроизводства с господдержкой',
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
                        <CardDescription>Для начинающих фермеров — первая помощь от государства</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 text-base px-3 py-1">
                        до 10 млн рублей
                      </Badge>
                      <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 text-sm px-3 py-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        Приём: январь — март
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Грант «Агростартап» — основная точка входа для тех, кто хочет начать молочную ферму с нуля.
                      Программа действует с 2020 года и ежегодно помогает тысячам начинающих фермеров.
                      В 2025 году на программу выделено более 8 млрд рублей по всей России.
                    </p>

                    <div>
                      <h4 className="font-semibold mb-3">Кто может получить:</h4>
                      <ul className="space-y-2">
                        {[
                          'Гражданин РФ, зарегистрированный как ИП (в т.ч. главой КФХ) не менее 6 месяцев назад',
                          'Гражданин РФ, зарегистрированный как КФХ не менее 6 месяцев назад',
                          'Личное участие в сельскохозяйственной деятельности',
                          'Отсутствие задолженностей по налогам, сборам и иным обязательным платежам',
                          'Наличие опыта работы в сельском хозяйстве не менее 1 года или профильного образования',
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
                      <h4 className="font-semibold mb-3">На что можно потратить (целевое назначение):</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          'Приобретение земельных участков сельхозназначения',
                          'Покупка сельскохозяйственной техники (новой, отечественной)',
                          'Строительство и реконструкция производственных помещений',
                          'Закупка оборудования для ферм (доильные залы, охладители)',
                          'Покупка племенных животных',
                          'Подключение коммуникаций (электричество, вода, газ)',
                          'Закупка семян, кормов, удобрений',
                          'Лабораторное оборудование и ветеринарное оснащение',
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Banknote className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          <h5 className="font-semibold text-sm">Собственные средства</h5>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Не менее 10% от суммы гранта. Для проекта на 10 млн — нужно иметь 1 млн собственных средств.
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <h5 className="font-semibold text-sm">Рабочие места</h5>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Необходимо создать минимум 1 постоянное рабочее место на период реализации проекта.
                        </p>
                      </div>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-900/50">
                      <p className="text-sm text-amber-800 dark:text-amber-300">
                        <strong>Сроки приёма заявок:</strong> обычно с января по март каждого года.
                        Конкурс проводится через местные управления сельского хозяйства.
                        Результаты объявляются через 1-3 месяца после закрытия приёма.
                        Следите за обновлениями на сайте Минсельхоза вашего региона.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* 3. Семейная ферма */}
            <section id="family-farm">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-950/40 flex items-center justify-center">
                        <Users className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Грант на развитие семейной фермы</CardTitle>
                        <CardDescription>Для фермеров с опытом — крупное финансирование на развитие</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 text-base px-3 py-1">
                        до 30 млн рублей
                      </Badge>
                      <Badge className="bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400 text-sm px-3 py-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        Приём: март — июнь
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Грант на развитие семейной фермы — основная программа для масштабирования действующего
                      молочного производства. Идеально подходит для строительства фермы на 100-300 голов
                      с полным комплектом оборудования. В 2025 году максимальный размер гранта увеличен до 30 млн рублей.
                    </p>

                    <div>
                      <h4 className="font-semibold mb-3">Главные отличия от «Агростартапа»:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { label: 'Сумма', value: 'до 30 млн руб.' },
                          { label: 'Опыт', value: 'от 1 года работы' },
                          { label: 'Собственные средства', value: 'от 15% от суммы' },
                          { label: 'Срок освоения', value: 'до 24 месяцев' },
                          { label: 'Создание рабочих мест', value: 'не менее 2-х' },
                          { label: 'Обязательство', value: 'ведение КФХ 10 лет' },
                        ].map((item, i) => (
                          <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-muted/50 border text-sm">
                            <span className="text-muted-foreground">{item.label}</span>
                            <Badge variant="secondary" className="text-xs">{item.value}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-violet-50 dark:bg-violet-950/20 rounded-lg p-4 border border-violet-200 dark:border-violet-900/50">
                      <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                        Важно: сельхозкооперативы
                      </h5>
                      <p className="text-xs text-muted-foreground">
                        С 2024 года грanted на развитие семейной фермы также могут получать сельскохозяйственные
                        потребительские кооперативы (СПоК). Для кооперативов максимальный размер гранта — до 70 млн
                        рублей, собственные средства — не менее 40%. Это открывает возможности для объединения
                        нескольких фермеров.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* 4. Техника и оборудование */}
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
                        <CardTitle className="text-xl">Компенсация за технику и оборудование</CardTitle>
                        <CardDescription>Возврат части затрат на техническое оснащение фермы</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 text-base px-3 py-1">
                      до 50% компенсация
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Государство компенсирует часть расходов на покупку сельскохозяйственной техники и оборудования.
                      Компенсация предоставляется в виде гранта по факту покупки. Важно: технику нужно купить
                      до подачи заявления или в течение установленного срока после одобрения.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { title: 'Сельхозтехника', desc: 'Тракторы, погрузчики, автотранспорт — до 25% компенсации', amount: '25%' },
                        { title: 'Доильное оборудование', desc: 'Доильные залы, охладители, молочные танки — до 40%', amount: '40%' },
                        { title: 'Кормоприготовление', desc: 'Миксеры-кормораздатчики, корморезки — до 35%', amount: '35%' },
                        { title: 'Навесоуборочные системы', desc: 'Скреперные установки, навозные насосы — до 50%', amount: '50%' },
                        { title: 'Вентиляция и микроклимат', desc: 'Туннельная вентиляция, обогреватели, охлаждение — до 40%', amount: '40%' },
                        { title: 'Ветеринарное оборудование', desc: 'Доильные аппараты, диагностика — до 30%', amount: '30%' },
                      ].map((item, i) => (
                        <div key={i} className="p-4 rounded-lg bg-muted/50 border">
                          <div className="flex justify-between items-start mb-1">
                            <h5 className="font-semibold text-sm">{item.title}</h5>
                            <Badge variant="secondary" className="text-xs whitespace-nowrap ml-2">{item.amount}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-900/50">
                      <h5 className="font-semibold text-sm mb-2">Ключевые условия:</h5>
                      <ul className="space-y-1.5 text-xs text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          Техника должна быть произведена в России или в странах ЕАЭС (согласно единому реестру)
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          Компенсация не более 90% от фактических затрат (лимит зависит от региона)
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          Не позднее 6 месяцев с даты заключения договора купли-продажи
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* 5. Племенное дело */}
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
                        <CardTitle className="text-xl">Племенное животноводство</CardTitle>
                        <CardDescription>Поддержка разведения высокопродуктивных пород</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 text-base px-3 py-1">
                      до 15 000 ₽/гол./год
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      Для молочных ферм племенная работа — ключ к высоким надоям. Государство компенсирует
                      расходы на содержание племенных животных и покупку племенного молодняка.
                      Для фермы на 200 коров субсидия на племенное животноводство может составить до 3 млн рублей в год.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        'Субсидия на содержание племенных коров — до 15 000 руб./гол./год',
                        'Компенсация за покупку племенного скота — до 30% от стоимости',
                        'Бесплатная бонитировка и оценка продуктивности от гос. специалистов',
                        'Гранты на развитие племенных хозяйств — до 5 млн руб.',
                        'Компенсация затрат на искусственное осеменение',
                        'Субсидия на покупку семени быков-производителей отечественной селекции',
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

            {/* 6. Строительство ферм */}
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
                      <div>
                        <CardTitle className="text-xl">Строительство и модернизация ферм</CardTitle>
                        <CardDescription>Направления финансирования строительства молочных ферм</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      Строительство молочной фермы — это крупная инвестиция. Комбинируя несколько программ,
                      можно покрыть 40-60% стоимости проекта. Для фермы на 200 голов с бюджетом 40-50 млн рублей
                      реальная экономия на субсидиях составляет 15-25 млн рублей.
                    </p>
                    <h4 className="font-semibold mb-4">6 направлений финансирования строительства:</h4>
                    <div className="space-y-3 mb-6">
                      {[
                        { title: 'Грант «Агростартап» на строительство', amount: 'до 10 млн', desc: 'Для начинающих фермеров. Покрывает строительство коровника, доильного зала, кормоцеха. Идеален для первой фермы на 50-100 голов.', tag: 'Начинающим' },
                        { title: 'Грант на развитие семейной фермы', amount: 'до 30 млн', desc: 'Для действующих КФХ с опытом от 1 года. Позволяет построить полноценную ферму на 200-400 голов с полным комплектом оборудования.', tag: 'Опытным' },
                        { title: 'Льготный инвестиционный кредит', amount: 'ставка 1-3%', desc: 'Кредит на строительство до 15 лет с льготной ставкой. Сумма до 300 млн руб. Компенсация разницы между рыночной и льготной ставкой.', tag: 'Кредитование' },
                        { title: 'Компенсация процентов по кредиту', amount: 'до 100%', desc: 'Полная или частичная компенсация процентов по коммерческому кредиту на строительство фермы. Значительно снижает финансовую нагрузку.', tag: 'Компенсация' },
                        { title: 'Субсидия на модернизацию ферм', amount: 'до 40%', desc: 'Для реконструкции действующих ферм: замена оборудования, ремонт помещений, модернизация доильных залов и систем охлаждения.', tag: 'Модернизация' },
                        { title: 'Целевая субсидия на строительство', amount: 'до 25%', desc: 'Прямое возмещение части затрат на строительство новых производственных объектов. Выплачивается по факту выполнения работ.', tag: 'Строительство' },
                      ].map((item, i) => (
                        <div key={i} className="p-4 rounded-lg border bg-muted/30">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                                {i + 1}
                              </span>
                              <h5 className="font-semibold text-sm">{item.title}</h5>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Badge variant="secondary" className="text-xs whitespace-nowrap">{item.amount}</Badge>
                              {item.tag && <Badge variant="outline" className="text-xs whitespace-nowrap">{item.tag}</Badge>}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Пример расчёта */}
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-4 border border-emerald-200 dark:border-emerald-900/50">
                      <h5 className="font-semibold text-sm mb-3 flex items-center gap-2">
                        <Banknote className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        Пример: экономия на субсидиях для фермы на 200 голов
                      </h5>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Стоимость строительства (боксовое):</span>
                          <span className="font-semibold">52 000 000 ₽</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Грант «Агростартап»:</span>
                          <span className="font-semibold text-green-600">- 10 000 000 ₽</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Компенсация за оборудование (40%):</span>
                          <span className="font-semibold text-green-600">- 4 800 000 ₽</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Компенсация % по кредиту (5 лет):</span>
                          <span className="font-semibold text-green-600">- 6 200 000 ₽</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between">
                          <span className="font-semibold">Итого экономия:</span>
                          <span className="font-bold text-green-600 text-sm">21 000 000 ₽ (40%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold">Реальная стоимость:</span>
                          <span className="font-bold text-sm">31 000 000 ₽</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-4 border border-emerald-200 dark:border-emerald-900/50 mt-3">
                      <h5 className="font-semibold text-sm mb-2">Требования к конкурсам на строительство:</h5>
                      <ul className="space-y-1.5 text-xs text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                          Подробный бизнес-план с финансовой моделью на 5 лет
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                          Наличие земельного участка и разрешительной документации
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                          Собственные средства от 10-15% стоимости проекта
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                          Проектная документация, согласованная с надзорными органами
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* 7. Льготное кредитование */}
            <section id="loans">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/40 flex items-center justify-center">
                        <Banknote className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Льготное кредитование АПК</CardTitle>
                        <CardDescription>Инвестиционные и краткосрочные кредиты по сниженной ставке</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 text-base px-3 py-1">
                        от 1% годовых
                      </Badge>
                      <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400 text-sm px-3 py-1">
                        до 300 млн ₽
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 text-sm px-3 py-1">
                        до 15 лет
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Льготное кредитование — один из самых доступных инструментов господдержки.
                      Государство компенсирует банкам разницу между рыночной и льготной ставкой.
                      Программа реализуется через Россельхозбанк и другие уполномоченные банки.
                      Для молочных ферм это основной источник финансирования строительства.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg border">
                        <h5 className="font-semibold text-sm mb-2">Инвестиционный кредит</h5>
                        <div className="space-y-1.5 text-xs text-muted-foreground">
                          <p><strong>Ставка:</strong> от 1% до 3% годовых</p>
                          <p><strong>Сумма:</strong> до 300 млн руб.</p>
                          <p><strong>Срок:</strong> до 15 лет</p>
                          <p><strong>Цель:</strong> строительство, покупка техники, модернизация</p>
                          <p><strong>Отсрочка:</strong> до 5 лет</p>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg border">
                        <h5 className="font-semibold text-sm mb-2">Краткосрочный кредит</h5>
                        <div className="space-y-1.5 text-xs text-muted-foreground">
                          <p><strong>Ставка:</strong> от 3% до 5% годовых</p>
                          <p><strong>Сумма:</strong> до 100 млн руб.</p>
                          <p><strong>Срок:</strong> до 2 лет</p>
                          <p><strong>Цель:</strong> закупка кормов, ГСМ,_seed, удобрений</p>
                          <p><strong>Погашение:</strong> по окончании сезона</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-4 border border-orange-200 dark:border-orange-900/50">
                      <h5 className="font-semibold text-sm mb-2">Уполномоченные банки:</h5>
                      <ul className="space-y-1.5 text-xs text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                          Россельхозбанк — основной банк программы
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                          Сбербанк — кредитование инвестиционных проектов
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                          ВТБ, Совкомбанк, Абсолют Банк — программы льготного кредитования АПК
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* 8. Региональные программы (Пермский край) */}
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
                      <h3 className="text-xl font-bold">Региональные программы: Пермский край</h3>
                    </div>
                    <p className="text-amber-100/90 text-sm">
                      Дополнительные программы поддержки от Правительства Пермского края.
                      Сочетаются с федеральными программами.
                    </p>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900/50">
                        <CardContent className="p-4">
                          <Badge className="mb-2 bg-green-600 text-white text-xs">Грант</Badge>
                          <h4 className="font-bold text-lg mb-1">Семейная ферма</h4>
                          <p className="text-2xl font-extrabold text-green-600 dark:text-green-400 mb-2">
                            до 30 млн ₽
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Грант на развитие семейной фермы в Пермском крае. Минимум 2 члена КФХ.
                            Срок реализации проекта — до 24 месяцев.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50">
                        <CardContent className="p-4">
                          <Badge className="mb-2 bg-blue-600 text-white text-xs">Дотация</Badge>
                          <h4 className="font-bold text-lg mb-1">Дотация на молоко</h4>
                          <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">
                            до 3 ₽/кг
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Субсидия на каждый килограмм произведённого товарного молока.
                            Выплачивается ежемесячно при подтверждении объёмов.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50">
                        <CardContent className="p-4">
                          <Badge className="mb-2 bg-amber-600 text-white text-xs">Компенсация</Badge>
                          <h4 className="font-bold text-lg mb-1">Льготные лизинговые ставки</h4>
                          <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mb-2">
                            от 2%
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Областной лизинг сельхозтехники и оборудования по ставке от 2% годовых.
                            Через «Пермский лизинговый центр».
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-violet-50 dark:bg-violet-950/30 border-violet-200 dark:border-violet-900/50">
                        <CardContent className="p-4">
                          <Badge className="mb-2 bg-violet-600 text-white text-xs">Грант</Badge>
                          <h4 className="font-bold text-lg mb-1">Молодой фермер</h4>
                          <p className="text-2xl font-extrabold text-violet-600 dark:text-violet-400 mb-2">
                            до 1,5 млн ₽
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Дополнительный грант для фермеров до 35 лет. На бытовое обустройство
                            и стартовое оборудование.
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-900/50">
                      <h5 className="font-semibold text-sm mb-2">Куда обращаться в Пермском крае:</h5>
                      <ul className="space-y-1.5 text-xs text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                          Министерство агропромышленного комплекса и продовольствия Пермского края
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                          Управления сельского хозяйства муниципальных районов
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                          Отделения Россельхозбанка в Пермском крае
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                          Центр поддержки предпринимательства Пермского края (консультации)
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* 9. Пошаговая инструкция */}
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
                      <CardTitle className="text-xl">Пошаговая инструкция: как получить субсидию</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      {[
                        {
                          step: 1,
                          title: 'Определите подходящую программу',
                          desc: 'Изучите все доступные программы и выберите ту, которая лучше всего подходит под ваш проект. Для начинающих фермеров — «Агростартап», для действующих — грант на семейную ферму. Учитывайте сроки приёма заявок и требования к стажу.',
                          time: '1-2 недели',
                        },
                        {
                          step: 2,
                          title: 'Зарегистрируйтесь (если ещё не ИП/КФХ)',
                          desc: 'Регистрация ИП или КФХ через МФЦ или онлайн через Госуслуги. Убедитесь, что код ОКВЭД включает молочное животноводство (01.41). Регистрация занимает 3-5 рабочих дней.',
                          time: '1 неделя',
                        },
                        {
                          step: 3,
                          title: 'Подготовьте бизнес-план',
                          desc: 'Составьте детальный бизнес-план по форме Минсельхоза. Включите: описание проекта, расчёт затрат, финансовую модель на 5 лет, план создания рабочих мест, анализ рынка. Бизнес-план — главный документ, по которому оценивают проект.',
                          time: '2-4 недели',
                        },
                        {
                          step: 4,
                          title: 'Соберите полный пакет документов',
                          desc: 'Учредительные документы, справки из ФНС об отсутствии долгов, документы на землю, свидетельства о браке/родстве (для КФХ), выписки из банковских счетов о наличии собственных средств.',
                          time: '1-2 недели',
                        },
                        {
                          step: 5,
                          title: 'Подайте заявку',
                          desc: 'Обратитесь в местное управление сельского хозяйства или подайте заявку через портал Госуслуг/МФЦ. Убедитесь в полноте документов. Получите расписку о принятии заявления.',
                          time: '1-2 дня',
                        },
                        {
                          step: 6,
                          title: 'Пройдите конкурсный отбор',
                          desc: 'Защитите проект перед конкурсной комиссией. Будьте готовы ответить на вопросы о рентабельности, сроках окупаемости, опыте команды. Комиссия оценивает финансовую состоятельность, социальную значимость и реалистичность проекта.',
                          time: '1-3 месяца',
                        },
                        {
                          step: 7,
                          title: 'Подпишите договор и получите средства',
                          desc: 'После одобрения подпишите договор о предоставлении гранта. Средства перечисляются на специальный счёт, с которого можно оплачивать только целевые расходы. Ведите строгий учёт всех платежей.',
                          time: '2-4 недели',
                        },
                        {
                          step: 8,
                          title: 'Реализуйте проект и отчитайтесь',
                          desc: 'Освойте средства в установленный срок (обычно 12-24 месяца). После выполнения всех работ предоставьте отчёт и подтверждающие документы. При успешной отчётности — проект завершён, средства не возвращаются.',
                          time: '12-24 месяца',
                        },
                      ].map((item) => (
                        <div key={item.step} className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-green-700 dark:text-green-400">{item.step}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h4 className="font-semibold text-sm">{item.title}</h4>
                              <Badge variant="outline" className="text-xs gap-1">
                                <Clock className="h-3 w-3" />
                                {item.time}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* 10. Документы */}
            <section id="documents">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/40 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <CardTitle className="text-xl">Полный перечень документов</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-sm mb-3 text-red-700 dark:text-red-400">Обязательные документы</h4>
                        <ul className="space-y-2">
                          {[
                            'Паспорт гражданина РФ (копия)',
                            'ОГРНИП / ОГРН (выписка из ЕГРЮЛ или ЕГРИП)',
                            'Справка из ФНС об отсутствии налоговых долгов',
                            'Бизнес-план по форме Минсельхоза',
                            'Документы на земельный участок (ЕГРН или договор аренды)',
                            'Выписка из банка о наличии собственных средств',
                            'СНИЛС',
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-3 text-amber-700 dark:text-amber-400">Дополнительные документы (по программе)</h4>
                        <ul className="space-y-2">
                          {[
                            'Свидетельство о браке (для семейной фермы)',
                            'Документы на технику/оборудование (договоры, счета)',
                            'Смета на строительство',
                            'Проектная документация',
                            'Договор на выполнение работ',
                            'Лицензии и разрешения',
                            'Справка из пенсионного фонда',
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </section>

            {/* 11. FAQ */}
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
                    Мы бесплатно проконсультируем, подберём программу и поможем подготовить
                    бизнес-план и документы для подачи заявки.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="https://t.me/MilkForeverServiceBot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#229ED9] hover:bg-[#1D8AC1] text-white font-semibold h-12 rounded-lg px-8 transition-colors"
                    >
                      <Send className="h-5 w-5" />
                      Написать в Telegram
                    </a>
                    <a
                      href="tel:+79026489672"
                      className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white hover:bg-white/15 font-semibold h-12 rounded-lg transition-colors px-8"
                    >
                      <Phone className="h-5 w-5" />
                      8-902-648-96-72
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
