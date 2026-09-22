import { Masthead } from "@/app/_components/masthead";
import { SectionNav } from "@/app/_components/section-nav";
import { SiteFooter } from "@/app/_components/site-footer";

/** Masthead, nav and footer shared by every page of the paper. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 bg-paper-1 px-6 pt-6 pb-18 font-serif text-ink-2">
      <div className="mx-auto max-w-[1280px]">
        <Masthead />
        <SectionNav />
        {children}
        <SiteFooter />
      </div>
    </div>
  );
}
