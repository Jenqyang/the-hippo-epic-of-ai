/**
 * The archive. One story is one JSON file in `content/stories/`, named after
 * its number, and every field in that file is something the page prints —
 * see CONTRIBUTING.md for the shape and `scripts/check-content.mjs` for the
 * rules. This module reads the directory once, at build time, on the server.
 */
import { readFileSync, readdirSync } from "node:fs";
import { basename, join } from "node:path";

import {
  sectionNames,
  sectionSlugs,
  type SectionSlug,
} from "@/app/_data/sections";

/** One report on the story: a reprint, a follow-up, the original interview. */
export type Coverage = {
  title: string;
  /** Omitted for a bare link that the story file only gives a label for. */
  outlet?: string;
  published?: string;
  url?: string | null;
};

/** A story file, exactly as it is written in `content/stories/<id>.json`. */
export type StoryFile = {
  title: string;
  /** The report's own headline, when the page title is a translation of it. */
  originalTitle?: string;
  section: SectionSlug;
  outlet: string;
  published: string;
  /** null when the original link could not be found. */
  url: string | null;
  /** A file in `public/stories/`, e.g. "003.jpg". */
  image?: string;
  summary: string;
  /** Lifted verbatim from the report. Empty when no line earns the slot. */
  quote?: string;
  /** The exact wording when `quote` is translated from another language. */
  quoteOriginal?: string;
  coverage?: Coverage[];
};

/** A story file as the pages read it: file name resolved, blanks filled in. */
export type Story = {
  id: string;
  title: string;
  originalTitle?: string;
  section: SectionSlug;
  outlet: string;
  published: string;
  url: string | null;
  summary: string;
  quote: string;
  quoteOriginal?: string;
  /** Public path of the photo, or null when the story runs without one. */
  image: string | null;
  coverage: Coverage[];
};

const storyDir = join(process.cwd(), "content", "stories");

const load = (file: string): Story => {
  const data = JSON.parse(
    readFileSync(join(storyDir, file), "utf8"),
  ) as StoryFile;
  return {
    ...data,
    id: basename(file, ".json"),
    url: data.url ?? null,
    quote: data.quote ?? "",
    image: data.image ? `/stories/${data.image}` : null,
    coverage: data.coverage ?? [],
  };
};

/** Every story, in archive order, which is the order of their numbers. */
export const stories: Story[] = readdirSync(storyDir)
  .filter((file) => file.endsWith(".json"))
  .sort()
  .map(load);

const byId = new Map(stories.map((story) => [story.id, story]));

export const getStory = (id: string) => byId.get(id);

export const storiesIn = (section: SectionSlug) =>
  stories.filter((story) => story.section === section);

/** Named stories for a hand-set slot; throws if an id has been retired. */
export const pick = (...ids: string[]) =>
  ids.map((id) => {
    const story = byId.get(id);
    if (!story) throw new Error(`Unknown story ${id}`);
    return story;
  });

export { sectionNames, sectionSlugs, type SectionSlug };

/**
 * "2026-08-26" → "2026年8月26日". Older entries write the date as a note, such
 * as "首发日期未显示；最后更新 2026-08-27"; the dateline keeps only the date.
 */
export const formatDate = (value: string) => {
  const full = value.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (full) return `${full[1]}年${Number(full[2])}月${Number(full[3])}日`;
  const month = value.match(/^(\d{4})-(\d{2})\b/);
  if (month) return `${month[1]}年${Number(month[2])}月`;
  if (/^\d{4}/.test(value)) return value.split(/[（(；]/)[0].trim();
  return "日期不详";
};

/** Outlet names carry reprint notes in parentheses; the dateline keeps only the masthead. */
export const shortOutlet = (outlet: string) =>
  outlet.split(/[（(，,；;/]/)[0].trim();

export const dateline = (source: { outlet?: string; published?: string }) =>
  [
    source.outlet && shortOutlet(source.outlet),
    source.published && formatDate(source.published),
  ]
    .filter(Boolean)
    .join(" · ");
