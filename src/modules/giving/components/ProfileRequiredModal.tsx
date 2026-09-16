import AppModal
from "../../../shared/components/modals/AppModal";

import AppButton
from "@/shared/AppButton";

import {
  Text,
  View,
} from "react-native";

interface Props {
  visible: boolean;

  onUpdateProfile:
    () => void;

  onClose: () => void;
}

export default function ProfileRequiredModal({
  visible,
  onUpdateProfile,
  onClose,
}: Props) {
  return (
    <AppModal
      visible={visible}
      onClose={onClose}
    >
      <View>
        <Text
          style={{
            textAlign:
              "center",
            fontSize: 20,
            fontWeight:
              "700",
          }}
        >
          Profile not updated
        </Text>

        <Text
          style={{
            textAlign:
              "center",
            marginTop: 10,
          }}
        >
          Kindly update your
          profile to perform
          this operation.
        </Text>

        <AppButton
          title="Update Profile"
          onPress={
            onUpdateProfile
          }
        />
      </View>
    </AppModal>
  );
}