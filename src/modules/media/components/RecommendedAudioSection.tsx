import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  AudioMedia,
} from "../types/media.types";

import AudioCard from "./AudioCard";

interface Props {
  audios: AudioMedia[];

  loading?: boolean;

  onPress: (
    audio: AudioMedia
  ) => void;
}

export default function RecommendedAudioSection({
  audios,
  loading,
  onPress,
}: Props) {
  if (loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Recommended
      </Text>

      <FlatList
        data={audios}
        keyExtractor={item =>
          item.id
        }
        renderItem={({
          item,
        }) => (
          <AudioCard
            audio={item}
            onPress={onPress}
          />
        )}
        numColumns={2}
        contentContainerStyle={{
          rowGap: 15,
        }}
        columnWrapperStyle={{
          justifyContent:
            "space-between",
        }}
        scrollEnabled={
          false
        }
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      backgroundColor:
        "#F6F6F6",

      padding: 15,

      marginTop: 25,
    },

    title: {
      fontSize: 15,

      fontWeight:
        "700",

      color:
        "#000",

      marginBottom: 10,
    },
  });