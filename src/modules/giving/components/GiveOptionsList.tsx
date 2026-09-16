import {
  StyleSheet,
  View,
} from "react-native";

import GiveCard from "./GiveCard";

import {
  GiveCardItem,
} from "../types/give.types";

interface Props {
  giveCards: GiveCardItem[];

  onCardPress: (
    index: number
  ) => void;
}

export default function GiveOptionsList({
  giveCards,

  onCardPress,
}: Props) {
  if (
    !giveCards ||
    giveCards.length === 0
  ) {
    return null;
  }

  return (
    <View
      style={styles.container}
    >
      {giveCards.map(
        (
          item,
          index
        ) => (
          <GiveCard
            key={`${item.header}-${index}`}
            index={index}
            title={item.header}
            subtitle={
              item.subText
            }
            icon={item.icon}
            selected={
              item.selected
            }
            onPress={() =>
              onCardPress(
                index
              )
            }
          />
        )
      )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginTop: 10,
    },
  });