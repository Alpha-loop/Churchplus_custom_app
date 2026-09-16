export interface Devotional {
  id: string;

  // The real API response uses postId, not id (id isn't actually
  // present in the response at all — confirmed from a real
  // devotionals payload). Added rather than replacing `id` since
  // nothing else in the codebase currently reads `.id` directly,
  // but removing it outright wasn't necessary to fix the bug.
  postId?: string;

  title: string;

  bibleVerse?: string;

  memoryVerse?: string;

  content: string;

  mediaUrl?: string;

  author?: string;

  date: string;
}