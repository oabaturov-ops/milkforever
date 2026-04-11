'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

export type PageName = 'home' | 'about' | 'services' | 'calculator' | 'blog' | 'subsidies' | 'service' | 'contacts' | 'post'

interface NavigationContextType {
  currentPage: PageName
  currentPostSlug: string
  navigateTo: (page: PageName, slug?: string) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageName>('home')
  const [currentPostSlug, setCurrentPostSlug] = useState('')

  const navigateTo = useCallback((page: PageName, slug?: string) => {
    setCurrentPage(page)
    if (slug) setCurrentPostSlug(slug)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Scroll to top on page change
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
