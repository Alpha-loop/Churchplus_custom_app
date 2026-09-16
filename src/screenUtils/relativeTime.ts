// Small local equivalent of the old codebase's
// `dateFormatter.relativeDate` — no such shared utility exists in
// this codebase yet. Used anywhere a Modern card needs a "2 hours
// ago" / "5 days ago" style timestamp.
export const relativeTime = (
  iso?: string
) => {
  if (!iso) {
    return "";
  }

  const diffMs =
    Date.now() -
    new Date(iso).getTime();

  const minutes = Math.floor(
    diffMs / 60000
  );

  if (minutes < 60) {
    return `${Math.max(minutes, 1)}m ago`;
  }

  const hours = Math.floor(
    minutes / 60
  );

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(
    hours / 24
  );

  return `${days}d ago`;
};