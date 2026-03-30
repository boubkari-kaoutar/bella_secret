import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import ClientLayout from "@/components/ClientLayout";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "ar"
    ? "بيلا سيكريت – مستحضرات التجميل الطبيعية"
    : "Bella Secret – Cosmétiques Naturels au Maroc";
  const description = locale === "ar"
    ? "اكتشفي مستحضرات تجميل 100% طبيعية، مصنوعة بعناية من مكونات نباتية لتغذية بشرتك وشعرك."
    : "Découvrez des cosmétiques 100% naturels, enrichis en microalgues et extraits végétaux, pour nourrir, protéger et sublimer votre peau et vos cheveux.";

  return {
    title,
    description,
    icons: {
      icon: "/images/LOGO-1-cropped.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
