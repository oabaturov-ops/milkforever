import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "МедиаБлог — Технологии, Наука, Бизнес",
  description: "Современный медиа-портал о технологиях, науке, бизнесе и программировании. Качественный контент для тех, кто хочет быть в курсе последних трендов.",
  keywords: ["блог", "технологии", "наука", "бизнес", "программирование", "новости", "статьи"],
  authors: [{ name: "МедиаБлог" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "МедиаБлог — Технологии, Наука, Бизнес",
    description: "Современный медиа-портал о технологиях, науке, бизнесе и программировании.",
    url: "https://preview-chat-423acf46-a44b-4a14-b448-69fcb1af8323.space.z.ai/",
    siteName: "МедиаБлог",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "МедиаБлог — Технологии, Наука, Бизнес",
    description: "Современный медиа-портал о технологиях, науке, бизнесе и программировании.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
