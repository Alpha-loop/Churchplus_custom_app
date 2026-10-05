import moment from "moment";

// The backend's `date` field isn't reliably a timestamp — feed posts
// often carry a relative string the server already wrote, like
// "2 years ago" or "one year ago" (confirmed from raw API responses).
//
// This used to call moment(date) on whatever it was given. For a
// string that isn't ISO 8601 / RFC 2822, moment doesn't give up: it
// falls back to the JavaScript Date parser and logs a deprecation
// warning ("value provided is not in a recognized RFC2822 or ISO
// format…"), once per session — that was the error on the Home
// screen. It also meant the outcome depended on how the JS engine
// happens to read arbitrary text.
//
// Strings are now parsed strictly as ISO 8601 / RFC 2822 only, with
// no fallback. Anything else is, by definition, already a display
// string and is shown exactly as received.
const ACCEPTED_FORMATS = [
  moment.ISO_8601,
  moment.RFC_2822,
];

export const formatDevotionalDate = (
  date?: string,
  formatPattern = "MMM D, YYYY"
) => {
  if (!date) {
    return "";
  }

  const value: unknown = date;

  // A real Date or a numeric timestamp never goes through string
  // parsing, so moment handles it without any fallback or warning.
  const parsed =
    typeof value === "string"
      ? moment(
          value.trim(),
          ACCEPTED_FORMATS,
          true
        )
      : moment(value as any);

  if (parsed.isValid()) {
    return parsed.format(
      formatPattern
    );
  }

  // Already a display string (e.g. "one year ago") — use as-is.
  return date;
};