import type { MetadataRoute } from "next";

import { sectionSlugs } from "@/app/_data/sections";
import { absoluteUrl } from "@/app/_data/site";
import { stories } from "@/app/_data/stories";

export const dynamic = "force-static";

// Pages are exported as <path>/index.html (`trailingSlash` in next.config.ts),
// so page URLs end in a slash to match their canonical links.

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/about/"), changeFrequency: "yearly", priority: 0.3 },
    ...sectionSlugs.map((slug) => ({
      url: absoluteUrl(`/section/${slug}/`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...stories.map((story) => ({
      url: absoluteUrl(`/story/${story.id}/`),
      changeFrequency: "monthly" as const,
      priority: 0.5,
      ...(story.image && { images: [absoluteUrl(story.image)] }),
    })),
  ];
}
