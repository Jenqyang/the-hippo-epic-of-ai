import Image from "next/image";

import { LiveDateTime } from "@/app/_components/live-date-time";
import { masthead } from "@/app/_data/front-page";

export function Masthead() {
  return (
    <header className="grid items-center justify-items-center gap-6 pb-5 text-center lg:grid-cols-[1fr_auto_1fr] lg:justify-items-stretch lg:text-left">
      <div className="font-serif text-[13px] leading-[1.4] text-ink-2">
        <LiveDateTime />
      </div>

      <div className="flex flex-col items-center gap-2.5">
        <div className="flex items-center gap-3 sm:gap-[22px]">
          <Image
            className="h-23 w-23 shrink-0 object-contain grayscale contrast-[1.05]"
            src="/masthead-emblem.png"
            alt={masthead.emblemAlt}
            width={92}
            height={92}
            preload
          />
          <h1 className="w-[248px] text-center text-ink-1 sm:w-[390px]">
            <span className="font-huiwen block whitespace-nowrap text-[44px] leading-[0.9] font-normal tracking-[-0.055em] sm:text-[64px]">
              {masthead.title}
            </span>
            <span className="mt-2 block whitespace-nowrap font-serif text-[9px] leading-none font-semibold tracking-[0.22em] uppercase sm:text-[13px]">
              {masthead.latinTitle}
            </span>
          </h1>
        </div>
      </div>

      <div className="text-center font-serif text-xs leading-[1.4] tracking-[0.04em] text-ink-2 lg:text-right">
        <span>{masthead.archiveCount}</span>
      </div>
    </header>
  );
}
