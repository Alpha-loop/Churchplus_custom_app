import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  GivingSummary,
} from "../types/giving.types";

interface Props {
  summary: GivingSummary;
}

export default function GivingSummaryCard({
  summary,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        Giving Summary
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>
          Purpose
        </Text>

        <Text style={styles.value}>
          {summary.option}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.label}>
          Amount
        </Text>

        <Text style={styles.value}>
          NGN {summary.amount}
        </Text>
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    card: {
      margin: 20,

      padding: 20,

      borderRadius: 20,

      borderWidth: 1,

      borderColor:
        "#EEEEEE",
    },

    title: {
      textAlign:
        "center",

      fontSize: 16,

      fontWeight:
        "700",

      color:
        "#124191",

      marginBottom: 20,
    },

    row: {
      flexDirection:
        "row",

      justifyContent:
        "space-between",
    },

    divider: {
      height: 1,

      backgroundColor:
        "#EEEEEE",

      marginVertical:
        12,
    },

    label: {
      fontWeight:
        "700",
    },

    value: {
      fontWeight:
        "500",
    },
  });