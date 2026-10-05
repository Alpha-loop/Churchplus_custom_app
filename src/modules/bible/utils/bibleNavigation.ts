import {
  NEW_TESTAMENT,
  OLD_TESTAMENT,
} from "../data/books";

const BOOKS = [
  ...OLD_TESTAMENT,
  ...NEW_TESTAMENT,
];

export function getAdjacentChapter(
  currentBook: string,
  currentChapter: number,
  direction: "next" | "previous"
) {
  const index = BOOKS.findIndex(
    book =>
      book.name.toLowerCase() ===
      currentBook.toLowerCase()
  );

  if (index === -1) return null;

  const book = BOOKS[index];

  if (direction === "next") {
    if (currentChapter < book.chapters) {
      return {
        book: book.name,
        chapter: currentChapter + 1,
      };
    }

    if (index < BOOKS.length - 1) {
      return {
        book: BOOKS[index + 1].name,
        chapter: 1,
      };
    }

    return null;
  }

  if (currentChapter > 1) {
    return {
      book: book.name,
      chapter: currentChapter - 1,
    };
  }

  if (index > 0) {
    const previousBook =
      BOOKS[index - 1];

    return {
      book: previousBook.name,
      chapter: previousBook.chapters,
    };
  }

  return null;
}
