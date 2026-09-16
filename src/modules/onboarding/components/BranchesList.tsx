import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  ChurchBranch,
} from "../types/onboarding.types";

interface Props {
  branches:
    ChurchBranch[];
}

export default function BranchesList({
  branches,
}: Props) {
  if (
    branches.length === 0
  ) {
    return (
      <Text
        style={styles.empty}
      >
        No branches yet
      </Text>
    );
  }

  return (
    <>
      {branches.map(
        (
          branch,
          index
        ) => (
          <View
            key={index}
            style={
              styles.card
            }
          >
            <Text
              style={
                styles.title
              }
            >
              {
                branch.branchName
              }
            </Text>

            <Text
              style={
                styles.address
              }
            >
              {
                branch.address
              }
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

    title: {
      fontWeight:
        "700",

      marginTop: 10,
    },

    address: {
      marginTop: 10,
    },

    empty: {
      marginTop: 15,
    },
  });