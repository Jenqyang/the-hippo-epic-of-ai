/**
 * The paper's five desks. Every story files under exactly one of them; the
 * slug is what a story file's `section` field holds and what `/section/<slug>`
 * serves. Adding a desk here adds it to the nav, the footer and the front page.
 */
export const sectionNames = {
  prodigies: "新手村",
  solo: "单人速通",
  "side-hustle": "支线任务",
  virtual: "皮套人",
  drama: "开新番",
} as const;

export type SectionSlug = keyof typeof sectionNames;

export const sectionSlugs = Object.keys(sectionNames) as SectionSlug[];

export const isSectionSlug = (value: string): value is SectionSlug =>
  Object.hasOwn(sectionNames, value);
