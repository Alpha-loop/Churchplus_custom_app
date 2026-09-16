import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Image } from "expo-image";

import {
  ChurchPastor,
} from "../types/onboarding.types";
import { useCallback } from "react";

interface Props {
  pastors: ChurchPastor[];
}


// const PastorCard = (item: any) => {
//   return(
    
//   )
// }

export default function PastorGrid({
  pastors,
}: Props) {

  // const renderItem = useCallback(
  //   ({ item } : any) => (
  //       <PastorCard pastor={item} />
  //   ),
  //   []
  // );
  if (
    pastors.length === 0
  ) {
    return (
      <Text
        style={styles.empty}
      >
        No pastors yet
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      {pastors.map((item, index) => {
        return(
          <View
            style={styles.card}
            key={`${item.name}-${index}`}
          >
            <Image
              source={
                  item.photoUrl ||
                  null
              }
              cachePolicy="memory-disk"
              contentFit="cover"
              transition={150}
              style={styles.image}
            />

            <Text style={styles.name}>
              {item.name}
            </Text>
          </View>
        )
      })} 
    </View>
  );
}

const styles =
  StyleSheet.create({
    row: {
      justifyContent:
        "space-between",
    },

    card: {
      marginTop: 20,
      width: "48%",
    },

    image: {
      width: "100%",
      height: 170,
      borderRadius: 10,
    },

    name: {
      marginTop: 10,
      fontWeight:
        "700",
      fontSize: 11,
    },

    empty: {
      marginTop: 15,
    },
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: 20,
    },
  });