import AppModal
from "../../../shared/components/modals/AppModal";

import AppButton
from "@/shared/AppButton";

import {
  View,
} from "react-native";

interface Props {
  visible: boolean;

  onLogin: () => void;

  onSignup: () => void;

  onClose: () => void;
}

export default function AuthenticationRequiredModal({
  visible,
  onLogin,
  onSignup,
  onClose,
}: Props) {
  return (
    <AppModal
      visible={visible}
      onClose={onClose}
    >
      <View>
        <AppButton
          title="Login"
          onPress={onLogin}
        />

        <AppButton
          title="Signup"
          onPress={onSignup}
        />
      </View>
    </AppModal>
  );
}