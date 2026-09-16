import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppCard from "@/shared/AppCard";

import {
  UserProfile,
} from "../types/profile.types";

interface Props {
  profile: UserProfile;
}

interface DetailRowProps {
  label: string;

  value?: string;
}

function DetailRow({
  label,
  value,
}: DetailRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value?.trim() || "-"}
      </Text>
    </View>
  );
}

export default function ProfileDetailsCard({
  profile,
}: Props) {
  return (
    <View style={styles.container}>
      <AppCard>
        <DetailRow
          label="Occupation"
          value={
            profile.occupation
          }
        />

        <DetailRow
          label="Marital Status"
          value={
            profile.maritalStatus
          }
        />

        <DetailRow
          label="Email"
          value={
            profile.email
          }
        />

        <DetailRow
          label="Phone Number"
          value={
            profile.mobilePhone
          }
        />

        <DetailRow
          label="Address"
          value={
            profile.homeAddress
          }
        />

        <DetailRow
          label="Church Group"
          value={
            profile.churchGroup
          }
        />
      </AppCard>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginHorizontal: 20,

      marginBottom: 20,
    },

    row: {
      marginBottom: 12,
    },

    label: {
      color: "#888",

      fontWeight: "600",

      marginBottom: 2,
    },

    value: {
      color: "#000",
    },
  });