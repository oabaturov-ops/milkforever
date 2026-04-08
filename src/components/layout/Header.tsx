'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from './ThemeProvider'
import { Newspaper, Search, Moon, Sun, Menu, X, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Category {
  id: string
  name: string
  slug: string
}

interface HeaderProps {
  onNavigate: (view: 'home' | 'admin', slug?: string) => void
  currentView: string
}

export default function Header({ onNavigate, currentView }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const [categories, setCategories] = useState<Category[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data || []))
      .catch(() => {})
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onNavigate('home')
    // Dispatch a custom event that the main page can listen for
    window.dispatchEvent(new CustomEvent('blog:search', { detail: searchQuery }))
    setSearchOpen(false)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400" />
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Newspaper className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              МедиаБлог
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentView === 'home' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Главная
            </button>
            {categories.slice(0, 5).map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  onNavigate('home')
                  window.dispatchEvent(new CustomEvent('blog:category', { detail: cat.slug }))
                }}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {cat.name}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search */}
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Поиск статей..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-64"
                  autoFocus
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                <Search className="h-4 w-4" />
              </Button>
            )}

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Admin */}
            <Button
              variant={currentView === 'admin' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => onNavigate('admin')}
            >
              <Shield className="h-4 w-4" />
            </Button>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t md:hidden">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  onNavigate('home')
                  setMobileMenuOpen(false)
                }}
                className="text-left text-sm font-medium py-2 hover:text-primary"
              >
                Главная
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onNavigate('home')
                    window.dispatchEvent(new CustomEvent('blog:category', { detail: cat.slug }))
                    setMobileMenuOpen(false)
                  }}
                  className="text-left text-sm font-medium py-2 text-muted-foreground hover:text-primary"
                >
                  {cat.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
