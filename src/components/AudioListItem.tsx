import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";

import {
  Music,
  MoreVertical,
} from "lucide-react-native";

import { AudioMedia } from "@/modules/media/types/media.types";

import { useTheme } from "@/theme/ThemeContext";

interface Props {
  audio: AudioMedia;

  onPress: () => void;
}

export default function AudioListItem({
  audio,
  onPress,
}: Props) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.row}
    >
      {audio.imagePath ? (
        <Image
              cachePolicy="memory-disk"
          source={{
            uri: audio.imagePath,
          }}
          style={styles.thumb}
        />
      ) : (
        <View
          style={[
            styles.thumb,
            styles.thumbPlaceholder,
            { backgroundColor: colors.placeholder },
          ]}
        >
          <Music
            size={18}
            color="#FFFFFF"
          />
        </View>
      )}

      <View style={styles.body}>
        <Text
          style={[
            styles.title,
            { color: colors.textPrimary },
          ]}
          numberOfLines={1}
        >
          {audio.name}
        </Text>

        <Text
          style={[
            styles.subtitle,
            { color: colors.textMuted },
          ]}
          numberOfLines={1}
        >
          {audio.category}
        </Text>
      </View>

      <MoreVertical
        size={18}
        color={colors.textMuted}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,

    paddingVertical: 10,
  },

  thumb: {
    width: 48,

    height: 48,

    borderRadius: 10,
  },

  thumbPlaceholder: {
    alignItems: "center",

    justifyContent: "center",
  },

  body: {
    flex: 1,
  },

  title: {
    fontSize: 14,

    fontWeight: "600",
  },

  subtitle: {
    fontSize: 12,

    marginTop: 2,
  },
});