export type OfficeItem = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string | null;
  url: string | null;
};

// The backend returns unset text fields as the literal string "null".
export const cleanText = (
  value?: string | null
): string => {
  const text =
    typeof value === "string"
      ? value.trim()
      : "";

  return text &&
    text.toLowerCase() !== "null" &&
    text.toLowerCase() !== "undefined"
    ? text
    : "";
};

// Short call-to-action under each title, picked from the form's
// name. Anything unrecognised gets a neutral one.
const SUBTITLE_RULES: [RegExp, string][] = [
  [/prayer/i, "REACH OUT"],
  [/counsel|appointment|visit/i, "BOOK NOW"],
  [/first.?timer|new here|i.?m new|visitor/i, "LEARN MORE"],
  [/convert|salvation|commit/i, "TAKE THE STEP"],
  [/testimon/i, "SHARE YOURS"],
  [/volunteer|serve|workforce/i, "COME SERVE"],
  [/group|cell|fellowship/i, "JOIN NOW"],
  [/lead|harvest/i, "GET IN TOUCH"],
];

export const subtitleFor = (
  name: string
): string => {
  for (const [rule, label] of SUBTITLE_RULES) {
    if (rule.test(name)) {
      return label;
    }
  }

  return "OPEN FORM";
};

// Builds the screen's cards from the church profile's `forms`
// (the same list Home and Community read). Inactive forms are
// dropped; order is kept as the backend sent it.
export const buildOfficeItems = (
  forms: any[] | null | undefined
): OfficeItem[] =>
  (Array.isArray(forms) ? forms : [])
    .filter(
      form =>
        form &&
        form.isActive !== false &&
        cleanText(form.name)
    )
    .map((form, index) => {
      const title = cleanText(form.name);

      return {
        id:
          cleanText(form.id) ||
          `${title}-${index}`,
        title,
        subtitle: subtitleFor(title),
        imageUrl:
          cleanText(form.pictureUrl) ||
          null,
        url: cleanText(form.url) || null,
      };
    });
