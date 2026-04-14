'use client'

import React from 'react'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useNavigation } from '@/lib/navigation'

export default function Footer() {
  const [email, setEmail] = React.useState('')
  const [subscribed, setSubscribed] = React.useState(false)
  const { navigateTo, currentPage } = useNavigation()

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setSubscribed(true)
      setEmail('')
    } catch {
      // обработка ошибки
    }
  }

  const navItems = [
    { label: 'Главная', page: 'home' },
    { label: 'О компании', page: 'about' },
    { label: 'Услуги', page: 'services' },
    { label: 'Субсидии', page: 'subsidies' },
    { label: 'Сервис', page: 'service' },
    { label: 'Контакты', page: 'contacts' },
  ]

  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* О компании */}
          <div className="space-y-4">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <span className="text-2xl">🐄</span>
              <span className="text-lg font-bold bg-gradient-to-r from-green-700 via-green-500 to-emerald-500 bg-clip-text text-transparent">
                Ферма Под Ключ
              </span>
            </button>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Профессиональное проектирование, строительство и сопровождение молочных ферм
              в Пермском крае и регионах. Более 15 лет успешного опыта.
            </p>
          </div>

          {/* Навигация */}
          <div className="space-y-4">
            <h3 className="font-semibold">Навигация</h3>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => navigateTo(item.page)}
                  className={`text-sm text-left transition-colors ${
                    currentPage === item.page
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Контакты */}
          <div className="space-y-4">
            <h3 className="font-semibold">Контакты</h3>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+79026489672"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                8-902-648-96-72
              </a>
              <a
                href="mailto:oba12@yandex.ru"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                oba12@yandex.ru
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                ул. Декабристов, 33, г. Пермь
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 flex-shrink-0" />
                Пн-Вс, 09:00-17:00
              </div>
            </div>
          </div>

          {/* Социальные сети и подписка */}
          <div className="space-y-4">
            <h3 className="font-semibold">Связаться с нами</h3>
            <a
              href="https://t.me/MilkForeverServiceBot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#229ED9] hover:underline font-medium"
            >
              <Send className="h-4 w-4" />
              @MilkForeverServiceBot
            </a>
            <a
              href="https://max.ru/590300963613_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
            >
              <MessageCircle className="h-4 w-4" />
              Max
            </a>

            <h3 className="font-semibold pt-2">Подписка на новости</h3>
            <p className="text-sm text-muted-foreground">
              Получайте актуальные новости и статьи о молочном животноводстве.
            </p>
            {subscribed ? (
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                ✓ Спасибо за подписку!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Ваш email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" size="icon" aria-label="Подписаться">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ферма Под Ключ. Все права защищены.
        </div>
      </div>
    </footer>
  )
}
