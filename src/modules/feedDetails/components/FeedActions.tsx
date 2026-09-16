import {
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Heart,
  Share2,
} from "lucide-react-native";

interface Props {
  title: string;

  isLiked: boolean;

  onLike: () => void;

  handleShare: () => void;
}

export default function FeedActions({
  title,

  isLiked,

  onLike,

  handleShare
}: Props) {
  // const handleShare =
  //   async () => {
  //     await Share.share({
  //       message: title,
  //     });
  //   };

  return (
    <View
      style={
        styles.container
      }
    >
      <TouchableOpacity
        onPress={
          handleShare
        }
      >
        <Share2
          size={24}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onLike}
      >
        <Heart
          size={24}
          fill={
            isLiked
              ? "red"
              : "none"
          }
        />
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
        "flex-end",

      gap: 20,

      paddingHorizontal:
        15,
    },
  });