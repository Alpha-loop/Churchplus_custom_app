import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";

import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  X,
  User,
  Bell,
  Settings,
  BookOpen,
  Users,
  MessageCircle,
  LogOut,
} from "lucide-react-native";

import { useTheme } from "@/theme/ThemeContext";

interface Props {
  visible: boolean;

  onClose: () => void;

  userName?: string;

  userPhotoUrl?: string;

  activeRoute?: string;

  onNavigate: (
    route: string
  ) => void;
}

const PRIMARY_ITEMS = [
  {
    key: "DevotionalLibrary",
    label: "Devotionals",
    Icon: BookOpen,
  },

  {
    key: "Messages",
    label: "Messages",
    Icon: MessageCircle,
  },

  {
    key: "Profile",
    label: "Profile",
    Icon: User,
  },

  {
    key: "Notifications",
    label: "Notifications",
    Icon: Bell,
  },

  {
    key: "Settings",
    label: "Settings",
    Icon: Settings,
  },
];

const RESOURCE_ITEMS = [
  // {
  //   key: "BibleStudy",
  //   label: "Bible Study",
  //   Icon: BookOpen,
  // },

  {
    key: "CommunityGroups",
    label: "Community",
    Icon: Users,
  },
];

// Same "Modal needs its own SafeAreaProvider" fix as
// AppSideDrawer.tsx in Classic — react-native-safe-area-context
// doesn't get correct insets inside React Native's own Modal
// otherwise, since Modal renders on a separate native layer
// outside the app's root SafeAreaProvider.
export default function ModernMenuDrawer({
  visible,
  onClose,
  userName,
  userPhotoUrl,
  activeRoute,
  onNavigate,
}: Props) {
  const { colors } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <SafeAreaProvider>
        <View
          style={
            styles.overlay
          }
        >
          <SafeAreaView
            style={[
              styles.drawer,
              {
                backgroundColor:
                  colors.surface,
              },
            ]}
            edges={[
              "top",
              "bottom",
            ]}
          >
            <View
              style={
                styles.header
              }
            >
              <View
                style={
                  styles.headerLeft
                }
              >
                {userPhotoUrl ? (
                  <Image
              cachePolicy="memory-disk"
                    source={{
                      uri: userPhotoUrl,
                    }}
                    style={
                      styles.avatar
                    }
                  />
                ) : (
                  <View
                    style={[
                      styles.avatar,
                      {
                        backgroundColor:
                          colors.primaryMuted,

                        alignItems:
                          "center",

                        justifyContent:
                          "center",
                      },
                    ]}
                  >
                    <User
                      size={18}
                      color={
                        colors.primary
                      }
                    />
                  </View>
                )}

                <Text
                  style={[
                    styles.churchName,
                    {
                      color:
                        colors.textPrimary,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {userName ||
                    "Account"}
                </Text>
              </View>

              <TouchableOpacity
                onPress={
                  onClose
                }
                hitSlop={8}
              >
                <X
                  size={22}
                  color={
                    colors.textSecondary
                  }
                />
              </TouchableOpacity>
            </View>

            <View
              style={
                styles.section
              }
            >
              {PRIMARY_ITEMS.map(
                ({
                  key,
                  label,
                  Icon,
                }) => {
                  const active =
                    activeRoute ===
                    key;

                  return (
                    <TouchableOpacity
                      key={key}
                      activeOpacity={0.8}
                      onPress={() =>
                        onNavigate(
                          key
                        )
                      }
                      style={[
                        styles.item,
                        active && {
                          backgroundColor:
                            colors.primaryMuted,
                        },
                      ]}
                    >
                      <Icon
                        size={19}

                        color={
                          active
                            ? colors.primary
                            : colors.textSecondary
                        }
                      />

                      <Text
                        style={[
                          styles.itemLabel,
                          {
                            color: active
                              ? colors.primary
                              : colors.textPrimary,

                            fontWeight: active
                              ? "700"
                              : "600",
                          },
                        ]}
                      >
                        {label}
                      </Text>
                    </TouchableOpacity>
                  );
                }
              )}
            </View>

            <View
              style={[
                styles.divider,
                {
                  backgroundColor:
                    colors.divider,
                },
              ]}
            />

            <Text
              style={[
                styles.sectionLabel,
                {
                  color:
                    colors.textMuted,
                },
              ]}
            >
              RESOURCES
            </Text>

            <View
              style={
                styles.section
              }
            >
              {RESOURCE_ITEMS.map(
                ({
                  key,
                  label,
                  Icon,
                }) => (
                  <TouchableOpacity
                    key={key}
                    activeOpacity={0.8}
                    onPress={() =>
                      onNavigate(
                        key
                      )
                    }
                    style={
                      styles.item
                    }
                  >
                    <Icon
                      size={19}
                      color={
                        colors.textSecondary
                      }
                    />

                    <Text
                      style={[
                        styles.itemLabel,
                        {
                          color:
                            colors.textPrimary,
                        },
                      ]}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>

            <View
              style={[
                styles.divider,
                {
                  backgroundColor:
                    colors.divider,
                },
              ]}
            />

            <View
              style={
                styles.section
              }
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  onNavigate(
                    "Logout"
                  )
                }
                style={
                  styles.item
                }
              >
                <LogOut
                  size={19}
                  color={
                    colors.danger
                  }
                />

                <Text
                  style={[
                    styles.itemLabel,
                    {
                      color:
                        colors.danger,
                    },
                  ]}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          <Pressable
            style={[
              styles.backdrop,
              {
                backgroundColor:
                  colors.overlay,
              },
            ]}
            onPress={onClose}
          />
        </View>
      </SafeAreaProvider>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,

    flexDirection: "row",
  },

  drawer: {
    width: "82%",

    maxWidth: 340,

    backgroundColor: "#FFFFFF",
  },

  backdrop: {
    flex: 1,

    backgroundColor: "rgba(0,0,0,0.3)",
  },

  header: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    paddingHorizontal: 18,

    paddingVertical: 18,
  },

  headerLeft: {
    flexDirection: "row",

    alignItems: "center",

    gap: 10,

    flex: 1,

    marginRight: 10,
  },

  avatar: {
    width: 40,

    height: 40,

    borderRadius: 20,
  },

  avatarPlaceholder: {
    backgroundColor: "#EFEEF9",

    alignItems: "center",

    justifyContent: "center",
  },

  churchName: {
    fontSize: 17,

    fontWeight: "800",

    color: "rgba(17, 17, 17, 0.9)",

    flex: 1,
  },

  section: {
    paddingHorizontal: 12,
  },

  item: {
    flexDirection: "row",

    alignItems: "center",

    gap: 14,

    paddingVertical: 13,

    paddingHorizontal: 12,

    borderRadius: 10,
  },

  itemActive: {
    backgroundColor: "#E9EDFB",
  },

  itemLabel: {
    fontSize: 15,

    fontWeight: "600",

    color: "rgba(17, 17, 17, 0.8)",
  },

  itemLabelDanger: {
    color: "#B4413C",
  },

  itemLabelActive: {
    color: "#1D3AA8",

    fontWeight: "700",
  },

  divider: {
    height: 1,

    backgroundColor: "rgba(0,0,0,0.08)",

    marginVertical: 16,

    marginHorizontal: 18,
  },

  sectionLabel: {
    fontSize: 11,

    fontWeight: "700",

    color: "rgba(0,0,0,0.4)",

    letterSpacing: 0.5,

    paddingHorizontal: 24,

    marginBottom: 10,
  },
});