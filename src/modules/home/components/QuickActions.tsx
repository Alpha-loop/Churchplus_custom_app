import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  InviteIcon,
  PlaneIcon,
  ChurchIcon,
  QRCodeIcon,
} from "../../../assets/img/icons";

interface QuickActionsProps {
  onInvitePress: () => void;

  onNextStepsPress: () => void;

  onChurchInfoPress: () => void;

  onCheckinPress: () => void;
}

interface ActionItem {
  label: string;
}

const ACTIONS: ActionItem[] = [
  {
    label: "Invite",
  },

  {
    label: "Next Steps",
  },

  {
    label: "Ministry Info",
  },

  {
    label: "Check In",
  },
];

export default function QuickActions({
  onInvitePress,

  onNextStepsPress,

  onChurchInfoPress,

  onCheckinPress,
}: QuickActionsProps) {
  const handlePress = (
    index: number
  ) => {
    switch (index) {
      case 0:
        onInvitePress();
        break;

      case 1:
        onNextStepsPress();
        break;

      case 2:
        onChurchInfoPress();
        break;

      case 3:
        onCheckinPress();
        break;
    }
  };

  const renderIcon = (
    index: number
  ) => {
    switch (index) {
      case 0:
        return (
          <InviteIcon />
        );

      case 1:
        return (
          <PlaneIcon />
        );

      case 2:
        return (
          <ChurchIcon
            width={15}
            height={15}
            color="#000"
          />
        );

      case 3:
        return (
          <QRCodeIcon
            width={14}
            height={14}
            color="#000"
          />
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={ACTIONS}
        keyExtractor={(
          item
        ) => item.label}
        showsHorizontalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.list
        }
        renderItem={({
          item,
          index,
        }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              handlePress(
                index
              )
            }
          >
            <View
              style={
                styles.actionCard
              }
            >
              <View
                style={
                  styles.content
                }
              >
                {renderIcon(
                  index
                )}

                <Text
                  style={
                    styles.label
                  }
                >
                  {item.label}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      
    },

    list: {
      gap: 7,

      paddingHorizontal: 16,
    },

    actionCard: {
      backgroundColor:
        "#FFFFFF",

      borderRadius: 20,

      paddingVertical: 8,

      paddingHorizontal: 25,
    },

    content: {
      flexDirection:
        "row",

      alignItems:
        "center",

      gap: 5,
    },

    label: {
      color: "#000000",

      fontWeight: "500",
    },
  });