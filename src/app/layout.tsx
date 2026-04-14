import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { NavigationProvider } from "@/lib/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: {
    default: "Строительство молочных ферм | Ферма Под Ключ",
    template: "%s | Ферма Под Ключ",
  },
  description:
    "Проектирование и строительство молочных ферм под ключ. Оборудование, субсидии. Пермь и регионы. 15+ лет опыта, 2000+ коров.",
  keywords: [
    "ферма под ключ",
    "молочная ферма",
    "строительство ферм",
    "проектирование молочных ферм",
    "оборудование для ферм",
    "доильный зал",
    "кормосмеситель",
    "субсидии на ферму",
    "грант на строительство фермы",
    "молочное животноводство",
    "корова",
    "надой",
    "Пермь",
    "Пермский край",
    "Урал",
  ],
  authors: [{ name: "Ферма Под Ключ", url: "https://milkforever.ru" }],
  creator: "Ферма Под Ключ",
  publisher: "Ферма Под Ключ",
  metadataBase: new URL("https://milkforever.ru"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Строительство молочных ферм | Ферма Под Ключ",
    description:
      "Проектирование и строительство молочных ферм под ключ. Оборудование, субсидии. Пермь и регионы.",
    url: "https://milkforever.ru",
    siteName: "Ферма Под Ключ",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/hero-video-poster.jpg",
        width: 1200,
        height: 630,
        alt: "Ферма Под Ключ — Строительство молочных ферм",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Строительство молочных ферм | Ферма Под Ключ",
    description:
      "Проектирование и строительство молочных ферм под ключ. Оборудование, субсидии. Пермь и регионы.",
    images: ["/hero-video-poster.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    yandex: "",
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
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <NavigationProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          </NavigationProvider>
        </ThemeProvider>
        <Toaster />

        {/* JSON-LD структурированные данные */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Ферма Под Ключ",
              description: "Проектирование, строительство и сопровождение молочных ферм в Пермском крае и регионах",
              url: "https://milkforever.ru",
              telephone: "+79026489672",
              email: "oba12@yandex.ru",
              address: {
                "@type": "PostalAddress",
                streetAddress: "ул. Декабристов, 33",
                addressLocality: "Пермь",
                addressRegion: "Пермский край",
                addressCountry: "RU",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: "09:00",
                closes: "17:00",
              },
              priceRange: "$$$",
              sameAs: [
                "https://t.me/MilkForeverServiceBot",
                "https://vk.com/fermapodklyuch",
              ],
              areaServed: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: 58.0,
                  longitude: 56.0,
                },
                geoRadius: "200000",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
