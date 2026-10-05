export type Testament = "old" | "new";

export interface BibleBook {
  id: string;
  name: string;
  testament: Testament;
  chapters: number;
}

export interface BibleVerse {
  verse: number;
  text: string;
}

export interface BibleChapter {
  reference: string;
  verses: BibleVerse[];
}

export interface BibleVersion {
  id: string;
  abbreviation: string;
  name: string;
}
