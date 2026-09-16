import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  ChevronLeft,
  Church,
  LogOut,
  ChevronRight,
} from "lucide-react-native";

import useMore from "@/modules/more/hooks/useMore";

export default function ModernSettingsScreen({
  navigation,
}: any) {
  const {
    switchChurch,
    logOut,
  } = useMore();

  return (
    <View style={styles.container}>
      <View
        style={styles.topBar}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
          hitSlop={8}
        >
          <ChevronLeft
            size={22}
            color="rgba(17, 17, 17, 0.8)"
          />
        </TouchableOpacity>

        <Text
          style={
            styles.topBarTitle
          }
        >
          Settings
        </Text>

        <View
          style={{ width: 22 }}
        />
      </View>

      <ScrollView
        contentContainerStyle={
          styles.content
        }
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={switchChurch}
          style={styles.row}
        >
          <View
            style={
              styles.rowIcon
            }
          >
            <Church
              size={18}
              color="#1D3AA8"
            />
          </View>

          <Text
            style={
              styles.rowLabel
            }
          >
            Switch Church
          </Text>

          <ChevronRight
            size={18}
            color="rgba(0,0,0,0.3)"
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={logOut}
          style={styles.row}
        >
          <View
            style={[
              styles.rowIcon,
              styles.rowIconDanger,
            ]}
          >
            <LogOut
              size={18}
              color="#B4413C"
            />
          </View>

          <Text
            style={[
              styles.rowLabel,
              styles.rowLabelDanger,
            ]}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#FFFFFF",
  },

  topBar: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    paddingHorizontal: 16,

    paddingTop: 54,

    paddingBottom: 14,
  },

  topBarTitle: {
    fontSize: 16,

    fontWeight: "700",

    color: "rgba(17, 17, 17, 0.9)",
  },

  content: {
    padding: 16,
  },

  row: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,

    paddingVertical: 14,

    borderBottomWidth: 1,

    borderBottomColor: "rgba(0,0,0,0.06)",
  },

  rowIcon: {
    width: 34,

    height: 34,

    borderRadius: 17,

    backgroundColor: "#EFEEF9",

    alignItems: "center",

    justifyContent: "center",
  },

  rowIconDanger: {
    backgroundColor: "#FBE1E1",
  },

  rowLabel: {
    flex: 1,

    fontSize: 15,

    fontWeight: "600",

    color: "rgba(17, 17, 17, 0.85)",
  },

  rowLabelDanger: {
    color: "#B4413C",
  },
});