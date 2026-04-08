'use client'

import React, { useState } from 'react'
import { Newspaper, Mail, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

interface Category {
  id: string
  name: string
  slug: string
}

interface FooterProps {
  categories: Category[]
  onNavigate: (view: 'home' | 'admin', slug?: string) => void
}

export default function Footer({ categories, onNavigate }: FooterProps) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

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
      // handle error
    }
  }

  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                МедиаБлог
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Современный медиа-портал о технологиях, науке, бизнесе и программировании. 
              Мы публикуем качественный контент для тех, кто хочет быть в курсе последних трендов.
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold">Рубрики</h3>
            <nav className="flex flex-col gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => onNavigate('home')}
                  className="text-left text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {cat.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Рассылка
            </h3>
            <p className="text-sm text-muted-foreground">
              Подпишитесь на нашу рассылку и получайте лучшие статьи прямо на вашу почту.
            </p>
            {subscribed ? (
              <p className="text-sm text-green-600 font-medium">✓ Спасибо за подписку!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} МедиаБлог. Все права защищены.
        </div>
      </div>
    </footer>
  )
}
