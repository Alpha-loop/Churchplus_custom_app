import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  navigation: any;
  data: any;
  videoDetails: any[];
}

export default function TrendingMessageCard({
  navigation,
  data,
  videoDetails,
}: Props) {
  return (
    <TouchableOpacity
      style={{
        width: 140,
        marginRight: 12,
      }}
      onPress={() =>
        navigation.navigate(
          "ViewVideoDetails",
          {
            data,
            videoDetails,
          }
        )
      }
    >
      <Image
        source={{
          uri: data.thumbnailUrl,
        }}
        resizeMode="cover"
        style={{
          width: "100%",
          height: 130,
          borderRadius: 6,
        }}
      />

      {/* <Text
        numberOfLines={2}
        style={{
          marginTop: 8,
          fontSize: 14,
          fontWeight: "600",
        }}
      >
        {data.title}
      </Text> */}
    </TouchableOpacity>
  );
}