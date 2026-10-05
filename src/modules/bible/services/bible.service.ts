import axios from "axios";

// bible-api.com — free, public, no API key required. Confirmed
// from light_call_app's own working implementation, not
// something assumed. This is a separate axios instance from
// apiClient.ts on purpose — this is a third-party public API,
// not this church's own backend, so it has no auth header and no
// tenant-scoped baseURL.
const bibleClient = axios.create({
  baseURL: "https://bible-api.com",
});

export const getChapter = async (
  book: string,
  chapter: number,
  version: string
) => {
  const response = await bibleClient.get(
    `/${encodeURIComponent(
      `${book} ${chapter}`
    )}`,
    {
      params: {
        translation: version,
      },
    }
  );

  return response.data;
};
