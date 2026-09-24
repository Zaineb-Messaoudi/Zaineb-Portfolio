import { useEffect } from "react";
import { personal, projects } from "../data/portfolioData";
import { useLanguage } from "../i18n";

const DEFAULT_SITE_URL = "https://zainebportfolio.vercel.app";

function upsertMeta(attribute, value, content) {
  let element = document.head.querySelector(`meta[${attribute}="${value}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function SEOHead() {
  const { language } = useLanguage();

  useEffect(() => {
    const siteUrl = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
    const title = language === "fr"
      ? "Zaineb Messaoudi | Ingénierie logicielle & IA"
      : "Zaineb Messaoudi | Software Engineering & AI";
    const description = language === "fr"
      ? "Portfolio de Zaineb Messaoudi, étudiante en ingénierie logicielle spécialisée en full-stack, IA appliquée et produits numériques accessibles."
      : "Portfolio of Zaineb Messaoudi, a software engineering student focused on full-stack systems, applied AI, and accessible digital products.";
    const imageUrl = `${siteUrl}/assets/zaineb-horizontal-logo-dark.png`;

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", "index, follow, max-image-preview:large");
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", siteUrl);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:image:alt", "Zaineb Messaoudi portfolio");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);
    upsertLink("canonical", siteUrl);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: personal.name,
      url: `${siteUrl}/`,
      image: `${siteUrl}${personal.profileImage}`,
      jobTitle: "Software Engineering Student",
      description,
      email: `mailto:${personal.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tunis",
        addressCountry: "TN",
      },
      sameAs: [personal.linkedin, personal.github],
      knowsAbout: [
        "Full-stack software engineering",
        "Applied artificial intelligence",
        "Web accessibility",
        ...projects.slice(0, 3).map((project) => project.title),
      ],
    };

    let script = document.head.querySelector('script[data-seo-schema="person"]');
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoSchema = "person";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [language]);

  return null;
}

export default SEOHead;
