import { useState } from "react";

import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";

import {
  ChevronLeft,
  Camera,
  User,
  Church,
  BookOpen,
  Shield,
} from "lucide-react-native";

import useManageProfile from "@/modules/profile/hooks/useManageProfile";

import useProfileLookups from "@/modules/profile/hooks/useProfileLookups";

import useProfile from "@/modules/profile/hooks/useProfile";

import { useTheme } from "@/theme/ThemeContext";

export default function ModernEditProfileScreen({
  navigation,
}: any) {
  const { colors } = useTheme();

  const {
    loading,
    saving,
    imageUri,
    bio,
    setBio,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,
    address,
    setAddress,
    occupation,
    setOccupation,
    genderID,
    setGenderID,
    maritalStatusID,
    setMaritalStatusID,
    dayOfBirth,
    setDayOfBirth,
    monthOfBirth,
    setMonthOfBirth,
    yearOfBirth,
    setYearOfBirth,
    dayOfWedding,
    setDayOfWedding,
    monthOfWedding,
    setMonthOfWedding,
    yearOfWedding,
    setYearOfWedding,
    pickImage,
    saveProfile,
  } = useManageProfile(
    navigation
  );

  const {
    genderOptions,
    maritalStatusOptions,
  } = useProfileLookups();

  const {
    profileVisible,
    setProfileVisible,
  } = useProfile();

  const [
    genderPickerOpen,
    setGenderPickerOpen,
  ] = useState(false);

  const [
    maritalPickerOpen,
    setMaritalPickerOpen,
  ] = useState(false);

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

  const selectedGenderName =
    genderOptions.find(
      g => g.id === genderID
    )?.name;

  const selectedMaritalName =
    maritalStatusOptions.find(
      m =>
        m.id ===
        maritalStatusID
    )?.name;

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
            color={colors.textPrimary}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.topBarTitle,
            { color: colors.textPrimary },
          ]}
        >
          Edit Profile
        </Text>

        <TouchableOpacity
          onPress={
            saveProfile
          }
          disabled={saving}
        >
          <Text
            style={[
              styles.saveText,

              { color: colors.primary },
            ]}
          >
            {saving
              ? "Saving..."
              : "Save"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 16,

          paddingBottom: 40,
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
          {imageUri ? (
            <Image
              cachePolicy="memory-disk"
              source={{
                uri: imageUri,
              }}
              style={
                styles.avatar
              }
            />
          ) : (
            <View
              style={[
                styles.avatar,
                styles.avatarPlaceholder,

              { backgroundColor: colors.primaryMuted },
              ]}
            >
              <User
                size={36}
                color={colors.primary}
              />
            </View>
          )}

          <TouchableOpacity
            onPress={
              pickImage
            }
            style={[
              styles.cameraBadge,

              { backgroundColor: colors.primary, borderColor: colors.background },
            ]}
          >
            <Camera
              size={14}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={
            pickImage
          }
        >
          <Text
            style={[
              styles.changePhotoText,

              { color: colors.primary },
            ]}
          >
            CHANGE PROFILE
            PHOTO
          </Text>
        </TouchableOpacity>

        <View
          style={[
              styles.card,

              { backgroundColor: colors.surface },
            ]}
        >
          <View
            style={
              styles.cardHeader
            }
          >
            <User
              size={16}
              color={colors.primary}
            />

            <Text
              style={[
              styles.cardTitle,

              { color: colors.textPrimary },
            ]}
            >
              Personal Information
            </Text>
          </View>

          <Text
            style={[
              styles.fieldLabel,

              { color: colors.textMuted },
            ]}
          >
            FIRST NAME
          </Text>

          <TextInput
            value={
              firstName
            }
            onChangeText={
              setFirstName
            }
            style={[
              styles.input,

              { backgroundColor: colors.background, color: colors.textPrimary },
            ]}
          />

          <Text
            style={[
              styles.fieldLabel,

              { color: colors.textMuted },
            ]}
          >
            SURNAME
          </Text>

          <TextInput
            value={
              lastName
            }
            onChangeText={
              setLastName
            }
            style={[
              styles.input,

              { backgroundColor: colors.background, color: colors.textPrimary },
            ]}
          />

          <Text
            style={[
              styles.fieldLabel,

              { color: colors.textMuted },
            ]}
          >
            EMAIL ADDRESS
          </Text>

          <TextInput
            value={email}
            onChangeText={
              setEmail
            }
            keyboardType="email-address"
            autoCapitalize="none"
            style={[
              styles.input,

              { backgroundColor: colors.background, color: colors.textPrimary },
            ]}
          />

          <Text
            style={[
              styles.fieldLabel,

              { color: colors.textMuted },
            ]}
          >
            PHONE NUMBER
          </Text>

          <TextInput
            value={
              phoneNumber
            }
            onChangeText={
              setPhoneNumber
            }
            keyboardType="phone-pad"
            style={[
              styles.input,

              { backgroundColor: colors.background, color: colors.textPrimary },
            ]}
          />

          <Text
            style={[
              styles.fieldLabel,

              { color: colors.textMuted },
            ]}
          >
            GENDER
          </Text>

          <TouchableOpacity
            onPress={() =>
              setGenderPickerOpen(
                !genderPickerOpen
              )
            }
            style={[
              styles.input,

              { backgroundColor: colors.background, color: colors.textPrimary },
            ]}
          >
            <Text
              style={[
                selectedGenderName
                  ? styles.inputText
                  : styles.inputPlaceholder,

                {
                  color: selectedGenderName
                    ? colors.textPrimary
                    : colors.textMuted,
                },
              ]}
            >
              {selectedGenderName ||
                "Select gender"}
            </Text>
          </TouchableOpacity>

          {genderPickerOpen ? (
            <View
              style={[
              styles.optionList,

              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
            >
              {genderOptions.map(
                option => (
                  <TouchableOpacity
                    key={
                      option.id
                    }
                    onPress={() => {
                      setGenderID(
                        option.id
                      );

                      setGenderPickerOpen(
                        false
                      );
                    }}
                    style={[
              styles.optionRow,

              { borderBottomColor: colors.divider },
            ]}
                  >
                    <Text
                      style={[
              styles.optionText,

              { color: colors.textPrimary },
            ]}
                    >
                      {
                        option.name
                      }
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          ) : null}

          <Text
            style={[
              styles.fieldLabel,

              { color: colors.textMuted },
            ]}
          >
            MARITAL STATUS
          </Text>

          <TouchableOpacity
            onPress={() =>
              setMaritalPickerOpen(
                !maritalPickerOpen
              )
            }
            style={[
              styles.input,

              { backgroundColor: colors.background, color: colors.textPrimary },
            ]}
          >
            <Text
              style={[
                selectedMaritalName
                  ? styles.inputText
                  : styles.inputPlaceholder,

                {
                  color: selectedMaritalName
                    ? colors.textPrimary
                    : colors.textMuted,
                },
              ]}
            >
              {selectedMaritalName ||
                "Select marital status"}
            </Text>
          </TouchableOpacity>

          {maritalPickerOpen ? (
            <View
              style={[
              styles.optionList,

              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
            >
              {maritalStatusOptions.map(
                option => (
                  <TouchableOpacity
                    key={
                      option.id
                    }
                    onPress={() => {
                      setMaritalStatusID(
                        option.id
                      );

                      setMaritalPickerOpen(
                        false
                      );
                    }}
                    style={[
              styles.optionRow,

              { borderBottomColor: colors.divider },
            ]}
                  >
                    <Text
                      style={[
              styles.optionText,

              { color: colors.textPrimary },
            ]}
                    >
                      {
                        option.name
                      }
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          ) : null}
        </View>

        <View
          style={[
              styles.card,

              { backgroundColor: colors.surface },
            ]}
        >
          <View
            style={
              styles.cardHeader
            }
          >
            <Church
              size={16}
              color={colors.primary}
            />

            <Text
              style={[
              styles.cardTitle,

              { color: colors.textPrimary },
            ]}
            >
              Address & Occupation
            </Text>
          </View>

          <Text
            style={[
              styles.fieldLabel,

              { color: colors.textMuted },
            ]}
          >
            RESIDENTIAL ADDRESS
          </Text>

          <TextInput
            value={address}
            onChangeText={
              setAddress
            }
            multiline
            style={[
              styles.input,

              { backgroundColor: colors.background, color: colors.textPrimary },
              {
                height: 70,

                textAlignVertical:
                  "top",
              },
            ]}
          />

          <Text
            style={[
              styles.fieldLabel,

              { color: colors.textMuted },
            ]}
          >
            OCCUPATION
          </Text>

          <TextInput
            value={
              occupation
            }
            onChangeText={
              setOccupation
            }
            style={[
              styles.input,

              { backgroundColor: colors.background, color: colors.textPrimary },
            ]}
          />
        </View>

        <View
          style={[
              styles.card,

              { backgroundColor: colors.surface },
            ]}
        >
          <View
            style={
              styles.cardHeader
            }
          >
            <BookOpen
              size={16}
              color={colors.primary}
            />

            <Text
              style={[
              styles.cardTitle,

              { color: colors.textPrimary },
            ]}
            >
              Celebrations
            </Text>
          </View>

          <Text
            style={[
              styles.fieldLabel,

              { color: colors.textMuted },
            ]}
          >
            BIRTHDAY
          </Text>

          <View
            style={
              styles.dateRow
            }
          >
            <TextInput
              value={
                dayOfBirth
                  ? String(
                      dayOfBirth
                    )
                  : ""
              }
              onChangeText={t =>
                setDayOfBirth(
                  t
                    ? Number(t)
                    : null
                )
              }
              placeholder="Day"
              keyboardType="number-pad"
              maxLength={2}
              style={[
                styles.input,

              { backgroundColor: colors.background, color: colors.textPrimary },
                styles.dateInput,
              ]}
            />

            <TextInput
              value={
                monthOfBirth
                  ? String(
                      monthOfBirth
                    )
                  : ""
              }
              onChangeText={t =>
                setMonthOfBirth(
                  t
                    ? Number(t)
                    : null
                )
              }
              placeholder="Month"
              keyboardType="number-pad"
              maxLength={2}
              style={[
                styles.input,

              { backgroundColor: colors.background, color: colors.textPrimary },
                styles.dateInput,
              ]}
            />

            <TextInput
              value={
                yearOfBirth
                  ? String(
                      yearOfBirth
                    )
                  : ""
              }
              onChangeText={t =>
                setYearOfBirth(
                  t
                    ? Number(t)
                    : null
                )
              }
              placeholder="Year"
              keyboardType="number-pad"
              maxLength={4}
              style={[
                styles.input,

              { backgroundColor: colors.background, color: colors.textPrimary },
                styles.dateInput,
              ]}
            />
          </View>

          <Text
            style={[
              styles.fieldLabel,

              { color: colors.textMuted },
            ]}
          >
            WEDDING ANNIVERSARY
          </Text>

          <View
            style={
              styles.dateRow
            }
          >
            <TextInput
              value={
                dayOfWedding
                  ? String(
                      dayOfWedding
                    )
                  : ""
              }
              onChangeText={t =>
                setDayOfWedding(
                  t
                    ? Number(t)
                    : null
                )
              }
              placeholder="Day"
              keyboardType="number-pad"
              maxLength={2}
              style={[
                styles.input,

              { backgroundColor: colors.background, color: colors.textPrimary },
                styles.dateInput,
              ]}
            />

            <TextInput
              value={
                monthOfWedding
                  ? String(
                      monthOfWedding
                    )
                  : ""
              }
              onChangeText={t =>
                setMonthOfWedding(
                  t
                    ? Number(t)
                    : null
                )
              }
              placeholder="Month"
              keyboardType="number-pad"
              maxLength={2}
              style={[
                styles.input,

              { backgroundColor: colors.background, color: colors.textPrimary },
                styles.dateInput,
              ]}
            />

            <TextInput
              value={
                yearOfWedding
                  ? String(
                      yearOfWedding
                    )
                  : ""
              }
              onChangeText={t =>
                setYearOfWedding(
                  t
                    ? Number(t)
                    : null
                )
              }
              placeholder="Year"
              keyboardType="number-pad"
              maxLength={4}
              style={[
                styles.input,

              { backgroundColor: colors.background, color: colors.textPrimary },
                styles.dateInput,
              ]}
            />
          </View>
        </View>

        <View
          style={[
              styles.card,

              { backgroundColor: colors.surface },
            ]}
        >
          <View
            style={
              styles.cardHeader
            }
          >
            <BookOpen
              size={16}
              color={colors.primary}
            />

            <Text
              style={[
              styles.cardTitle,

              { color: colors.textPrimary },
            ]}
            >
              Bio
            </Text>
          </View>

          <TextInput
            value={bio}
            onChangeText={
              setBio
            }
            multiline
            placeholder="Tell your church community a bit about yourself"
            placeholderTextColor={colors.textMuted}
            style={[
              styles.input,

              { backgroundColor: colors.background, color: colors.textPrimary },
              {
                height: 90,

                textAlignVertical:
                  "top",
              },
            ]}
          />
        </View>

        <View
          style={[
              styles.card,

              { backgroundColor: colors.surface },
            ]}
        >
          <View
            style={
              styles.cardHeader
            }
          >
            <Shield
              size={16}
              color={colors.primary}
            />

            <Text
              style={[
              styles.cardTitle,

              { color: colors.textPrimary },
            ]}
            >
              Privacy
            </Text>
          </View>

          <View
            style={
              styles.toggleRow
            }
          >
            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={[
              styles.toggleTitle,

              { color: colors.textPrimary },
            ]}
              >
                Show in Directory
              </Text>

              <Text
                style={[
              styles.toggleSubtitle,

              { color: colors.textMuted },
            ]}
              >
                Allow verified
                fellow church
                members to find
                your profile
              </Text>
            </View>

            <Switch
              value={
                profileVisible
              }
              onValueChange={
                setProfileVisible
              }
              trackColor={{
                true: colors.primary,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F4F3FA",
  },

  centerWrap: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",

    backgroundColor: "#F4F3FA",
  },

  topBar: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    paddingHorizontal: 16,

    paddingTop: 54,

    paddingBottom: 14,

    backgroundColor: "#FFFFFF",
  },

  topBarTitle: {
    fontSize: 16,

    fontWeight: "700",

    color: "rgba(17, 17, 17, 0.9)",
  },

  saveText: {
    fontSize: 15,

    fontWeight: "700",

    color: "#28166f",
  },

  avatarWrap: {
    alignSelf: "center",

    position: "relative",

    marginTop: 8,

    marginBottom: 8,
  },

  avatar: {
    width: 96,

    height: 96,

    borderRadius: 48,
  },

  avatarPlaceholder: {
    backgroundColor: "#E9EDFB",

    alignItems: "center",

    justifyContent: "center",
  },

  cameraBadge: {
    position: "absolute",

    bottom: 0,

    right: 0,

    width: 28,

    height: 28,

    borderRadius: 14,

    backgroundColor: "#28166f",

    alignItems: "center",

    justifyContent: "center",

    borderWidth: 2,

    borderColor: "#F4F3FA",
  },

  changePhotoText: {
    alignSelf: "center",

    fontSize: 12,

    fontWeight: "700",

    color: "#28166f",

    letterSpacing: 0.3,

    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 16,

    padding: 16,

    marginBottom: 16,
  },

  cardHeader: {
    flexDirection: "row",

    alignItems: "center",

    gap: 8,

    marginBottom: 14,
  },

  cardTitle: {
    fontSize: 15,

    fontWeight: "700",

    color: "rgba(17, 17, 17, 0.9)",
  },

  fieldLabel: {
    fontSize: 10,

    fontWeight: "700",

    color: "rgba(0,0,0,0.4)",

    letterSpacing: 0.4,

    marginBottom: 6,

    marginTop: 12,
  },

  input: {
    backgroundColor: "#F4F3FA",

    borderRadius: 10,

    paddingHorizontal: 12,

    paddingVertical: 11,

    fontSize: 14,

    color: "rgba(17, 17, 17, 0.9)",
  },

  inputText: {
    fontSize: 14,

    color: "rgba(17, 17, 17, 0.9)",
  },

  inputPlaceholder: {
    fontSize: 14,

    color: "rgba(0,0,0,0.35)",
  },

  optionList: {
    backgroundColor: "#FFFFFF",

    borderRadius: 10,

    marginTop: 4,

    borderWidth: 1,

    borderColor: "rgba(0,0,0,0.08)",
  },

  optionRow: {
    paddingHorizontal: 14,

    paddingVertical: 11,

    borderBottomWidth: 1,

    borderBottomColor: "rgba(0,0,0,0.06)",
  },

  optionText: {
    fontSize: 14,

    color: "rgba(17, 17, 17, 0.85)",
  },

  dateRow: {
    flexDirection: "row",

    gap: 8,
  },

  dateInput: {
    flex: 1,

    textAlign: "center",
  },

  toggleRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,
  },

  toggleTitle: {
    fontSize: 14,

    fontWeight: "700",

    color: "rgba(17, 17, 17, 0.9)",
  },

  toggleSubtitle: {
    fontSize: 12,

    color: "rgba(0,0,0,0.5)",

    marginTop: 2,
  },
});