import Link from "next/link";

import { footerNote } from "@/app/_data/front-page";
import { sectionNames, sectionSlugs } from "@/app/_data/sections";

export function SiteFooter() {
  return (
    <footer className="mt-11 flex flex-col gap-2.5 border-t border-ink-1 pt-4">
      <nav className="flex flex-wrap gap-x-6 gap-y-2 font-serif text-[15px] leading-none">
        {sectionSlugs.map((slug) => (
          <Link key={slug} href={`/section/${slug}`}>
            {sectionNames[slug]}
          </Link>
        ))}
        <Link href="/about">关于本报</Link>
      </nav>
      <p className="font-serif text-xs leading-[1.6] text-ink-meta">
        {footerNote}
      </p>
    </footer>
  );
}
