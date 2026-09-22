import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageShell } from "@/app/_components/page-shell";
import { Teaser } from "@/app/_components/teaser";
import {
  isSectionSlug,
  sectionNames,
  sectionSlugs,
} from "@/app/_data/sections";
import { pageOpenGraph, siteName } from "@/app/_data/site";
import { storiesIn } from "@/app/_data/stories";

export const dynamicParams = false;

export function generateStaticParams() {
  return sectionSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/section/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  if (!isSectionSlug(slug)) return {};
  const name = sectionNames[slug];
  const description = `${siteName}「${name}」栏目，共 ${storiesIn(slug).length} 条 AI 时代造富传说。`;
  const path = `/section/${slug}`;
  return {
    title: name,
    description,
    alternates: { canonical: path },
    openGraph: pageOpenGraph({ title: name, description, path }),
  };
}

export default async function SectionPage(
  props: PageProps<"/section/[slug]">,
) {
  const { slug } = await props.params;
  if (!isSectionSlug(slug)) notFound();

  const list = storiesIn(slug);
  const withImage = list.filter((s) => s.image);
  const withoutImage = list.filter((s) => !s.image);

  return (
    <PageShell>
      <header className="mb-8 flex items-baseline justify-between">
        <h1 className="font-display text-[40px] font-black leading-none text-ink-1">
          {sectionNames[slug]}
        </h1>
        <span className="font-mono text-xs tracking-[0.04em] text-ink-meta">
          共 {list.length} 条
        </span>
      </header>

      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {withImage.map((story) => (
          <Teaser key={story.id} story={story} variant="middle-column" />
        ))}
      </div>

      {withoutImage.length > 0 && (
        <div className="mt-12 grid gap-x-8 gap-y-5 border-t-2 border-ink-1 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {withoutImage.map((story) => (
            <Teaser key={story.id} story={story} variant="middle-column" />
          ))}
        </div>
      )}
    </PageShell>
  );
}
