import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  category: string;

  imagePath?: string;

  onPress: () => void;
}

export default function AudioCategoryCard({
  category,
  imagePath,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View>
        <Image
          source={{
            uri:
              imagePath ||
              "https://via.placeholder.com/80",
          }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 10,
          }}
        />

        <Text
          style={{
            width: 80,
            marginTop: 5,
            fontSize: 11,
          }}
        >
          {category}
        </Text>
      </View>
    </TouchableOpacity>
  );
}