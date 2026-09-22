import Link from "next/link";

import { StoryImage } from "@/app/_components/story-image";
import { StoryTitleText } from "@/app/_components/story-title-text";
import { dateline, type Story } from "@/app/_data/stories";

type TeaserVariant = "lead-column" | "middle-column" | "rail" | "band";

const variants = {
  // Divided by a rule above, because the lead story sits directly on top.
  // The photo sits beside the headline, as a secondary front-page story does.
  "lead-column": {
    article: "grid gap-x-5 gap-y-2 border-t border-rule-1 pt-5 sm:grid-cols-[1fr_180px]",
    title: "text-[26px] leading-[1.4]",
    showSource: true,
    showQuote: true,
    image: "side",
  },
  "middle-column": {
    article: "flex flex-col gap-2 border-b border-rule-1 pb-5",
    title: "text-[22px] leading-[1.45]",
    showSource: true,
    showQuote: true,
    image: "top",
  },
  // The rail is intentionally headline-only: quick, quiet archive scanning.
  rail: {
    article: "flex flex-col gap-1.5 border-b border-rule-1 pb-4",
    title: "text-lg leading-[1.45]",
    showSource: false,
    showQuote: false,
    image: "none",
  },
  // Section bands below the fold: photo on top, then headline.
  band: {
    article: "flex flex-col gap-2",
    title: "text-lg leading-[1.45]",
    showSource: false,
    showQuote: false,
    image: "top",
  },
} satisfies Record<
  TeaserVariant,
  {
    article: string;
    title: string;
    showSource: boolean;
    showQuote: boolean;
    image: "side" | "top" | "none";
  }
>;

export function Teaser({
  story,
  variant,
  withImage = true,
  priority = false,
  className = "",
}: {
  story: Story;
  variant: TeaserVariant;
  /** The middle column only runs a photo on its first story. */
  withImage?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const style = variants[variant];
  const image = withImage && story.image ? style.image : "none";

  return (
    <article className={`${style.article} ${className}`}>
      {image === "top" && (
        <StoryImage
          story={story}
          sizes="(min-width: 1024px) 400px, 100vw"
          priority={priority}
        />
      )}
      <div className="flex flex-col gap-2">
        <h3
          className={`text-pretty font-display font-bold text-ink-1 ${style.title}`}
        >
          <Link href={`/story/${story.id}`} className="story-title-link">
            <StoryTitleText title={story.title} />
          </Link>
        </h3>
        {style.showSource && (
          <p className="font-serif text-[13px] italic leading-[1.5] text-ink-meta">
            {dateline(story)}
          </p>
        )}
        {style.showQuote && story.quote && (
          <p className="font-serif text-[15px] leading-[1.65] text-ink-3">
            「{story.quote}」
          </p>
        )}
      </div>
      {image === "side" && (
        <div className="sm:row-start-1 sm:col-start-2">
          <StoryImage
            story={story}
            sizes="180px"
            aspect="aspect-square"
          />
        </div>
      )}
    </article>
  );
}
