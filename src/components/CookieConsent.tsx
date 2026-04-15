"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Cookie, ShieldCheck } from "lucide-react";

const COOKIE_CONSENT_KEY = "cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Проверяем, давал ли пользователь согласие
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Показываем баннер с задержкой 1 секунда
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      accepted: true,
      date: new Date().toISOString(),
      analytics: true,
      marketing: true,
    }));
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      accepted: false,
      date: new Date().toISOString(),
      analytics: false,
      marketing: false,
    }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="mx-auto max-w-4xl rounded-xl border border-border bg-card/95 backdrop-blur-md p-4 shadow-2xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="h-6 w-6 text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">
                Мы используем файлы cookie
              </p>
              <p>
                Этот сайт использует cookie для аналитики (Яндекс Метрика, Google Tag Manager)
                и ретаргетинга (VK), чтобы улучшать ваш опыт и показывать релевантный контент.
                Продолжая пользоваться сайтом, вы соглашаетесь с{" "}
                <a href="/privacy" className="underline text-primary hover:text-primary/80">
                  политикой конфиденциальности
                </a>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDecline}
              className="text-xs"
            >
              Отклонить
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="text-xs gap-1"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Принять
            </Button>
          </div>
        </div>
        {/* Кнопка закрытия */}
        <button
          onClick={handleDecline}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted/50 transition-colors sm:hidden"
          aria-label="Закрыть"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
