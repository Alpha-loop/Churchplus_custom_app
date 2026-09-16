import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  tabs: string[];

  selectedTab: string;

  onChange: (
    tab: string
  ) => void;
}

export default function ChurchProfileTabs({
  tabs,
  selectedTab,
  onChange,
}: Props) {
  return (
    <View
      style={{
        height: 45,
        backgroundColor:
          "rgba(223,239,255,0.2)",
      }}
    >
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={
          false
        }
        data={tabs}
        keyExtractor={
          item => item
        }
        renderItem={({
          item,
        }) => (
          <Pressable
            onPress={() =>
              onChange(item)
            }
            style={{
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderBottomWidth: 2,
              borderBottomColor:
                selectedTab ===
                item
                  ? "#124191"
                  : "transparent",
            }}
          >
            <Text>
              {item}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}