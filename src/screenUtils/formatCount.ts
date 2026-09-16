// Formats a raw count into "1.2K" style short form. Shared so
// every card (Home's media card, Media screen's trending cards,
// etc.) displays view counts the same way instead of each writing
// its own version.
export const formatCount = (
  count?: string | number
) => {
  const n = Number(count);

  if (!n) {
    return null;
  }

  if (n >= 1000) {
    return `${(n / 1000).toFixed(1)}K`;
  }

  return `${n}`;
};