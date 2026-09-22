/**
 * Site-wide identity for metadata, the sitemap and robots.txt. The public
 * origin comes from `NEXT_PUBLIC_SITE_URL` when set; on Vercel it falls back
 * to the production domain, in other production builds to the paper's own
 * domain, and locally to the dev server.
 */
import type { Metadata } from "next";

type OpenGraph = NonNullable<Metadata["openGraph"]>;

export const siteName = "AI河马史诗";

export const siteLatinTitle = "The Hippo Epic of AI";

export const siteTitle = `${siteName} · ${siteLatinTitle}`;

/** Where the paper's source and story files live. */
export const repoUrl = "https://github.com/Jenqyang/the-hippo-epic-of-ai";

export const siteDescription =
  "一份记录 AI 时代造富传说的报纸：13岁三天赚1.8万，14岁辍学月营收5000万，一个 HTML 文件17天进账100万美元。";

const origin =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NODE_ENV === "production"
      ? "https://hema.42x.xyz"
      : "http://localhost:3000");

export const siteUrl = new URL(origin);

/** Absolute URL for a site path, for the sitemap and robots.txt. */
export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();

/** The masthead share card served by `app/opengraph-image.tsx`. */
export const defaultShareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: siteTitle,
};

/**
 * Open Graph for one page. A page's `openGraph` replaces the root layout's
 * wholesale, so the site-wide fields are repeated here rather than inherited.
 */
export const pageOpenGraph = ({
  title,
  description,
  path,
  article,
  image,
}: {
  title: string;
  description: string;
  path: string;
  /** Marks the page as an article filed under this section name. */
  article?: { section: string };
  /** A site path; defaults to the masthead share card. */
  image?: { url: string; alt: string } | null;
}): OpenGraph => ({
  ...(article
    ? { type: "article", section: article.section }
    : { type: "website" }),
  siteName,
  locale: "zh_CN",
  title,
  description,
  url: path,
  images: [image ?? defaultShareImage],
});
