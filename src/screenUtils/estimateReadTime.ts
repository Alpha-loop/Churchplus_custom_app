// A genuine estimate derived from the real content length (~200
// words/minute average reading speed) — not a fabricated number.
// No "read time" field exists anywhere in the Devotional type.
export const estimateReadTime = (
  content?: string
) => {
  if (!content) {
    return null;
  }

  const words = content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = Math.max(
    1,
    Math.round(words / 200)
  );

  return `${minutes} min read`;
};