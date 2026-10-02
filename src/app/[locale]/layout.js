import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { getTranslations } from 'next-intl/server';

// Dinamik ve SEO uyumlu Meta Bilgileri
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Pages.Home' });

  return {
    title: t('title'),
    description: t('description'),
    // Google'a diğer dil alternatiflerini bildiren canonical/hreflang etiketleri:
    alternates: {
      canonical: `https://seninsiten.com/${locale}`,
      languages: {
        tr: 'https://seninsiten.com/tr',
        en: 'https://seninsiten.com/en',
        de: 'https://seninsiten.com/de',
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }) {
  // Next.js 15/16 için params asenkron çözümlenir
  const { locale } = await params;

  // Dil geçerli rotalarda yoksa 404'e at
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Aktif dilin JSON mesajlarını yükle
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen bg-white text-slate-900 antialiased"
        style={{ fontFamily: '"Open Sans", sans-serif' }}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1 pt-16">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
