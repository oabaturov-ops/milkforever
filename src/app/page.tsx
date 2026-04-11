'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import {
  Phone, Mail, MapPin, Clock, Send, CheckCircle, Loader2, MessageCircle, Calculator, TrendingUp, Banknote, ArrowRight, ShieldCheck, PenTool, Hammer, Settings, Wrench, Coins, ClipboardList, Home, Grid3X3,
} from 'lucide-react'
import { useNavigation } from '@/lib/navigation'
import AboutPage from '@/components/pages/AboutPage'
import ServicesPage from '@/components/pages/ServicesPage'
import ServiceEquipmentPage from '@/components/pages/ServiceEquipmentPage'
import SubsidiesPage from '@/components/pages/SubsidiesPage'
import ContactsPage from '@/components/pages/ContactsPage'
import BlogPostPage from '@/components/pages/BlogPostPage'
import BlogListPage from '@/components/pages/BlogListPage'

// ==================== ТИПЫ ====================
interface Category {
  id: string
  name: string
  slug: string
}

interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  coverImage?: string | null
  published: boolean
  views: number
  createdAt: string
  category?: { id: string; name: string; slug: string } | null
}

// ==================== ДАННЫЕ УСЛУГ ====================
const services = [
  {
    icon: <PenTool className="h-7 w-7" />,
    title: 'Проектирование',
    description: 'Проектирование молочных ферм с учётом всех норм и требований. Индивидуальный подход к каждому проекту.',
  },
  {
    icon: <Hammer className="h-7 w-7" />,
    title: 'Строительство',
    description: 'Строительство ферм под ключ под ваш проект. Полный цикл работ от фундамента до запуска.',
  },
  {
    icon: <Settings className="h-7 w-7" />,
    title: 'Оборудование',
    description: 'Подбор и поставка оборудования от ведущих производителей. Доильные залы, системы охлаждения, кормоприготовление.',
  },
  {
    icon: <Wrench className="h-7 w-7" />,
    title: 'Сервис',
    description: 'Сервисное обслуживание и ремонт оборудования. Оперативный выезд специалистов на объект.',
  },
  {
    icon: <Coins className="h-7 w-7" />,
    title: 'Субсидии',
    description: 'Помощь в получении государственных субсидий и грантов на строительство и модернизацию ферм.',
  },
  {
    icon: <ClipboardList className="h-7 w-7" />,
    title: 'Сопровождение',
    description: 'Полное сопровождение проекта на всех этапах — от идеи до запуска и выхода на полную мощность.',
  },
]

// ==================== ПРЕИМУЩЕСТВА ====================
const advantages = [
  { text: '15+ лет опыта', description: 'Работаем в отрасли с 2010 года' },
  { text: '50+ построенных ферм', description: 'Реализованных проектов по всей России' },
  { text: 'Гарантия на работы', description: 'Предоставляем гарантию до 5 лет' },
  { text: 'Помощь с финансированием', description: 'Субсидии, гранты, лизинг' },
]

// ==================== СТАТИСТИКА ====================
const stats = [
  { value: '50+', label: 'ферм построено' },
  { value: '15+', label: 'лет опыта' },
  { value: '2000+', label: 'коров размещено' },
  { value: '100%', label: 'клиентов довольны' },
]

// ==================== АНИМАЦИИ ====================
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

// ==================== ГЛАВНАЯ СТРАНИЦА ====================
function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <StatsSection />
      <CalculatorSection />
      <BlogPreviewSection />
      <CTASection />
      <ContactInfoBar />
    </>
  )
}

// ==================== ПЛАВАЮЩАЯ КНОПКА СВЯЗИ ====================
function FloatingContactButton() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000)
    return () => clearTimeout(timer)
  }, [showTooltip])

  if (!visible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Подсказка */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl px-4 py-3 shadow-lg border text-sm max-w-[220px]"
          >
            Есть вопросы? Напишите нам!
            <div className="absolute right-0 bottom-4 translate-x-1 rotate-45 w-3 h-3 bg-white dark:bg-gray-800 border-r border-b" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Кнопки */}
      <div className="flex flex-col gap-3 items-center">
        <a
          href="tel:+79026489672"
          className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Позвонить"
        >
          <Phone className="h-6 w-6" />
        </a>
        <a
          href="https://max.ru/590300963613_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 ring-4 ring-white/20"
          aria-label="Написать в Max"
        >
          <MessageCircle className="h-7 w-7" />
        </a>
      </div>
    </div>
  )
}

// ==================== ROUTER ====================
function PageRouter() {
  const { currentPage } = useNavigation()

  useEffect(() => {
    // If navigating to home, scroll to top; for calculator/blog, scroll to section
    if (currentPage === 'home') {
      window.scrollTo({ top: 0 })
    }
  }, [currentPage])

  // Calculator and Blog redirect to home and scroll to section
  useEffect(() => {
    if (currentPage === 'calculator') {
      // Small delay to allow home page to render
      setTimeout(() => {
        const el = document.getElementById('calculator')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [currentPage])

  return (
    <>
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HomePage />
          </motion.div>
        )}
        {currentPage === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AboutPage />
          </motion.div>
        )}
        {currentPage === 'services' && (
          <motion.div
            key="services"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ServicesPage />
          </motion.div>
        )}
        {currentPage === 'calculator' && (
          <motion.div
            key="calculator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HomePage />
          </motion.div>
        )}
        {currentPage === 'blog' && (
          <motion.div
            key="blog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BlogListPage />
          </motion.div>
        )}
        {currentPage === 'subsidies' && (
          <motion.div
            key="subsidies"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SubsidiesPage />
          </motion.div>
        )}
        {currentPage === 'service' && (
          <motion.div
            key="service"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ServiceEquipmentPage />
          </motion.div>
        )}
        {currentPage === 'contacts' && (
          <motion.div
            key="contacts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ContactsPage />
          </motion.div>
        )}
        {currentPage === 'post' && (
          <motion.div
            key="post"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BlogPostPage />
          </motion.div>
        )}
      </AnimatePresence>
      <FloatingContactButton />
    </>
  )
}

export default function AppPage() {
  return (
    <PageRouter />
  )
}

// ==================== HERO ====================
function HeroSection() {
  const { navigateTo } = useNavigation()

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden bg-green-900 text-white min-h-[85vh] flex items-center">
      {/* Видеофон */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/hero-video-poster.jpg"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Тёмный оверлей для читаемости текста */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-950/70 via-green-900/60 to-green-950/80" />

      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <Badge className="mb-6 bg-white/15 text-green-100 border-white/20 hover:bg-white/25 text-sm px-4 py-1.5 backdrop-blur-sm">
            Строительство ферм с 2010 года
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Молочные фермы
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-300 to-green-200">
              под ключ
            </span>
          </h1>

          <p className="text-lg md:text-xl text-green-100/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            Проектирование, строительство и сопровождение молочных ферм
            в Пермском крае и регионах. От идеи до полноценного производства.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-green-800 hover:bg-green-50 font-semibold text-base px-8 h-12 shadow-lg shadow-green-900/30"
              onClick={() => handleScrollTo('#cta')}
            >
              Получить консультацию
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/15 backdrop-blur-sm font-semibold text-base px-8 h-12"
              onClick={() => handleScrollTo('#services')}
            >
              Наши услуги
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ==================== УСЛУГИ ====================
function ServicesSection() {
  const { navigateTo } = useNavigation()

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <Badge variant="outline" className="mb-4 border-green-300 text-green-700 dark:text-green-400 dark:border-green-700">
            Услуги
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Полный спектр услуг
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Мы берём на себя все этапы — от разработки проекта до запуска фермы и постороннего обслуживания
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, i) => (
            <motion.div key={service.title} custom={i} variants={fadeInUp}>
              <Card className="group h-full hover:shadow-lg hover:border-green-200 dark:hover:border-green-800 transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="w-14 h-14 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400 mb-3">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <Button
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-700 dark:hover:bg-green-950 font-semibold"
            onClick={() => navigateTo('services')}
          >
            Подробнее об услугах →
          </Button>
        </div>
      </div>
    </section>
  )
}

// ==================== ПОЧЕМУ МЫ ====================
function WhyUsSection() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <Badge variant="outline" className="mb-4 border-green-300 text-green-700 dark:text-green-400 dark:border-green-700">
            Преимущества
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Надёжность, опыт и индивидуальный подход к каждому клиенту
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {advantages.map((item, i) => (
            <motion.div key={item.text} custom={i} variants={fadeInUp}>
              <Card className="text-center h-full hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                    <CheckCircle className="h-7 w-7 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.text}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ==================== СТАТИСТИКА ====================
function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-green-800 via-green-700 to-emerald-700 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={fadeInUp}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold mb-2">
                {stat.value}
              </div>
              <div className="text-green-100/80 text-sm md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ==================== КАЛЬКУЛЯТОР ====================
function CalculatorSection() {
  const [cows, setCows] = useState(200)
  const [housingType, setHousingType] = useState<'tied' | 'box'>('tied')

  // Формулы расчёта
  const costPerHead = housingType === 'tied' ? 180000 : 260000
  const totalCost = cows * costPerHead
  const milkYield = housingType === 'tied' ? 22 : 30
  const milkPrice = 34
  const monthlyIncome = Math.round(cows * milkYield * 30.5 * milkPrice)
  const monthlyExpense = Math.round(totalCost * 0.004)
  const monthlyProfit = monthlyIncome - monthlyExpense
  const subsidyPercent = 25
  const subsidy = Math.round(totalCost * subsidyPercent / 100)
  const netCost = totalCost - subsidy
  const paybackMonths = Math.round(netCost / monthlyProfit)

  const formatMoney = (n: number) =>
    n.toLocaleString('ru-RU')

  const tgMessage = encodeURIComponent(
    `Здравствуйте! Хочу узнать точный расчёт:\n- Коров: ${cows} голов\n- Содержание: ${housingType === 'tied' ? 'привязное' : 'боксовое'}\n- Примерная стоимость: ${formatMoney(totalCost)} руб.`
  )

  return (
    <section id="calculator" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <Badge variant="outline" className="mb-4 border-green-300 text-green-700 dark:text-green-400 dark:border-green-700">
            Калькулятор
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Рассчитайте стоимость фермы
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Покрутите ползунки и узнайте примерную стоимость, доход и срок окупаемости за 30 секунд
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="overflow-hidden shadow-lg border-green-200 dark:border-green-900">
            <CardContent className="p-0">
              {/* Настройки */}
              <div className="p-6 md:p-8 space-y-8">
                {/* Количество коров */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-base font-semibold flex items-center gap-2">
                      Количество коров
                    </Label>
                    <span className="text-2xl font-bold text-primary">{cows} голов</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={1000}
                    step={10}
                    value={cows}
                    onChange={(e) => setCows(Number(e.target.value))}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-green-200 to-green-400 dark:from-green-900 dark:to-green-700 accent-green-600"
                  />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>50</span>
                    <span>1000</span>
                  </div>
                </div>

                {/* Тип содержания */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">
                    Тип содержания
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setHousingType('tied')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                        housingType === 'tied'
                          ? 'border-green-500 bg-green-50 dark:bg-green-950/40 shadow-md'
                          : 'border-muted hover:border-green-300'
                      }`}
                    >
                      <Home className={`h-7 w-7 mx-auto mb-1 ${housingType === 'tied' ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                      <div className={`font-semibold text-sm ${housingType === 'tied' ? 'text-green-700 dark:text-green-400' : ''}`}>
                        Привязное
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        от {formatMoney(180000 * 50)} руб.
                      </div>
                    </button>
                    <button
                      onClick={() => setHousingType('box')}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                        housingType === 'box'
                          ? 'border-green-500 bg-green-50 dark:bg-green-950/40 shadow-md'
                          : 'border-muted hover:border-green-300'
                      }`}
                    >
                      <Grid3X3 className={`h-7 w-7 mx-auto mb-1 ${housingType === 'box' ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`} />
                      <div className={`font-semibold text-sm ${housingType === 'box' ? 'text-green-700 dark:text-green-400' : ''}`}>
                        Боксовое
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        от {formatMoney(260000 * 50)} руб.
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Результаты */}
              <div className="bg-gradient-to-br from-green-800 via-green-700 to-emerald-700 text-white p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <Calculator className="h-5 w-5 text-green-200" />
                  <h3 className="font-bold text-lg">Результат расчёта</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Banknote className="h-4 w-4 text-green-200" />
                      <span className="text-sm text-green-100">Стоимость</span>
                    </div>
                    <div className="text-xl font-bold">{formatMoney(totalCost)} &#8381;</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-green-200" />
                      <span className="text-sm text-green-100">Доход / мес.</span>
                    </div>
                    <div className="text-xl font-bold">{formatMoney(monthlyIncome)} &#8381;</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <ShieldCheck className="h-4 w-4 text-green-200" />
                      <span className="text-sm text-green-100">Субсидия</span>
                    </div>
                    <div className="text-xl font-bold">{formatMoney(subsidy)} &#8381;</div>
                    <div className="text-xs text-green-200 mt-0.5">{subsidyPercent}% от стоимости</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <ArrowRight className="h-4 w-4 text-green-200" />
                      <span className="text-sm text-green-100">Окупаемость</span>
                    </div>
                    <div className="text-xl font-bold">{paybackMonths} мес.</div>
                    <div className="text-xs text-green-200 mt-0.5">~{(paybackMonths / 12).toFixed(1)} лет</div>
                  </div>
                </div>

                {/* Подробности */}
                <div className="bg-white/5 rounded-lg p-4 mb-6 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-green-200">Стоимость с учётом субсидии:</span>
                    <span className="font-semibold">{formatMoney(netCost)} &#8381;</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-200">Надой на 1 корову:</span>
                    <span className="font-semibold">{milkYield} л/день</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-200">Чистая прибыль / мес.:</span>
                    <span className="font-semibold">{formatMoney(monthlyProfit)} &#8381;</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://max.ru/590300963613_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-white text-green-800 hover:bg-green-50 font-semibold h-12 rounded-lg transition-colors px-6"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Получить точный расчёт
                  </a>
                  <a
                    href="tel:+79026489672"
                    className="flex items-center justify-center gap-2 border-2 border-white/40 text-white hover:bg-white/15 font-semibold h-12 rounded-lg transition-colors px-6"
                  >
                    <Phone className="h-5 w-5" />
                    Позвонить
                  </a>
                </div>

                <p className="text-xs text-green-200/60 text-center mt-4">
                  Расчёт приблизительный. Для точной стоимости свяжитесь с нами.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

// ==================== ПРЕВЬЮ БЛОГА ====================
function BlogPreviewSection() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const { navigateTo } = useNavigation()

  useEffect(() => {
    fetch('/api/posts?limit=3')
      .then((r) => r.json())
      .then((data) => {
        setPosts(data.posts || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-14 flex-wrap gap-4"
        >
          <div>
            <Badge variant="outline" className="mb-4 border-green-300 text-green-700 dark:text-green-400 dark:border-green-700">
              Блог
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Последние статьи
            </h2>
            <p className="text-muted-foreground mt-2 text-lg">
              Полезные материалы о молочном животноводстве и фермерстве
            </p>
          </div>
          <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-700 dark:hover:bg-green-950" onClick={() => navigateTo('blog')}>
            Все статьи →
          </Button>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {loading
            ? [1, 2, 3].map((i) => (
                <Card key={i} className="h-full">
                  <Skeleton className="h-48 w-full rounded-t-lg" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))
            : posts.length === 0
              ? null
              : posts.map((post, i) => (
                  <motion.div key={post.id} custom={i} variants={fadeInUp}>
                    <Card className="group h-full hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigateTo('post', post.slug)}>
                      {post.coverImage && (
                        <div className="overflow-hidden">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <CardHeader className="flex-1">
                        {post.category && (
                          <Badge variant="secondary" className="w-fit text-xs mb-2">
                            {post.category.name}
                          </Badge>
                        )}
                        <CardTitle className="text-lg leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 mt-2">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(post.createdAt)}
                        </span>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
        </motion.div>
      </div>
    </section>
  )
}

// ==================== CTA ====================
function CTASection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!formData.name || !formData.phone) {
      setError('Пожалуйста, заполните имя и телефон')
      return
    }
    setSending(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      setSent(true)
      setFormData({ name: '', phone: '', message: '' })
    } catch {
      setError('Произошла ошибка. Попробуйте ещё раз.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section
      id="cta"
      className="py-20 relative overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-emerald-800 text-white"
    >
      {/* Декоративные элементы */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-green-400 blur-3xl" />
        <div className="absolute bottom-10 left-20 w-80 h-80 rounded-full bg-emerald-400 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Готовы начать строительство?
            </h2>
            <p className="text-green-100/80 text-lg">
              Оставьте заявку и получите бесплатную консультацию от нашего специалиста
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="pt-6">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-300" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Заявка отправлена!</h3>
                      <p className="text-green-100/80">
                        Мы свяжемся с вами в ближайшее время
                      </p>
                      <Button
                        variant="outline"
                        className="mt-6 border-white/30 text-white hover:bg-white/10"
                        onClick={() => setSent(false)}
                      >
                        Отправить ещё
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cta-name" className="text-green-100">
                            Имя *
                          </Label>
                          <Input
                            id="cta-name"
                            placeholder="Ваше имя"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData((p) => ({ ...p, name: e.target.value }))
                            }
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-green-200/50 focus:border-green-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cta-phone" className="text-green-100">
                            Телефон *
                          </Label>
                          <Input
                            id="cta-phone"
                            type="tel"
                            placeholder="+7 (___) ___-__-__"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData((p) => ({ ...p, phone: e.target.value }))
                            }
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-green-200/50 focus:border-green-300"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cta-message" className="text-green-100">
                          Сообщение
                        </Label>
                        <Textarea
                          id="cta-message"
                          placeholder="Расскажите о вашем проекте..."
                          rows={4}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, message: e.target.value }))
                          }
                          className="bg-white/10 border-white/20 text-white placeholder:text-green-200/50 focus:border-green-300"
                        />
                      </div>
                      {error && (
                        <p className="text-sm text-red-300">{error}</p>
                      )}
                      <Button
                        type="submit"
                        size="lg"
                        disabled={sending}
                        className="w-full bg-white text-green-800 hover:bg-green-50 font-semibold h-12"
                      >
                        {sending ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Отправка...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Отправить заявку
                          </>
                        )}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ==================== ИНФОРМАЦИЯ КОНТАКТОВ ====================
function ContactInfoBar() {
  const contactItems = [
    {
      icon: <Phone className="h-5 w-5" />,
      label: 'Телефон',
      value: '8-902-648-96-72',
      href: 'tel:+79026489672',
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: 'Email',
      value: 'oba12@yandex.ru',
      href: 'mailto:oba12@yandex.ru',
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: 'Адрес',
      value: 'ул. Декабристов, 33, г. Пермь',
      href: undefined,
    },
    {
      icon: <Clock className="h-5 w-5" />,
      label: 'Режим работы',
      value: 'Пн-Вс, 09:00-17:00',
      href: undefined,
    },
  ]

  return (
    <section id="contacts" className="py-16 bg-muted/30 border-t">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {contactItems.map((item, i) => (
            <motion.div key={item.label} custom={i} variants={fadeInUp}>
              <Card className="h-full hover:shadow-md transition-all duration-300">
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0 text-green-600 dark:text-green-400">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium hover:text-primary transition-colors break-all"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium">{item.value}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
