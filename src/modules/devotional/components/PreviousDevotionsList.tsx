import {
  FlatList,
  Text,
  View,
} from "react-native";

import PreviousDevotionCard
from "./PreviousDevotionCard";

import { Devotional }
from "../types/devotional.types";

interface Props {
  devotionals:
    Devotional[];

  onPress: (
    devotion: Devotional
  ) => void;
}

export default function PreviousDevotionsList({
  devotionals,
  onPress,
}: Props) {
  return (
    <View
      style={{
        padding: 15,
      }}
    >
      <Text
        style={{
          fontSize: 15,
          fontWeight:
            "600",
          marginBottom:
            15,
        }}
      >
        Previous devotions
      </Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
        data={
          devotionals
        }
        keyExtractor={
          // Devotional type declares `id`, but the real API
          // response uses `postId` (confirmed from the actual
          // devotionals response) — item.id was always undefined,
          // so every item's key collapsed to the same value,
          // producing the "duplicate key" warning.
          item =>
            item.postId ??
            item.id
        }
        renderItem={({
          item,
        }) => (
          <PreviousDevotionCard
            devotion={
              item
            }
            onPress={
              onPress
            }
          />
        )}
      />
    </View>
  );
}