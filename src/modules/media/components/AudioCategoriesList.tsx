import {
  FlatList,
} from "react-native";

import AudioCategoryCard
from "./AudioCategoryCard";

interface Props {
  categories: any[];

  allAudios: any[];

  onPress: (
    category: string
  ) => void;
}

export default function AudioCategoriesList({
  categories,
  onPress,
}: Props) {
  return (
    <FlatList
      horizontal
      data={categories}
      keyExtractor={item =>
        item.category
      }
      renderItem={({
        item,
      }) => (
        <AudioCategoryCard
          category={
            item.category
          }
          imagePath={
            item.imagePath
          }
          onPress={() =>
            onPress(
              item.category
            )
          }
        />
      )}
      showsHorizontalScrollIndicator={
        false
      }
    />
  );
}