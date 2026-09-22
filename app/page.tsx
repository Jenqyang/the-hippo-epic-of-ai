import { Epigraph } from "@/app/_components/epigraph";
import { LeadStory } from "@/app/_components/lead-story";
import { PageShell } from "@/app/_components/page-shell";
import { SectionBand } from "@/app/_components/section-band";
import { Teaser } from "@/app/_components/teaser";
import {
  leadColumn,
  middleColumn,
  railColumn,
  railLabel,
  sectionBands,
} from "@/app/_data/front-page";

export default function NewsFront() {
  const firstMiddleImage = middleColumn.findIndex((story) => story.image);

  return (
    <PageShell>
      <Epigraph />

      {/* Meridian's canonical news-front split: lead / second / rail. */}
      <div className="grid gap-8 lg:grid-cols-[5fr_4fr_3fr]">
        <Teaser
          story={middleColumn[0]}
          variant="middle-column"
          withImage={false}
          className="lg:hidden"
        />

        <div className="flex flex-col gap-[22px] lg:border-r lg:border-rule-1 lg:pr-8">
          <LeadStory />
          {leadColumn.map((story) => (
            <Teaser key={story.id} story={story} variant="lead-column" />
          ))}
        </div>

        <div className="flex flex-col gap-5 lg:border-r lg:border-rule-1 lg:pr-8">
          {middleColumn.map((story, index) => (
            <Teaser
              key={story.id}
              story={story}
              variant="middle-column"
              withImage={index === firstMiddleImage}
              priority={index === firstMiddleImage}
              className={index === 0 ? "hidden lg:flex" : undefined}
            />
          ))}
        </div>

        <aside className="flex flex-col gap-[18px]">
          <p className="border-b-2 border-ink-1 pb-2 font-sans text-[11px] font-semibold uppercase leading-none tracking-[0.14em] text-ink-meta">
            {railLabel}
          </p>
          {railColumn.map((story) => (
            <Teaser key={story.id} story={story} variant="rail" />
          ))}
        </aside>
      </div>

      <div className="mt-14 flex flex-col gap-12">
        {sectionBands.map((band) => (
          <SectionBand key={band.slug} {...band} />
        ))}
      </div>
    </PageShell>
  );
}
