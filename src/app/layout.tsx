import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
  title: "Ферма Под Ключ | Строительство молочных ферм под ключ",
  description:
    "Проектирование, строительство и сопровождение молочных ферм. Подбор оборудования, помощь с субсидиями. Пермь и регионы.",
  keywords: [
    "ферма под ключ",
    "молочная ферма",
    "строительство ферм",
    "проектирование ферм",
    "оборудование для ферм",
    "субсидии на ферму",
    "Пермь",
    "Пермский край",
  ],
  authors: [{ name: "Ферма Под Ключ" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Ферма Под Ключ | Строительство молочных ферм под ключ",
    description:
      "Проектирование, строительство и сопровождение молочных ферм. Подбор оборудования, помощь с субсидиями. Пермь и регионы.",
    url: "https://preview-chat-423acf46-a44b-4a14-b448-69fcb1af8323.space.z.ai/",
    siteName: "Ферма Под Ключ",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ферма Под Ключ | Строительство молочных ферм под ключ",
    description:
      "Проектирование, строительство и сопровождение молочных ферм. Подбор оборудования, помощь с субсидиями.",
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
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
