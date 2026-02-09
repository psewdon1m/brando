import "./globals.css";

export const metadata = {
  title: "Brando MVP",
  description: "Brand website MVP with Home, Catalog and Visual Research"
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
