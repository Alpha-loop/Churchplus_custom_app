import { api } from "@/services/apiClient";

// Confirmed real schema from the actual Scalar docs (screenshots
// checked directly) — this replaces the earlier guessed shape,
// which used personID/content and was missing two required
// fields (title, type) entirely, causing 400s on create.
//
// GET  /portal/Profile/{personId}/notes
//   -> { status, message, object: Note[] }
//
// POST /portal/Profile/notes
//   body: { title, note, personId, type }
//   -> { status, message, object: false }  — does NOT return the
//      created note's id, confirmed from the real response.
//
// PUT/DELETE /portal/Profile/notes/{noteId} — same body shape as
// POST for PUT; not yet confirmed against a real response, so if
// either of these still errors, that's the next thing to check
// in Scalar specifically.
//
// "type" is required but its meaning isn't documented anywhere
// visible — the real example request used 1, so this app always
// sends 1 too. If a real meaning turns up later (a category
// picker, say), this is the one field that would need surfacing
// in the UI.
const DEFAULT_NOTE_TYPE = 1;

export const getNotes = async (
  personId: string,
  token: string | null
) => {
  const response = await api.get(
    `/portal/Profile/${personId}/notes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const createNote = async (
  payload: {
    title: string;
    note: string;
    personId: string;
  },
  token: string | null
) => {
  const response = await api.post(
    "/portal/Profile/notes",
    {
      ...payload,

      type: DEFAULT_NOTE_TYPE,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateNote = async (
  noteId: string,
  payload: {
    title: string;
    note: string;
    personId: string;
  },
  token: string | null
) => {
  const response = await api.put(
    `/portal/Profile/notes/${noteId}`,
    {
      ...payload,

      type: DEFAULT_NOTE_TYPE,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteNote = async (
  noteId: string,
  token: string | null
) => {
  const response = await api.delete(
    `/portal/Profile/notes/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};