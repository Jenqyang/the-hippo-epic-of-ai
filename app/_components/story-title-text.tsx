const TITLE_TOKEN_PATTERN = /(\d+(?:[.,]\d+)*|[A-Za-z]+(?:[+.#'-][A-Za-z0-9]+)*)/g;

/**
 * Adds restrained editorial spot colour to the factual hooks in a headline.
 * The title stays as real text, so wrapping, selection and its accessible name
 * behave exactly as they did before.
 */
export function StoryTitleText({ title }: { title: string }) {
  return title.split(TITLE_TOKEN_PATTERN).map((part, index) => {
    if (!part) return null;

    const token = part.match(TITLE_TOKEN_PATTERN)?.[0] === part;
    if (!token) return part;

    const kind = /^\d/.test(part) ? "number" : "latin";

    return (
      <span
        className={`story-title-token story-title-token-${kind}`}
        key={`${part}-${index}`}
      >
        {part}
      </span>
    );
  });
}
