import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Headphones,
  Video,
} from "lucide-react-native";

const { width } =
  Dimensions.get(
    "window"
  );

interface Props {
  onVideosPress: () => void;

  onAudiosPress: () => void;
}

export default function MediaCategoryButtons({
  onVideosPress,

  onAudiosPress,
}: Props) {
  return (
    <View
      style={styles.container}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={
          onVideosPress
        }
      >
        <View
          style={
            styles.content
          }
        >
          <Video
            size={20}
          />

          <Text
            style={
              styles.text
            }
          >
            Videos
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={
          onAudiosPress
        }
      >
        <View
          style={
            styles.content
          }
        >
          <Headphones
            size={20}
          />

          <Text
            style={
              styles.text
            }
          >
            Audios
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flexDirection:
        "row",

      justifyContent:
        "space-between",

      marginHorizontal: 15,

      marginTop: 10,
    },

    button: {
      width:
        width / 2 - 22,

      backgroundColor:
        "#B2D4ED",

      borderWidth: 1,

      borderColor:
        "#0000001A",

      borderRadius: 10,

      paddingVertical: 7,
    },

    content: {
      flexDirection:
        "row",

      alignItems:
        "center",

      justifyContent:
        "center",

      gap: 6,
    },

    text: {
      fontSize: 16,

      fontWeight: "600",

      color: "#000",
    },
  });