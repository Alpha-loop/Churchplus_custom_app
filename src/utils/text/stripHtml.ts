// Posts, devotionals and announcements come from the backend's
// rich-text editor as HTML (e.g. "<p>Service starts at 9am</p>").
// React Native's <Text> shows that markup literally, so this turns
// it into plain text: paragraphs and line breaks become new lines,
// list items become bullets, tags are removed and common HTML
// entities (&nbsp;, &amp;, &#39; ...) are decoded.
const NAMED_ENTITIES: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  bull: "•",
  copy: "©",
};

function decodeEntities(text: string): string {
  return text.replace(
    /&(#x[0-9a-f]+|#\d+|[a-z]+);/gi,
    (match, entity: string) => {
      if (entity[0] === "#") {
        const code =
          entity[1].toLowerCase() === "x"
            ? parseInt(entity.slice(2), 16)
            : parseInt(entity.slice(1), 10);

        return Number.isFinite(code)
          ? String.fromCodePoint(code)
          : match;
      }

      return (
        NAMED_ENTITIES[entity.toLowerCase()] ??
        match
      );
    }
  );
}

export function stripHtml(
  value?: string | null
): string {
  if (!value) {
    return "";
  }

  // Plain text with no tags or entities: return untouched.
  if (!/[<&]/.test(value)) {
    return value;
  }

  const text = value
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(
      /<\/(p|div|li|h[1-6]|blockquote|tr)>/gi,
      "\n"
    )
    .replace(/<[^>]+>/g, "");

  return decodeEntities(text)
    .replace(/[ \t ]+/g, " ")
    .split("\n")
    .map(line => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
