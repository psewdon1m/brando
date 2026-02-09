import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Brando MVP",
  description: "Brand website MVP with Home, Catalog and Visual Research"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <header className="topbar">
          <div className="topbar-inner">
            <Link href="/" className="brand">
              BRANDO
            </Link>
            <nav className="menu" aria-label="Main navigation">
              <Link href="/">Главная</Link>
              <Link href="/catalog">Каталог</Link>
              <Link href="/visual-research">Визуальное исследование</Link>
            </nav>
          </div>
        </header>
        <main className="page">{children}</main>
      </body>
    </html>
  );
}

