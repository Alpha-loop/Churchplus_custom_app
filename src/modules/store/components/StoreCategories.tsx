import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  StoreAudioIcon,
  StoreBookIcon,
  StoreVideoIcon,
} from "@/assets/img/icons";

import {
  StoreCategory,
} from "../types/store.types";

interface Props {
  categories: StoreCategory[];

  onCategoryPress: (
    category: StoreCategory
  ) => void;
}

export default function StoreCategories({
  categories,
  onCategoryPress,
}: Props) {
  return (
    <>
      <Text
        style={styles.title}
      >
        Category
      </Text>

      <View
        style={styles.container}
      >
        {categories.map(
          category => (
            <TouchableOpacity
              key={
                category.id
              }
              onPress={() =>
                onCategoryPress(
                  category
                )
              }
            >
              <View
                style={
                  styles.button
                }
              >
                {category.type ===
                "video" ? (
                  <StoreVideoIcon color size />
                ) : category.type ===
                  "audio" ? (
                  <StoreAudioIcon color size />
                ) : (
                  <StoreBookIcon color size/>
                )}

                <Text
                  style={
                    styles.text
                  }
                >
                  {
                    category.name
                  }
                </Text>
              </View>
            </TouchableOpacity>
          )
        )}
      </View>
    </>
  );
}

const styles =
  StyleSheet.create({
    title: {
      marginTop: 20,

      fontWeight: "600",
    },

    container: {
      flexDirection:
        "row",

      gap: 10,

      marginTop: 10,
    },

    button: {
      flexDirection:
        "row",

      alignItems:
        "center",

      gap: 8,

      paddingHorizontal:
        15,

      paddingVertical:
        10,

      borderWidth: 1,

      borderColor:
        "#0000001A",

      borderRadius: 10,
    },

    text: {
      color:
        "#51618C",
    },
  });