'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from './ThemeProvider'
import { useNavigation } from '@/lib/navigation'
import { Moon, Sun, Menu, X, Phone, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Главная', page: 'home' as const },
  { label: 'О компании', page: 'about' as const },
  {
    label: 'Услуги',
    page: 'services' as const,
    children: [
      { label: 'Все услуги', page: 'services' as const },
      { label: 'Сервис оборудования', page: 'service' as const },
      { label: 'Субсидии', page: 'subsidies' as const },
    ],
  },
  { label: 'Блог', page: 'blog' as const },
  { label: 'Субсидии', page: 'subsidies' as const },
  { label: 'Калькулятор', page: 'calculator' as const },
  { label: 'Контакты', page: 'contacts' as const },
]

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { navigateTo, currentPage } = useNavigation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Закрытие меню при скролле
  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) setMenuOpen(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuOpen])

  // Блокировка скролла при открытом меню
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (page: string) => {
    setMenuOpen(false)
    setSubmenuOpen(false)
    navigateTo(page as 'home' | 'about' | 'services' | 'calculator' | 'blog' | 'subsidies' | 'service' | 'contacts')
  }

  return (
    <>
      {/* Верхняя зелёная полоса */}
      <div className="h-1.5 bg-gradient-to-r from-green-700 via-green-400 to-emerald-400" />

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Логотип */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <span className="text-2xl">🐄</span>
            <span className="text-xl font-bold bg-gradient-to-r from-green-700 via-green-500 to-emerald-500 bg-clip-text text-transparent">
              Ферма Под Ключ
            </span>
          </button>

          {/* Правая часть */}
          <div className="flex items-center gap-2">
            {/* Телефон — скрыт на маленьких экранах */}
            <a
              href="tel:+79026489672"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              8-902-648-96-72
            </a>

            {/* Переключатель темы */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Переключить тему">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Кнопка гамбургер-меню */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Открыть меню"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Гамбургер-меню — выпадающая панель */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden border-t"
            >
              <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
                {/* Телефон — виден в меню на мобильных */}
                <a
                  href="tel:+79026489672"
                  className="flex items-center gap-3 py-3 px-3 text-base font-semibold text-primary hover:bg-accent rounded-lg transition-colors md:hidden"
                >
                  <Phone className="h-5 w-5" />
                  8-902-648-96-72
                </a>

                <div className="h-px bg-border my-1" />

                {navLinks.map((link) =>
                  link.children ? (
                    <div key={link.label}>
                      <button
                        onClick={() => {
                          setSubmenuOpen(!submenuOpen)
                          handleNavClick(link.page)
                        }}
                        className={`w-full flex items-center justify-between text-base font-medium py-3 px-3 rounded-lg hover:bg-accent transition-colors ${
                          currentPage === link.page ? 'text-primary' : 'text-foreground'
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${submenuOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <AnimatePresence>
                        {submenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden ml-3 border-l-2 border-green-300 pl-3"
                          >
                            {link.children.map((child) => (
                              <button
                                key={child.label}
                                onClick={() => handleNavClick(child.page)}
                                className={`w-full text-left text-sm py-2.5 px-3 rounded-md transition-colors ${
                                  currentPage === child.page
                                    ? 'text-primary bg-accent font-medium'
                                    : 'text-muted-foreground hover:text-primary hover:bg-accent'
                                }`}
                              >
                                {child.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <button
                      key={link.label}
                      onClick={() => handleNavClick(link.page)}
                      className={`w-full text-left text-base font-medium py-3 px-3 rounded-lg hover:bg-accent transition-colors ${
                        currentPage === link.page ? 'text-primary bg-accent/50' : 'text-foreground'
                      }`}
                    >
                      {link.label}
                    </button>
                  )
                )}

                {/* Телефон в конце меню — виден на десктопе */}
                <div className="h-px bg-border my-1" />
                <a
                  href="tel:+79026489672"
                  className="hidden md:flex items-center gap-3 py-3 px-3 text-base font-semibold text-primary hover:bg-accent rounded-lg transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  8-902-648-96-72
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
