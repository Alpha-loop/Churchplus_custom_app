import {
  FlatList,
} from "react-native";

import AudioCard
from "./AudioCard";

import {
  AudioMedia,
} from "../types/media.types";

interface Props {
  audios:
    AudioMedia[];

  onPress:
    (
      audio:
        AudioMedia
    ) => void;
}

export default function AudioGrid({
  audios,
  onPress,
}: Props) {
  return (
    <FlatList
      data={audios}
      keyExtractor={
        item => item.id
      }
      numColumns={2}
      renderItem={({
        item,
      }) => (
        <AudioCard
          audio={item}
          onPress={
            onPress
          }
        />
      )}
      columnWrapperStyle={{
        justifyContent:
          "space-between",
      }}
      contentContainerStyle={{
        gap: 15,
      }}
    />
  );
}