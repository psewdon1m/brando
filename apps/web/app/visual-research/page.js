import { getVisualResearchData } from "@/lib/api";

export const metadata = {
  title: "Визуальное исследование | Brando MVP"
};

export default async function VisualResearchPage() {
  const data = await getVisualResearchData("ru");
  const entries = data?.entries || [];

  return (
    <section className="stack">
      <div className="section">
        <h1>Визуальное исследование</h1>
        <p>
          Формат живого дневника: видео, короткие подписи, без стилистики архива
          и длинных текстовых блоков.
        </p>
        <div className="research-grid">
          {entries.length === 0 && (
            <article className="media-card muted">
              <h2>Материалы временно недоступны</h2>
            </article>
          )}
          {entries.map((entry) => (
            <article key={entry.id} className="media-card">
              <video controls preload="metadata" poster={entry.posterUrl}>
                <source src={entry.videoUrl} type="video/mp4" />
              </video>
              <p>{entry.caption}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

