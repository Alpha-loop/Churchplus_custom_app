import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

import { useAuthStore } from "@/store/authStore";

import {
  getUserProfile,
  updateProfile,
} from "../services/profile.service";

export default function useManageProfile(
  navigation: any
) {
  const user = useAuthStore(
    state => state.user
  );

  const token = useAuthStore(
    state => state.accessToken
  );

  const setAuth = useAuthStore(
    state => state.setAuth
  );

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [imageUri, setImageUri] =
    useState("");

  const [bio, setBio] =
    useState("");

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [
    phoneNumber,
    setPhoneNumber,
  ] = useState("");

  const [email, setEmail] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [occupation, setOccupation] =
    useState("");

  // Confirmed real from an actual getUserProfile response — all
  // present on the GET, just never previously sent back on save.
  // genderID/maritalStatusID are the real dropdown-backed fields
  // (see useProfileLookups.ts for their option lists); the
  // birth/wedding fields are plain day/month/year numbers, no
  // lookup needed.
  const [genderID, setGenderID] =
    useState<number | null>(null);

  const [
    maritalStatusID,
    setMaritalStatusID,
  ] = useState<number | null>(
    null
  );

  const [
    dayOfBirth,
    setDayOfBirth,
  ] = useState<number | null>(
    null
  );

  const [
    monthOfBirth,
    setMonthOfBirth,
  ] = useState<number | null>(
    null
  );

  const [
    yearOfBirth,
    setYearOfBirth,
  ] = useState<number | null>(
    null
  );

  const [
    dayOfWedding,
    setDayOfWedding,
  ] = useState<number | null>(
    null
  );

  const [
    monthOfWedding,
    setMonthOfWedding,
  ] = useState<number | null>(
    null
  );

  const [
    yearOfWedding,
    setYearOfWedding,
  ] = useState<number | null>(
    null
  );

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile =
    async () => {
      try {
        if (
          !user?.personId ||
          !token
        ) {
          return;
        }

        setLoading(true);

        const response =
          await getUserProfile(
            user.personId,
            token
          );

        const profile =
          response.object;

        if (!profile) return;

        setImageUri(
          profile.pictureUrl || ""
        );

        setBio(
          profile.about || ""
        );

        setFirstName(
          profile.firstName || ""
        );

        setLastName(
          profile.lastName || ""
        );

        setPhoneNumber(
          profile.mobilePhone || ""
        );

        setEmail(
          profile.email || ""
        );

        setAddress(
          profile.homeAddress || ""
        );

        setOccupation(
          profile.occupation || ""
        );

        setGenderID(
          profile.genderID ??
            null
        );

        setMaritalStatusID(
          profile.maritalStatusID ??
            null
        );

        setDayOfBirth(
          profile.dayOfBirth ??
            null
        );

        setMonthOfBirth(
          profile.monthOfBirth ??
            null
        );

        setYearOfBirth(
          profile.yearOfBirth ??
            null
        );

        setDayOfWedding(
          profile.dayOfWedding ??
            null
        );

        setMonthOfWedding(
          profile.monthOfWedding ??
            null
        );

        setYearOfWedding(
          profile.yearOfWedding ??
            null
        );
      } catch (error) {
        console.log(
          "PROFILE ERROR",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  const pickImage =
    async () => {
      const result =
        await ImagePicker.launchImageLibraryAsync(
          {
            mediaTypes:
              ImagePicker.MediaTypeOptions.Images,

            allowsEditing: true,

            aspect: [1, 1],

            quality: 0.8,
          }
        );

      if (!result.canceled) {
        setImageUri(
          result.assets[0].uri
        );
      }
    };

  const saveProfile =
    async () => {
      try {
        if (
          !token ||
          !user?.personId
        ) {
          return;
        }

        setSaving(true);

        const formData =
          new FormData();

        formData.append(
          "firstName",
          firstName
        );

        formData.append(
          "lastName",
          lastName
        );

        formData.append(
          "mobilePhone",
          phoneNumber
        );

        formData.append(
          "email",
          email
        );

        formData.append(
          "homeAddress",
          address
        );

        formData.append(
          "occupation",
          occupation
        );

        formData.append(
          "about",
          bio
        );

        // These 8 fields are new — same field names the GET
        // response uses. Assuming (not yet confirmed by an actual
        // successful save+re-fetch test) that PUT mirrors GET's
        // naming, matching the general pattern elsewhere in this
        // API — worth verifying with a real save once this ships.
        if (genderID != null) {
          formData.append(
            "genderID",
            String(genderID)
          );
        }

        if (
          maritalStatusID != null
        ) {
          formData.append(
            "maritalStatusID",
            String(
              maritalStatusID
            )
          );
        }

        if (dayOfBirth != null) {
          formData.append(
            "dayOfBirth",
            String(dayOfBirth)
          );
        }

        if (
          monthOfBirth != null
        ) {
          formData.append(
            "monthOfBirth",
            String(
              monthOfBirth
            )
          );
        }

        if (yearOfBirth != null) {
          formData.append(
            "yearOfBirth",
            String(yearOfBirth)
          );
        }

        if (
          dayOfWedding != null
        ) {
          formData.append(
            "dayOfWedding",
            String(
              dayOfWedding
            )
          );
        }

        if (
          monthOfWedding != null
        ) {
          formData.append(
            "monthOfWedding",
            String(
              monthOfWedding
            )
          );
        }

        if (
          yearOfWedding != null
        ) {
          formData.append(
            "yearOfWedding",
            String(
              yearOfWedding
            )
          );
        }

        if (
          imageUri &&
          !imageUri.startsWith(
            "http"
          )
        ) {
          formData.append(
            "picture",
            {
              uri: imageUri,
              name:
                "profile.jpg",
              type:
                "image/jpeg",
            } as any
          );
        }

        const response =
          await updateProfile(
            user.personId,
            formData,
            token
          );

        const updated =
          response.object;

        if (updated) {
          setAuth({
            accessToken:
              token,

            refreshToken:
              useAuthStore.getState()
                .refreshToken || "",

            user: {
              ...user,

              person: {
                ...user.person,

                firstName:
                  updated.firstName,

                lastName:
                  updated.lastName,

                phoneNumber:
                  updated.mobilePhone,

                address:
                  updated.homeAddress,

                photo:
                  updated.pictureUrl,
              },
            },
          });
        }

        Alert.alert(
          "Success",
          "Profile updated successfully."
        );

        navigation.goBack();
      } catch (error) {
        console.log(
          "UPDATE PROFILE ERROR",
          error
        );

        Alert.alert(
          "Error",
          "Unable to update profile."
        );
      } finally {
        setSaving(false);
      }
    };

  return {
    loading,

    saving,

    imageUri,
    setImageUri,

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

    refreshProfile:
      loadProfile,
  };
}