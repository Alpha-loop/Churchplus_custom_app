import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppInput from "@/shared/AppInput";

interface Props {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
  occupation: string;

  onFirstNameChange: (
    value: string
  ) => void;

  onLastNameChange: (
    value: string
  ) => void;

  onPhoneNumberChange: (
    value: string
  ) => void;

  onEmailChange: (
    value: string
  ) => void;

  onAddressChange: (
    value: string
  ) => void;

  onOccupationChange: (
    value: string
  ) => void;
}

export default function PersonalInformationForm({
  firstName,
  lastName,
  phoneNumber,
  email,
  address,
  occupation,
  onFirstNameChange,
  onLastNameChange,
  onPhoneNumberChange,
  onEmailChange,
  onAddressChange,
  onOccupationChange,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Personal Information
      </Text>

      <AppInput
        value={firstName}
        placeholder="First Name"
        onChangeText={
          onFirstNameChange
        }
      />

      <AppInput
        value={lastName}
        placeholder="Last Name"
        onChangeText={
          onLastNameChange
        }
      />

      <AppInput
        value={phoneNumber}
        placeholder="Phone Number"
        onChangeText={
          onPhoneNumberChange
        }
      />

      <AppInput
        value={email}
        placeholder="Email"
        // editable={false}
        onChangeText={
          onEmailChange
        }
      />

      <AppInput
        value={address}
        placeholder="Address"
        onChangeText={
          onAddressChange
        }
      />

      <AppInput
        value={occupation}
        placeholder="Occupation"
        onChangeText={
          onOccupationChange
        }
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginTop: 25,
      gap: 20,
    },

    title: {
      fontSize: 16,

      fontWeight: "700",

      marginBottom: 10,
    },
  });