// contextType/contextId/contextLabel let a note point back to
// whatever it was written about, without the notes feature
// itself needing to know the details of each module.
//
// contextRoute is the generic "jump back" mechanism: the exact
// React Navigation route name + params the note was written
// from, so tapping the note reopens that same screen with no
// per-module logic needed in MyNotesScreen. A new module only
// has to pass its own route when saving a note. Bible notes
// created before this existed don't have one — MyNotesScreen
// falls back to parsing their contextId ("book|chapter") instead.
export type NoteContextType =
  | "bible"
  | "devotional"
  | "message"
  | "community"
  | "general";

export interface NoteContextRoute {
  name: string;

  params?: any;
}

export interface Note {
  id: string;

  title: string;

  content: string;

  contextType: NoteContextType;

  contextId?: string;

  contextLabel?: string;

  contextRoute?: NoteContextRoute;

  createdAt: string;

  updatedAt: string;
}
