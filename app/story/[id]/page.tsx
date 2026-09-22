import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/app/_components/page-shell";
import { StoryImage } from "@/app/_components/story-image";
import { StoryTitleText } from "@/app/_components/story-title-text";
import { pageOpenGraph } from "@/app/_data/site";
import {
  dateline,
  getStory,
  sectionNames,
  stories,
  storiesIn,
} from "@/app/_data/stories";

export const dynamicParams = false;

export function generateStaticParams() {
  return stories.map((story) => ({ id: story.id }));
}

export async function generateMetadata(
  props: PageProps<"/story/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const story = getStory(id);
  if (!story) return {};
  const description = story.quote ? `「${story.quote}」` : story.summary;
  const path = `/story/${story.id}`;
  return {
    title: story.title,
    description,
    alternates: { canonical: path },
    openGraph: pageOpenGraph({
      title: story.title,
      description,
      path,
      article: { section: sectionNames[story.section] },
      image: story.image ? { url: story.image, alt: story.title } : null,
    }),
  };
}

export default async function StoryPage(props: PageProps<"/story/[id]">) {
  const { id } = await props.params;
  const story = getStory(id);
  if (!story) notFound();

  const more = storiesIn(story.section)
    .filter((s) => s.id !== story.id)
    .slice(0, 5);

  return (
    <PageShell>
      <article className="mx-auto flex max-w-[720px] flex-col gap-5">
        <div className="flex items-center gap-3">
          <Link
            href={`/section/${story.section}`}
            className="font-sans text-[11px] font-semibold uppercase leading-none tracking-[0.14em]"
          >
            {sectionNames[story.section]}
          </Link>
          <span className="ml-auto font-mono text-xs text-ink-meta">
            No. {story.id}
          </span>
        </div>

        <h1 className="text-balance font-display text-[clamp(30px,4vw,44px)] font-black leading-[1.22] text-ink-1">
          <StoryTitleText title={story.title} />
        </h1>
        <p className="font-serif text-sm italic leading-[1.5] text-ink-meta">
          原载 {dateline(story)}
          {story.originalTitle && <>　原题《{story.originalTitle}》</>}
        </p>
        {story.image && (
          <StoryImage
            story={story}
            sizes="(min-width: 768px) 720px, 100vw"
            priority
          />
        )}

        {story.quote && (
          <blockquote className="my-3 flex flex-col gap-3 border-y border-ink-1 py-6 text-center">
            <p className="font-display text-[clamp(22px,2.6vw,28px)] font-bold leading-[1.5] text-ink-1">
              「{story.quote}」
            </p>
            {story.quoteOriginal && (
              <p className="font-serif text-sm italic leading-[1.6] text-ink-meta">
                原文：{story.quoteOriginal}
              </p>
            )}
          </blockquote>
        )}

        <section className="flex flex-col gap-2 border-t border-rule-1 pt-5">
          <h2 className="font-display text-lg font-bold text-ink-1">原文</h2>
          {story.url ? (
            <a
              href={story.url}
              target="_blank"
              rel="noreferrer"
              className="font-serif text-[15px] leading-[1.6] break-all"
            >
              {story.originalTitle ?? story.title} — {story.outlet}
            </a>
          ) : (
            <p className="font-serif text-[15px] text-ink-meta">
              原文链接暂缺。
            </p>
          )}
        </section>

        {story.coverage.length > 0 && (
          <section className="flex flex-col gap-2 border-t border-rule-1 pt-5">
            <h2 className="font-display text-lg font-bold text-ink-1">
              相关报道
            </h2>
            <ul className="flex flex-col gap-2.5">
              {story.coverage.map((item) => (
                <li
                  key={`${item.url}-${item.title}`}
                  className="flex flex-col gap-0.5 font-serif text-[15px] leading-[1.6]"
                >
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noreferrer">
                      {item.title}
                    </a>
                  ) : (
                    <span>{item.title}</span>
                  )}
                  {/* A bare related link carries no outlet or date of its own. */}
                  {(item.outlet || item.published) && (
                    <span className="text-[13px] italic text-ink-meta">
                      {dateline(item)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      {more.length > 0 && (
        <aside className="mx-auto mt-14 flex max-w-[720px] flex-col gap-3">
          <p className="border-b-2 border-ink-1 pb-2 font-sans text-[11px] font-semibold uppercase leading-none tracking-[0.14em] text-ink-meta">
            {sectionNames[story.section]} · 更多报道
          </p>
          {more.map((s) => (
            <Link
              key={s.id}
              href={`/story/${s.id}`}
              className="story-title-link block border-b border-rule-1 pb-3"
            >
              <span className="font-display text-lg font-bold leading-[1.45]">
                <StoryTitleText title={s.title} />
              </span>
            </Link>
          ))}
        </aside>
      )}
    </PageShell>
  );
}
