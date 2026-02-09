import { getTranslations } from "next-intl/server";
import { getVisualResearchData } from "@/lib/api";
import AnimatedSection from "@/components/animated-section";

export default async function VisualResearchPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations("VisualResearch");
  const data = await getVisualResearchData(locale);
  const entries = data?.entries || [];

  return (
    <AnimatedSection className="section">
      <h1>{t("title")}</h1>
      <p>{t("subtitle")}</p>
      <div className="research-grid">
        {entries.length === 0 && (
          <article className="media-card muted">
            <h2>{t("unavailable")}</h2>
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
    </AnimatedSection>
  );
}

