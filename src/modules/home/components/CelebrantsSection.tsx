import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import CelebrantItem from "./CelebrantItem";

import {
  Celebrant,
} from "../types/home.types";

interface Props {
  celebrants: Celebrant[];
}

export default function CelebrantsSection({
  celebrants,
}: Props) {
  if (
    !celebrants ||
    celebrants.length === 0
  ) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
      >
        Upcoming Celebrant
      </Text>

      <FlatList
        horizontal
        data={celebrants}
        keyExtractor={(
          _,
          index
        ) =>
          index.toString()
        }
        showsHorizontalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.list
        }
        renderItem={({
          item,
        }) => (
          <CelebrantItem
            celebrant={item}
            allCelebrants={
              celebrants
            }
          />
        )}
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginTop: 20,

      paddingHorizontal:
        16,
    },

    title: {
      fontSize: 15,

      fontWeight: "800",

      color: "#041395",

      marginBottom: 10,
    },

    list: {
      gap: 10,
    },
  });