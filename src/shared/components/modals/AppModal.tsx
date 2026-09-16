import {
  Modal,
  Pressable,
  View,
} from "react-native";

import {
  ReactNode,
} from "react";

interface AppModalProps {
  visible: boolean;

  onClose: () => void;

  children: ReactNode;

  centered?: boolean;
}

export default function AppModal({
  visible,

  onClose,

  children,

  centered = true,
}: AppModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,

          backgroundColor:
            "rgba(0,0,0,0.5)",

          justifyContent:
            centered
              ? "center"
              : "flex-end",

          padding: 20,
        }}
      >
        <Pressable>
          <View
            style={{
              backgroundColor:
                "white",

              borderRadius: 24,

              overflow: "hidden",
            }}
          >
            {children}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}