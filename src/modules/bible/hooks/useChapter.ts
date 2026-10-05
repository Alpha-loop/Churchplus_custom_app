import { useEffect, useState } from "react";

import { getChapter } from "../services/bible.service";

import { BibleChapter } from "../types";

export default function useChapter(
  book: string,
  chapter: number,
  version: string
) {
  const [
    data,
    setData,
  ] = useState<BibleChapter | null>(
    null
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(false);

  useEffect(() => {
    if (!book || !chapter) {
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);

        setError(false);

        const result = await getChapter(
          book,
          chapter,
          version
        );

        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        console.log(
          "BIBLE CHAPTER ERROR:",
          err
        );

        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [book, chapter, version]);

  return {
    data,
    loading,
    error,
  };
}
