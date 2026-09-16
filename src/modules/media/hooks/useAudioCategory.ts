import {
  useMemo,
} from "react";

export default function useAudioCategory(
  category:
    string,
  allAudios:
    any[]
) {
  const audios =
    useMemo(
      () =>
        allAudios.filter(
          item =>
            item.category ===
            category
        ),
      [
        category,
        allAudios,
      ]
    );

  return {
    audios,
  };
}