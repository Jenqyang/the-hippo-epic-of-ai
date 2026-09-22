import Image from "next/image";

import { type Story } from "@/app/_data/stories";

/**
 * A photo as the original outlet ran it. `sizes` is left to the caller because
 * the same image runs at lead, column and thumbnail widths.
 */
export function StoryImage({
  story,
  sizes,
  priority = false,
  aspect = "aspect-[3/2]",
}: {
  story: Story;
  sizes: string;
  priority?: boolean;
  aspect?: string;
}) {
  if (!story.image) return null;

  return (
    <div className={`relative overflow-hidden bg-paper-3 ${aspect}`}>
      <Image
        src={story.image}
        alt={story.title}
        fill
        sizes={sizes}
        preload={priority}
        className="story-image object-cover"
      />
    </div>
  );
}
