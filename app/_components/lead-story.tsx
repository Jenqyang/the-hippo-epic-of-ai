import Link from "next/link";

import { StoryImage } from "@/app/_components/story-image";
import { StoryTitleText } from "@/app/_components/story-title-text";
import { leadStory } from "@/app/_data/front-page";
import { dateline } from "@/app/_data/stories";

export function LeadStory() {
  return (
    <article className="flex flex-col gap-3.5">
      <StoryImage
        story={leadStory}
        sizes="(min-width: 1024px) 520px, 100vw"
        priority
      />
      <h2 className="text-balance font-display text-[26px] font-black leading-[1.4] tracking-[-0.005em] text-ink-1">
        <Link href={`/story/${leadStory.id}`} className="story-title-link">
          <StoryTitleText title={leadStory.title} />
        </Link>
      </h2>
      <p className="font-serif text-sm italic leading-[1.5] text-ink-meta">
        {dateline(leadStory)}
      </p>
      <blockquote className="mt-1.5 border-l-4 border-ink-1 pl-[18px] font-serif text-lg leading-[1.65] text-ink-2">
        「{leadStory.quote}」
      </blockquote>
    </article>
  );
}
