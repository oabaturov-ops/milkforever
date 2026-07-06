'use client'

import { useCallback, useEffect, useSyncExternalStore, type ReactNode } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'ferma-pod-klyuch-theme'

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  return (localStorage.getItem(STORAGE_KEY) as Theme) || getSystemTheme()
}

let currentTheme: Theme = 'light'
let listeners: (() => void)[] = []

function subscribe(listener: () => void) {
  listeners.push(listener)
  return () => {
    listeners = listeners.filter(l => l !== listener)
  }
}

function getSnapshot(): Theme {
  return currentTheme
}

function getServerSnapshot(): Theme {
  return 'light'
}

function setTheme(theme: Theme) {
  currentTheme = theme
  localStorage.setItem(STORAGE_KEY, theme)
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }
  listeners.forEach(l => l())
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }, [theme])

  const setLight = useCallback(() => setTheme('light'), [])
  const setDark = useCallback(() => setTheme('dark'), [])

  useEffect(() => {
    currentTheme = getStoredTheme()
    document.documentElement.classList.toggle('dark', currentTheme === 'dark')
    listeners.forEach(l => l())
  }, [])

  return { theme, toggleTheme, setLight, setDark }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}
