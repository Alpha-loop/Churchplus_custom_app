import { useState } from "react";

import * as Speech from "expo-speech";

export default function useBibleSpeech() {
  const [
    isSpeaking,
    setIsSpeaking,
  ] = useState(false);

  const play = (
    text: string
  ) => {
    Speech.stop();

    setIsSpeaking(true);

    Speech.speak(text, {
      rate: 0.9,

      onDone: () =>
        setIsSpeaking(false),

      onStopped: () =>
        setIsSpeaking(false),

      onError: () =>
        setIsSpeaking(false),
    });
  };

  const stop = () => {
    Speech.stop();

    setIsSpeaking(false);
  };

  return {
    isSpeaking,
    play,
    stop,
  };
}
