import { getHomeData } from "@/lib/api";

export default async function HomePage() {
  const data = await getHomeData("ru");
  const heroMedia = data?.heroMedia || [];
  const catalogPreview = data?.catalogPreview || [];

  return (
    <section className="stack">
      <div className="hero-frame">
        <h1>Метаморфозность и тишина</h1>
        <p>
          Главный экран MVP: видео-слайдшоу и ритм визуальных акцентов без
          перегруза текстом.
        </p>
        <div className="hero-grid">
          {heroMedia.length === 0 && (
            <article className="media-card muted">
              <h2>Видео временно недоступно</h2>
              <p>Проверь запуск api-gateway и media-service.</p>
            </article>
          )}
          {heroMedia.map((item) => (
            <article key={item.id} className="media-card">
              <h2>{item.title || "Hero media"}</h2>
              <video controls preload="metadata" poster={item.posterUrl}>
                <source src={item.videoUrl} type="video/mp4" />
              </video>
            </article>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Каталог</h2>
        <p>Предпросмотр ленты каталога из api-gateway.</p>
        <div className="catalog-grid">
          {catalogPreview.length === 0 && (
            <article className="catalog-card muted">
              <h3>Каталог временно недоступен</h3>
            </article>
          )}
          {catalogPreview.map((item) => (
            <article
              key={item.id}
              className={`catalog-card ${item.isFeatured ? "featured" : ""}`}
            >
              <img src={item.imageUrl} alt={item.title} loading="lazy" />
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

