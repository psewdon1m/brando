import { getTranslations } from "next-intl/server";
import { getCatalogData } from "@/lib/api";
import AnimatedSection from "@/components/animated-section";

export default async function CatalogPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations("Catalog");
  const data = await getCatalogData(locale);
  const items = data?.items || [];

  return (
    <AnimatedSection className="section">
      <h1>{t("title")}</h1>
      <p>{t("subtitle")}</p>
      <div className="catalog-grid large">
        {items.length === 0 && (
          <article className="catalog-card muted">
            <h3>{t("unavailable")}</h3>
          </article>
        )}
        {items.map((item) => (
          <article
            key={item.id}
            className={`catalog-card ${item.isFeatured ? "featured" : ""}`}
          >
            <img src={item.imageUrl} alt={item.title} loading="lazy" />
            <h3>{item.title}</h3>
            <p>{item.mediaType === "video" ? t("videoAccent") : t("imageType")}</p>
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}

