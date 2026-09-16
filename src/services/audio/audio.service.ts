import {
  Audio,
} from "expo-av";

import {
  AudioTrack,
} from "../../types/audio/audio.types";

let sound:
  | Audio.Sound
  | null = null;

export async function setupAudioPlayer() {
  await Audio.setAudioModeAsync({
    staysActiveInBackground: true,

    playsInSilentModeIOS: true,

    shouldDuckAndroid: true,
  });
}

export async function playTrack(
  track: AudioTrack
) {
  try {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } =
      await Audio.Sound.createAsync(
        {
          uri: track.url,
        },
        {
          shouldPlay: true,
        }
      );

    sound = newSound;

    return sound;
  } catch (error) {
    console.log(
      "Play Track Error:",
      error
    );
  }
}

export async function pauseTrack() {
  try {
    if (sound) {
      await sound.pauseAsync();
    }
  } catch (error) {
    console.log(
      "Pause Error:",
      error
    );
  }
}

export async function resumeTrack() {
  try {
    if (sound) {
      await sound.playAsync();
    }
  } catch (error) {
    console.log(
      "Resume Error:",
      error
    );
  }
}

export async function stopTrack() {
  try {
    if (sound) {
      await sound.stopAsync();
    }
  } catch (error) {
    console.log(
      "Stop Error:",
      error
    );
  }
}

export async function seekTrack(
  position: number
) {
  try {
    if (sound) {
      await sound.setPositionAsync(
        position
      );
    }
  } catch (error) {
    console.log(
      "Seek Error:",
      error
    );
  }
}

export async function unloadTrack() {
  try {
    if (sound) {
      await sound.unloadAsync();

      sound = null;
    }
  } catch (error) {
    console.log(
      "Unload Error:",
      error
    );
  }
}