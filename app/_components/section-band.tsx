import Link from "next/link";

import { Teaser } from "@/app/_components/teaser";
import { StoryTitleText } from "@/app/_components/story-title-text";
import { sectionNames, type SectionSlug } from "@/app/_data/sections";
import { type Story } from "@/app/_data/stories";

/** One desk below the fold: a labelled rule, four photo stories, then briefs. */
export function SectionBand({
  slug,
  total,
  featured,
  briefs,
}: {
  slug: SectionSlug;
  total: number;
  featured: Story[];
  briefs: Story[];
}) {
  return (
    <section className="flex flex-col gap-5">
      <header className="flex items-baseline justify-between border-t-2 border-ink-1 pt-2.5">
        <h2 className="font-display text-2xl font-black leading-none text-ink-1">
          <Link href={`/section/${slug}`} className="text-ink-1">
            {sectionNames[slug]}
          </Link>
        </h2>
        <Link
          href={`/section/${slug}`}
          className="font-sans text-[11px] font-semibold uppercase leading-none tracking-[0.14em]"
        >
          全部 {total} 条 →
        </Link>
      </header>

      {featured.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((story) => (
            <Teaser key={story.id} story={story} variant="band" />
          ))}
        </div>
      )}

      {briefs.length > 0 && (
        <ul className="grid gap-x-8 border-t border-rule-1 sm:grid-cols-2 lg:grid-cols-3">
          {briefs.map((story) => (
            <li key={story.id} className="border-b border-rule-1 py-3">
              <Link
                href={`/story/${story.id}`}
                className="story-title-link text-pretty font-display text-base font-bold leading-[1.45]"
              >
                <StoryTitleText title={story.title} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
