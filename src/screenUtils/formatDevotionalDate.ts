import moment from "moment";

// The backend's devotional `date` field isn't reliably an ISO
// timestamp — it's sometimes already a relative string like "one
// year ago" (confirmed from a raw API response). moment() can't
// parse that, producing "Invalid Date". This checks validity first
// and falls back to showing the raw value as-is rather than
// mangling it.
export const formatDevotionalDate = (
  date?: string,
  formatPattern = "MMM D, YYYY"
) => {
  if (!date) {
    return "";
  }

  const parsed = moment(date);

  if (parsed.isValid()) {
    return parsed.format(
      formatPattern
    );
  }

  // Already a display string (e.g. "one year ago") — use as-is.
  return date;
};