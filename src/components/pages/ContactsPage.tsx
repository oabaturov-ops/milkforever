'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Phone, Mail, MapPin, Clock, Send, CheckCircle, Loader2, MessageCircle, Building,
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

const contactInfo = [
  {
    icon: <Building className="h-5 w-5" />,
    label: 'Компания',
    value: 'ИП Абатуров О.Б.',
  },
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
    icon: <MessageCircle className="h-5 w-5" />,
    label: 'Telegram',
    value: '@Milk_Forever_Business',
    href: 'https://t.me/Milk_Forever_Business',
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: 'Адрес',
    value: 'ул. Декабристов, 33, г. Пермь, Пермский край, 614012',
  },
  {
    icon: <Clock className="h-5 w-5" />,
    label: 'Режим работы',
    value: 'Пн-Вс, 09:00-17:00',
  },
]

export default function ContactsPage() {
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
              Контакты
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Свяжитесь с нами
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-300 to-green-200">
              по любому вопросу
              </span>
            </h1>
            <p className="text-lg md:text-xl text-green-100/90 max-w-2xl mx-auto leading-relaxed">
              Мы всегда на связи — звоните, пишите, приезжайте.
              Консультация бесплатна.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact info + Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Наши контакты
              </h2>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4 mb-8"
              >
                {contactInfo.map((item, i) => (
                  <motion.div key={item.label} custom={i} variants={fadeInUp}>
                    <Card className="hover:shadow-md transition-all duration-300">
                      <CardContent className="flex items-start gap-4 pt-5 pb-5">
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
                              target={item.href.startsWith('http') ? '_blank' : undefined}
                              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
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

              {/* Quick action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+79026489672"
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold h-12 rounded-lg transition-colors px-6"
                >
                  <Phone className="h-5 w-5" />
                  Позвонить
                </a>
                <a
                  href="https://t.me/Milk_Forever_Business"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-green-300 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-700 dark:hover:bg-green-950 font-semibold h-12 rounded-lg transition-colors px-6"
                >
                  <MessageCircle className="h-5 w-5" />
                  Telegram
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-lg border-green-200 dark:border-green-900">
                <CardHeader>
                  <CardTitle className="text-2xl">Напишите нам</CardTitle>
                </CardHeader>
                <CardContent>
                  {sent ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Заявка отправлена!</h3>
                      <p className="text-muted-foreground mb-6">
                        Мы свяжемся с вами в ближайшее время
                      </p>
                      <Button
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-700 dark:hover:bg-green-950"
                        onClick={() => setSent(false)}
                      >
                        Отправить ещё
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="contact-name">Имя *</Label>
                        <Input
                          id="contact-name"
                          placeholder="Ваше имя"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, name: e.target.value }))
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-phone">Телефон *</Label>
                        <Input
                          id="contact-phone"
                          type="tel"
                          placeholder="+7 (___) ___-__-__"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, phone: e.target.value }))
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-message">Сообщение</Label>
                        <Textarea
                          id="contact-message"
                          placeholder="Расскажите о вашем проекте..."
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, message: e.target.value }))
                          }
                        />
                      </div>
                      {error && (
                        <p className="text-sm text-red-500">{error}</p>
                      )}
                      <Button
                        type="submit"
                        size="lg"
                        disabled={sending}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-12"
                      >
                        {sending ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Отправка...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Отправить
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden shadow-md">
              <CardContent className="p-0">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=56.247%2C58.013&z=15&pt=56.247,58.013&source=constructor&text=ул.%20Декабристов%2C%2033"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Карта — Ферма Под Ключ, г. Пермь"
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  )
}
