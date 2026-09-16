import React, { useCallback } from "react";

import {
  FlatList,
} from "react-native";

import ChurchCard from "./ChurchCard";

import {
  Church,
} from "../types/onboarding.types";

interface Props {
  churches: Church[];

  onSelect: (
    church: Church
  ) => void;
}

function ChurchGrid({
  churches,
  onSelect,
}: Props) {

  const renderItem =
    useCallback(
      ({
        item,
      }: {
        item: Church;
      }) => (
        <ChurchCard
          church={item}
          onPress={() =>
            onSelect(item)
          }
        />
      ),
      [onSelect]
    );

  return (
    <FlatList
      data={churches}

      keyExtractor={item =>
        item.churchID
      }

      renderItem={
        renderItem
      }

      numColumns={3}

      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 30,
      }}

      columnWrapperStyle={{
        justifyContent:
          "space-between",
      }}

      initialNumToRender={
        12
      }

      maxToRenderPerBatch={
        12
      }

      windowSize={7}

      removeClippedSubviews

      showsVerticalScrollIndicator={
        false
      }
    />
  );
}

export default React.memo(
  ChurchGrid
);