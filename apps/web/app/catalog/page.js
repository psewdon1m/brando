import { getCatalogData } from "@/lib/api";

export const metadata = {
  title: "Каталог | Brando MVP"
};

export default async function CatalogPage() {
  const data = await getCatalogData("ru");
  const items = data?.items || [];

  return (
    <section className="stack">
      <div className="section">
        <h1>Каталог</h1>
        <p>Лента с акцентами и разным визуальным весом карточек.</p>
        <div className="catalog-grid large">
          {items.length === 0 && (
            <article className="catalog-card muted">
              <h3>Каталог временно недоступен</h3>
            </article>
          )}
          {items.map((item) => (
            <article
              key={item.id}
              className={`catalog-card ${item.isFeatured ? "featured" : ""}`}
            >
              <img src={item.imageUrl} alt={item.title} loading="lazy" />
              <h3>{item.title}</h3>
              <p>{item.mediaType === "video" ? "Видео-акцент" : "Изображение"}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

