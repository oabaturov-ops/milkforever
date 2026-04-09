'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from './ThemeProvider'
import { Moon, Sun, Menu, X, Phone, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Главная', href: '#' },
  { label: 'О компании', href: '#about' },
  {
    label: 'Услуги',
    href: '#services',
    children: [
      { label: 'Проектирование ферм', href: '#services' },
      { label: 'Строительство под ключ', href: '#services' },
      { label: 'Подбор оборудования', href: '#services' },
      { label: 'Сервис оборудования', href: '#services' },
      { label: 'Помощь с субсидиями', href: '#services' },
    ],
  },
  { label: 'Блог', href: '#blog' },
  { label: 'Контакты', href: '#contacts' },
]

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
      dropdownTimeoutRef.current = null
    }
    setDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false)
    }, 200)
  }

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
    }
  }, [])

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    setDropdownOpen(false)
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      {/* Верхняя зелёная полоса */}
      <div className="h-1.5 bg-gradient-to-r from-green-700 via-green-400 to-emerald-400" />

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Логотип */}
          <button
            onClick={() => handleNavClick('#')}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <span className="text-2xl">🐄</span>
            <span className="text-xl font-bold bg-gradient-to-r from-green-700 via-green-500 to-emerald-500 bg-clip-text text-transparent">
              Ферма Под Ключ
            </span>
          </button>

          {/* Десктопная навигация */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary rounded-md">
                    {link.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-56 rounded-lg border bg-popover p-1 shadow-lg">
                      {link.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={() => handleNavClick(child.href)}
                          className="block w-full text-left px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary rounded-md"
                >
                  {link.label}
                </button>
              )
            )}
          </nav>

          {/* Правая часть */}
          <div className="flex items-center gap-2">
            {/* Телефон — скрыт на мобильных */}
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

            {/* Кнопка мобильного меню */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Открыть меню"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Мобильное меню */}
        {mobileMenuOpen && (
          <div className="border-t lg:hidden">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="w-full text-left text-sm font-medium py-2.5 px-3 rounded-md hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors"
                    >
                      {link.label}
                    </button>
                    <div className="ml-4 flex flex-col gap-1">
                      {link.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={() => handleNavClick(child.href)}
                          className="text-left text-sm py-2 px-3 text-muted-foreground hover:text-primary rounded-md transition-colors"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left text-sm font-medium py-2.5 px-3 rounded-md hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                )
              )}
              <a
                href="tel:+79026489672"
                className="flex items-center gap-2 py-2.5 px-3 text-sm font-medium text-primary md:hidden"
              >
                <Phone className="h-4 w-4" />
                8-902-648-96-72
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
