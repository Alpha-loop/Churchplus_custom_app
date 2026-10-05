import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getNotes,
  createNote,
  updateNote as updateNoteRequest,
  deleteNote as deleteNoteRequest,
} from "../services/notes.services";

import { useAuthStore } from "@/store/authStore";

import {
  Note,
  NoteContextRoute,
  NoteContextType,
} from "../types";

// Real notes now come from the backend (see notes.service.ts) —
// content, title, and id are genuinely synced. What's NOT
// confirmed to exist on this backend's note schema is any
// concept of app-side "context" (e.g. which Bible chapter a note
// is about), so that part stays in this small local map instead
// of being sent to the server. Practical effect: the note's real
// text/title is synced across devices; the "which chapter to
// jump back to" shortcut is device-local only.
const CONTEXT_MAP_KEY =
  "notes-context-map";

type ContextMap = Record<
  string,
  {
    contextType: NoteContextType;
    contextId?: string;
    contextLabel?: string;
    contextRoute?: NoteContextRoute;
  }
>;

const DEFAULT_TITLE = "Note";

export default function useNotes() {
  // Was state.user?.userId — confirmed directly from a real
  // login response that userId and personId are genuinely
  // different values on this backend. authStore's user object
  // stores the whole raw login response as-is (see
  // useLogin.ts), so personId was already sitting right there,
  // just never read.
  const personId = useAuthStore(
    state => state.user?.personId
  );

  const token = useAuthStore(
    state => state.accessToken
  );

  const [
    notes,
    setNotes,
  ] = useState<Note[]>([]);

  const [
    contextMap,
    setContextMap,
  ] = useState<ContextMap>({});

  const [
    loaded,
    setLoaded,
  ] = useState(false);

  const loadContextMap =
    async () => {
      try {
        const raw = await AsyncStorage.getItem(
          CONTEXT_MAP_KEY
        );

        return raw
          ? JSON.parse(raw)
          : {};
      } catch {
        return {};
      }
    };

  const saveContextMap = async (
    map: ContextMap
  ) => {
    setContextMap(map);

    try {
      await AsyncStorage.setItem(
        CONTEXT_MAP_KEY,
        JSON.stringify(map)
      );
    } catch (error) {
      console.log(
        "NOTES CONTEXT MAP SAVE ERROR:",
        error
      );
    }
  };

  const fetchRawNotes = async (
    map: ContextMap
  ) => {
    const response = await getNotes(
      personId!,
      token
    );

    const rawNotes: any[] =
      response?.object ??
      response?.data ??
      response ??
      [];

    const mapped: Note[] = rawNotes.map(
      (item: any) => {
        const context =
          map[item.id] ?? {};

        return {
          id: item.id,

          title:
            item.title ??
            DEFAULT_TITLE,

          content:
            item.note ??
            item.content ??
            "",

          contextType:
            context.contextType ??
            "general",

          contextId:
            context.contextId,

          contextLabel:
            context.contextLabel,

          contextRoute:
            context.contextRoute,

          createdAt:
            item.createdAt ??
            item.dateCreated ??
            new Date().toISOString(),

          updatedAt:
            item.updatedAt ??
            item.dateModified ??
            item.createdAt ??
            new Date().toISOString(),
        };
      }
    );

    return mapped;
  };

  const refresh = async () => {
    if (!personId) {
      return;
    }

    try {
      const map = await loadContextMap();

      setContextMap(map);

      const mapped = await fetchRawNotes(
        map
      );

      setNotes(mapped);

      return mapped;
    } catch (error: any) {
      console.log(
        "NOTES LOAD ERROR:",
        error?.response?.status,

        error?.response?.data ??
          error?.message
      );

      return [];
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    refresh();
  }, [personId]);

  const addNote = async (
    content: string,
    contextType: NoteContextType = "general",
    contextId?: string,
    contextLabel?: string,
    contextRoute?: NoteContextRoute
  ) => {
    if (!personId) {
      return null;
    }

    const title =
      contextLabel ||
      DEFAULT_TITLE;

    try {
      await createNote(
        {
          title,

          note: content,

          personId,
        },
        token
      );

      // The real create response doesn't return the new note's
      // id (confirmed: object: false), so the only way to attach
      // local context to the right note is to refetch and match
      // on title+content among notes not already in the context
      // map — a reasonable heuristic given what the API actually
      // gives back, not a guess made up from nothing.
      const freshNotes = await fetchRawNotes(
        contextMap
      );

      setNotes(freshNotes);

      if (contextType !== "general") {
        const match = freshNotes.find(
          note =>
            !contextMap[note.id] &&
            note.title === title &&
            note.content === content
        );

        if (match) {
          const nextMap = {
            ...contextMap,

            [match.id]: {
              contextType,

              contextId,

              contextLabel,

              contextRoute,
            },
          };

          await saveContextMap(
            nextMap
          );

          setNotes(
            freshNotes.map(
              note =>
                note.id ===
                match.id
                  ? {
                      ...note,

                      contextType,

                      contextId,

                      contextLabel,

                      contextRoute,
                    }
                  : note
            )
          );
        }
      }

      return true;
    } catch (error: any) {
      console.log(
        "NOTE CREATE ERROR:",
        error?.response?.status,

        error?.response?.data ??
          error?.message
      );

      return null;
    }
  };

  const updateNote = async (
    id: string,
    content: string
  ) => {
    if (!personId) {
      return;
    }

    // Resend this note's own existing title unchanged — the
    // editor only edits body text, not the title, so there's
    // nothing else to send for it.
    const existing = notes.find(
      note => note.id === id
    );

    try {
      await updateNoteRequest(
        id,
        {
          title:
            existing?.title ??
            DEFAULT_TITLE,

          note: content,

          personId,
        },
        token
      );

      await refresh();
    } catch (error: any) {
      console.log(
        "NOTE UPDATE ERROR:",
        error?.response?.status,

        error?.response?.data ??
          error?.message
      );
    }
  };

  const deleteNote = async (
    id: string
  ) => {
    try {
      await deleteNoteRequest(
        id,
        token
      );

      if (contextMap[id]) {
        const nextMap = {
          ...contextMap,
        };

        delete nextMap[id];

        await saveContextMap(
          nextMap
        );
      }

      await refresh();
    } catch (error: any) {
      console.log(
        "NOTE DELETE ERROR:",
        error?.response?.status,

        error?.response?.data ??
          error?.message
      );
    }
  };

  const getNotesForContext = (
    contextType: NoteContextType,
    contextId?: string
  ) =>
    notes.filter(
      note =>
        note.contextType ===
          contextType &&
        (contextId
          ? note.contextId ===
            contextId
          : true)
    );

  return {
    notes,

    loaded,

    addNote,

    updateNote,

    deleteNote,

    getNotesForContext,

    refresh,
  };
}
