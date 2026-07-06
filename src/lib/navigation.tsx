'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

export type PageName = 'home' | 'about' | 'services' | 'calculator' | 'blog' | 'subsidies' | 'service' | 'contacts' | 'post'

interface NavigationContextType {
  currentPage: PageName
  currentPostSlug: string
  navigateTo: (page: string, slug?: string) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageName>('home')
  const [currentPostSlug, setCurrentPostSlug] = useState('')

  const navigateTo = useCallback((page: string, slug?: string) => {
    setCurrentPage(page as PageName)
    if (slug) setCurrentPostSlug(slug)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [currentPage])

  return (
    <NavigationContext.Provider value={{ currentPage, currentPostSlug, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}