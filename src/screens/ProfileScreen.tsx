import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";

import {
  ChevronLeft,
  Settings,
  Pencil,
  UserCog,
  HandCoins,
  SlidersHorizontal,
  ChevronRight,
  LogOut,
} from "lucide-react-native";

import useProfile from "@/modules/profile/hooks/useProfile";

import { useTheme } from "@/theme/ThemeContext";

export default function ModernProfileScreen({
  navigation,
}: any) {
  const { colors } = useTheme();

  const {
    profile,
    loading,
    handleDeleteAccount,
  } = useProfile();

  if (loading) {
    return (
      <View
        style={[
          styles.centerWrap,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }

  const fullName =
    [
      profile?.firstName,
      profile?.lastName,
    ]
      .filter(Boolean)
      .join(" ") || "Member";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <View
        style={[
          styles.topBar,
          { backgroundColor: colors.surface },
        ]}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
          hitSlop={8}
        >
          <ChevronLeft
            size={22}
            color={colors.primary}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.topBarTitle,
            { color: colors.primary },
          ]}
        >
          Profile
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "Settings"
            )
          }
          hitSlop={8}
        >
          <Settings
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
        showsVerticalScrollIndicator={
          false
        }
      >
        <View
          style={
            styles.avatarWrap
          }
        >
          {profile?.pictureUrl ? (
            <Image
              cachePolicy="memory-disk"
              source={{
                uri: profile.pictureUrl,
              }}
              style={[
                styles.avatar,
                { borderColor: colors.primary },
              ]}
            />
          ) : (
            <View
              style={[
                styles.avatar,
                styles.avatarPlaceholder,
                {
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                },
              ]}
            >
              <Text
                style={
                  styles.avatarText
                }
              >
                {fullName
                  .trim()?.[0]
                  ?.toUpperCase()}
              </Text>
            </View>
          )}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                "ManageProfile"
              )
            }
            style={[
              styles.editBadge,
              {
                backgroundColor: colors.primary,
                borderColor: colors.background,
              },
            ]}
          >
            <Pencil
              size={14}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        <Text
          style={[
            styles.name,
            { color: colors.textPrimary },
          ]}
        >
          {fullName}
        </Text>

        {profile?.churchGroup ? (
          <Text
            style={[
              styles.churchGroup,
              { color: colors.textMuted },
            ]}
          >
            {profile.churchGroup}
          </Text>
        ) : null}

        <View
          style={[
            styles.list,
            { backgroundColor: colors.surface },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate(
                "ManageProfile"
              )
            }
            style={[
              styles.row,
              { borderBottomColor: colors.divider },
            ]}
          >
            <View
              style={[
                styles.rowIcon,
                { backgroundColor: colors.primaryMuted },
              ]}
            >
              <UserCog
                size={18}
                color={colors.primary}
              />
            </View>

            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={[
                  styles.rowTitle,
                  { color: colors.textPrimary },
                ]}
              >
                Edit Profile
              </Text>

              <Text
                style={[
                  styles.rowSubtitle,
                  { color: colors.textMuted },
                ]}
              >
                Update personal
                details
              </Text>
            </View>

            <ChevronRight
              size={18}
              color={colors.textMuted}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate(
                "PledgesAndDonation"
              )
            }
            style={[
              styles.row,
              { borderBottomColor: colors.divider },
            ]}
          >
            <View
              style={[
                styles.rowIcon,
                { backgroundColor: colors.primaryMuted },
              ]}
            >
              <HandCoins
                size={18}
                color={colors.primary}
              />
            </View>

            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={[
                  styles.rowTitle,
                  { color: colors.textPrimary },
                ]}
              >
                My Pledges
              </Text>

              <Text
                style={[
                  styles.rowSubtitle,
                  { color: colors.textMuted },
                ]}
              >
                Manage giving and
                tithes
              </Text>
            </View>

            <ChevronRight
              size={18}
              color={colors.textMuted}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate(
                "Settings"
              )
            }
            style={[
              styles.row,
              { borderBottomColor: colors.divider },
            ]}
          >
            <View
              style={[
                styles.rowIcon,
                { backgroundColor: colors.primaryMuted },
              ]}
            >
              <SlidersHorizontal
                size={18}
                color={colors.primary}
              />
            </View>

            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={[
                  styles.rowTitle,
                  { color: colors.textPrimary },
                ]}
              >
                Preferences
              </Text>

              <Text
                style={[
                  styles.rowSubtitle,
                  { color: colors.textMuted },
                ]}
              >
                Church, account
                and app settings
              </Text>
            </View>

            <ChevronRight
              size={18}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={
            handleDeleteAccount
          }
          style={[
            styles.deleteButton,
            { backgroundColor: colors.dangerMuted },
          ]}
        >
          <LogOut
            size={16}
            color={colors.danger}
          />

          <Text
            style={[
              styles.deleteText,
              { color: colors.danger },
            ]}
          >
            Delete Account
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  centerWrap: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",
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
    fontSize: 18,

    fontWeight: "800",
  },

  avatarWrap: {
    alignSelf: "center",

    position: "relative",

    marginBottom: 14,
  },

  avatar: {
    width: 120,

    height: 120,

    borderRadius: 60,

    borderWidth: 3,
  },

  avatarPlaceholder: {
    alignItems: "center",

    justifyContent: "center",
  },

  avatarText: {
    color: "#FFFFFF",

    fontSize: 42,

    fontWeight: "700",
  },

  editBadge: {
    position: "absolute",

    bottom: 4,

    right: 4,

    width: 30,

    height: 30,

    borderRadius: 15,

    alignItems: "center",

    justifyContent: "center",

    borderWidth: 2,
  },

  name: {
    fontSize: 22,

    fontWeight: "800",

    textAlign: "center",
  },

  churchGroup: {
    fontSize: 13,

    textAlign: "center",

    marginTop: 4,
  },

  list: {
    borderRadius: 16,

    marginTop: 26,

    paddingHorizontal: 6,
  },

  row: {
    flexDirection: "row",

    alignItems: "center",

    gap: 14,

    paddingVertical: 14,

    paddingHorizontal: 10,

    borderBottomWidth: 1,
  },

  rowIcon: {
    width: 40,

    height: 40,

    borderRadius: 20,

    alignItems: "center",

    justifyContent: "center",
  },

  rowTitle: {
    fontSize: 15,

    fontWeight: "700",
  },

  rowSubtitle: {
    fontSize: 12,

    marginTop: 2,
  },

  deleteButton: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 8,

    borderRadius: 24,

    paddingVertical: 14,

    marginTop: 24,

    marginBottom: 10,
  },

  deleteText: {
    fontSize: 14,

    fontWeight: "700",
  },
});