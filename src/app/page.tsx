'use client'

import React, { useState, useEffect, useCallback } from 'react'
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
  Phone, Mail, MapPin, Clock, Send, CheckCircle, Loader2,
} from 'lucide-react'

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
    icon: '🏗️',
    title: 'Проектирование',
    description: 'Проектирование молочных ферм с учётом всех норм и требований. Индивидуальный подход к каждому проекту.',
  },
  {
    icon: '🔨',
    title: 'Строительство',
    description: 'Строительство ферм под ключ под ваш проект. Полный цикл работ от фундамента до запуска.',
  },
  {
    icon: '⚙️',
    title: 'Оборудование',
    description: 'Подбор и поставка оборудования от ведущих производителей. Доильные залы, системы охлаждения, кормоприготовление.',
  },
  {
    icon: '🔧',
    title: 'Сервис',
    description: 'Сервисное обслуживание и ремонт оборудования. Оперативный выезд специалистов на объект.',
  },
  {
    icon: '💰',
    title: 'Субсидии',
    description: 'Помощь в получении государственных субсидий и грантов на строительство и модернизацию ферм.',
  },
  {
    icon: '📋',
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
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <StatsSection />
      <BlogPreviewSection />
      <CTASection />
      <ContactInfoBar />
    </>
  )
}

// ==================== HERO ====================
function HeroSection() {
  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white">
      {/* Декоративные элементы */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-green-400 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-emerald-400 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <Badge className="mb-6 bg-green-700/50 text-green-100 border-green-600/30 hover:bg-green-700/70 text-sm px-4 py-1.5">
            🌱 Строительство ферм с 2010 года
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Молочные фермы
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-300 to-green-200">
              под ключ
            </span>
          </h1>

          <p className="text-lg md:text-xl text-green-100/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Проектирование, строительство и сопровождение молочных ферм
            в Пермском крае и регионах. От идеи до полноценного производства.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-green-800 hover:bg-green-50 font-semibold text-base px-8 h-12 shadow-lg"
              onClick={() => handleScrollTo('#cta')}
            >
              Получить консультацию
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-green-300/50 text-green-100 hover:bg-green-800/50 font-semibold text-base px-8 h-12"
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
                  <span className="text-4xl mb-3 block">{service.icon}</span>
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

// ==================== ПРЕВЬЮ БЛОГА ====================
function BlogPreviewSection() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

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
          <Button variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-700 dark:hover:bg-green-950">
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
                    <Card className="group h-full hover:shadow-lg transition-all duration-300 cursor-pointer">
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
