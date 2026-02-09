import Link from "next/link";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations("Nav");
  const alternateLocale = locale === "ru" ? "en" : "ru";

  return (
    <NextIntlClientProvider messages={messages}>
      <header className="topbar">
        <div className="topbar-inner">
          <Link href={`/${locale}`} className="brand">
            BRANDO
          </Link>
          <nav className="menu" aria-label="Main navigation">
            <Link href={`/${locale}`}>{t("home")}</Link>
            <Link href={`/${locale}/catalog`}>{t("catalog")}</Link>
            <Link href={`/${locale}/visual-research`}>{t("visualResearch")}</Link>
            <Link href={`/${alternateLocale}`} className="locale-switch">
              {t("localeSwitch")}
            </Link>
          </nav>
        </div>
      </header>
      <main className="page">{children}</main>
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
