import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  ChurchPastor,
} from "../types/onboarding.types";

interface Props {
  pastors:
    ChurchPastor[];
}

export default function BiosList({
  pastors,
}: Props) {
  if (
    pastors.length === 0
  ) {
    return (
      <Text
        style={styles.empty}
      >
        No bios yet
      </Text>
    );
  }

  return (
    <>
      {pastors.map(
        (
          pastor,
          index
        ) => (
          <View
            key={index}
            style={
              styles.card
            }
          >
            <Text>
              {pastor.bio ||
                "No bio available"}
            </Text>
          </View>
        )
      )}
    </>
  );
}

const styles =
  StyleSheet.create({
    card: {
      backgroundColor:
        "#D9D9D933",

      borderWidth: 1,

      borderColor:
        "#0000001A",

      marginTop: 20,

      padding: 10,
    },

    empty: {
      marginTop: 15,
    },
  });