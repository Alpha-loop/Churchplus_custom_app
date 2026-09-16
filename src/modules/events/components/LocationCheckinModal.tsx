import {
  Modal,
  View,
  Text,
} from "react-native";

interface Props {
  visible: boolean;

  onClose: () => void;
}

export default function LocationCheckinModal({
  visible,
  onClose,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent:
            "flex-end",
          backgroundColor:
            "rgba(0,0,0,0.4)",
        }}
      >
        <View
          style={{
            backgroundColor:
              "#FFF",
            padding: 24,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight:
                "700",
              textAlign:
                "center",
            }}
          >
            Location Check-In
          </Text>

          <Text
            style={{
              marginTop: 15,
              textAlign:
                "center",
            }}
          >
            GPS integration
            will be added
            in Phase 2.
          </Text>
        </View>
      </View>
    </Modal>
  );
}