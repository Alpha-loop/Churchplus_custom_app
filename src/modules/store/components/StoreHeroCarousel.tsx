import {
  FlatList,
  Image,
  StyleSheet,
} from "react-native";

interface Props {
  banners: {
    id: string;
  }[];
}

export default function StoreHeroCarousel({
  banners,
}: Props) {
  return (
    <FlatList
      horizontal
      data={banners}
      keyExtractor={
        item => item.id
      }
      renderItem={() => (
        <Image
          source={require("@/assets/img/storehero.png")}
          resizeMode="contain"
          style={
            styles.image
          }
        />
      )}
      contentContainerStyle={{
        gap: 8,
      }}
      showsHorizontalScrollIndicator={
        false
      }
    />
  );
}

const styles =
  StyleSheet.create({
    image: {
      width: 320,

      height: 160,
    },
  });