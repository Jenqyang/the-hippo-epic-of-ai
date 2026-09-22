/**
 * Front page layout: which archive stories run where. Story copy lives in
 * `content/stories/`; this file only names ids and slots.
 */
import { sectionSlugs } from "@/app/_data/sections";
import { siteLatinTitle, siteName } from "@/app/_data/site";
import { pick, stories } from "@/app/_data/stories";

export const masthead = {
  title: siteName,
  latinTitle: siteLatinTitle,
  emblemAlt: "河马报徽",
  archiveCount: `累计 ${stories.length} 篇故事`,
} as const;

/** 14岁辍学、睡天桥、月营收5000万: the archive's most complete epic. */
export const [leadStory] = pick("003");

/**
 * The 5 / 4 / 3 broadsheet split from the design. Only the lead and the two
 * quote-bearing columns print a pull quote; the rail is headline-only, so the
 * sharpest lines belong in `middleColumn`, not the rail.
 */
export const leadColumn = pick("112", "046");
export const middleColumn = pick("080", "023", "084", "107", "039", "172");
export const railColumn = pick("196", "200", "205", "059", "135", "092", "020");

export const railLabel = "更多报道";

const onFront = new Set(
  [leadStory, ...leadColumn, ...middleColumn, ...railColumn].map((s) => s.id),
);

/** Below the fold, one band per desk, skipping what already ran up top. */
export const sectionBands = sectionSlugs.map((slug) => {
  const rest = stories.filter((s) => s.section === slug && !onFront.has(s.id));
  // Two stories may run the same photo; print each photo once per band.
  const seen = new Set<string>();
  const featured = rest
    .filter((s) => s.image && !seen.has(s.image) && seen.add(s.image))
    .slice(0, 4);
  const briefs = rest.filter((s) => !featured.includes(s)).slice(0, 6);
  return {
    slug,
    total: stories.filter((s) => s.section === slug).length,
    featured,
    briefs,
  };
});

export const footerNote = "文中摘录与配图版权归原作者与原媒体所有。";

/** The front page's standing epigraph, set under the nav rule. */
export const epigraph = {
  label: "本报箴言",
  line: "我瘫坐在原子弹上，仿佛看到了椅子爆炸。",
  gloss: "I slumped back onto the atom bomb, and seemed to see the chair go off.",
} as const;
