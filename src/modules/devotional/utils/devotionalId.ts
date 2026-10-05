// The devotionals API identifies a devotional by `postId`; there is
// no `id` field in the response at all (confirmed from a real
// payload — see the note on the Devotional type). Anything keyed on
// `devotion.id` therefore got `undefined` for every devotional:
//
//   - React lists warned about missing keys,
//   - bookmarking one devotional marked EVERY devotional as saved
//     (they all shared the id `undefined`) and wrote `[null]` to
//     disk, so nothing stayed saved after a restart.
//
// Everything that needs a devotional's identity goes through this
// one function so they can't drift apart again. Always returns a
// non-empty string.
export const getDevotionalId = (
  devotion: any
): string => {
  // First candidate that actually holds a value. `??` alone would
  // stop at a blank postId and never try id.
  for (const candidate of [
    devotion?.postId,
    devotion?.id,
  ]) {
    if (
      candidate !== undefined &&
      candidate !== null &&
      String(candidate).trim() !== ""
    ) {
      return String(candidate);
    }
  }

  // Neither field present (a differently-shaped item, e.g. from
  // another endpoint): date + title is stable per devotional, so a
  // key or bookmark still never collapses to undefined.
  return `${devotion?.date ?? ""}|${
    devotion?.title ?? ""
  }`;
};
