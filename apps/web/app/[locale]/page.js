import { getTranslations } from "next-intl/server";
import { getHomeData } from "@/lib/api";
import AnimatedSection from "@/components/animated-section";

export default async function HomePage({ params }) {
  const { locale } = await params;
  const t = await getTranslations("Home");
  const data = await getHomeData(locale);
  const heroMedia = data?.heroMedia || [];
  const catalogPreview = data?.catalogPreview || [];

  return (
    <div className="stack">
      <AnimatedSection className="hero-frame">
        <h1>{t("title")}</h1>
        <p>{t("subtitle")}</p>
        <div className="hero-grid">
          {heroMedia.length === 0 && (
            <article className="media-card muted">
              <h2>{t("mediaUnavailable")}</h2>
              <p>{t("hint")}</p>
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
      </AnimatedSection>

      <AnimatedSection className="section">
        <h2>{t("catalogTitle")}</h2>
        <p>{t("catalogSubtitle")}</p>
        <div className="catalog-grid">
          {catalogPreview.length === 0 && (
            <article className="catalog-card muted">
              <h3>{t("catalogUnavailable")}</h3>
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
      </AnimatedSection>
    </div>
  );
}

