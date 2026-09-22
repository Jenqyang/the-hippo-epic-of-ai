import { epigraph } from "@/app/_data/front-page";

/** Standing quote between the nav rule and the news front. */
export function Epigraph() {
  return (
    <section className="mb-9 border-b border-rule-2 pb-8">
      <blockquote className="mt-6 flex flex-col items-center gap-3 text-center">
        <p className="font-display text-[26px] font-medium leading-[1.3] tracking-[0.01em] text-ink-1 sm:text-[38px]">
          “{epigraph.line}”
        </p>
        <p className="font-serif text-[13px] italic leading-[1.4] text-ink-meta sm:text-[15px]">
          “{epigraph.gloss}”
        </p>
      </blockquote>
    </section>
  );
}
