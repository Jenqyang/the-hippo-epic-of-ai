import Link from "next/link";

import { sectionNames, sectionSlugs } from "@/app/_data/sections";

const links = [
  { href: "/", label: "头版" },
  ...sectionSlugs.map((slug) => ({
    href: `/section/${slug}`,
    label: sectionNames[slug],
  })),
  { href: "/about", label: "关于本报" },
];

export function SectionNav() {
  return (
    <>
      <nav className="flex flex-wrap justify-center gap-x-[34px] gap-y-3 border-y border-rule-2 py-3 font-display text-base leading-none text-ink-1">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="text-ink-1">
            {link.label}
          </Link>
        ))}
      </nav>
      {/* The heaviest rule in the system: 3px over 1px, flush. */}
      <div className="mb-7 h-1 border-t-[3px] border-b border-ink-1" />
    </>
  );
}
