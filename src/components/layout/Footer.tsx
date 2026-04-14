'use client'

import React from 'react'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, ExternalLink } from 'lucide-react'
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
            <a
              href="https://vk.com/fermapodklyuch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#0077FF] hover:underline font-medium"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.339-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.847 2.49 2.273 4.675 2.849 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.153-3.574 2.153-3.574.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/></svg>
              ВКонтакте
              <ExternalLink className="h-3 w-3" />
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
