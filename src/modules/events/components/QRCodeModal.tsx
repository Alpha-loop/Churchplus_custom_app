import {
  Modal,
  View,
  Text,
  Image,
  Pressable,
} from "react-native";

interface Props {
  visible: boolean;

  onClose: () => void;
}

export default function QRCodeModal({
  visible,
  onClose,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
    >
      <View
        style={{
          flex: 1,
          justifyContent:
            "center",
          alignItems:
            "center",
          backgroundColor:
            "rgba(0,0,0,0.5)",
        }}
      >
        <View
          style={{
            backgroundColor:
              "#FFF",
            padding: 24,
            borderRadius: 16,
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
            Show this QR Code
          </Text>

          <Image
            source={{
              uri:
                "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=demo",
            }}
            style={{
              width: 250,
              height: 250,
              marginTop: 20,
            }}
          />

          <Pressable
            onPress={onClose}
          >
            <Text
              style={{
                textAlign:
                  "center",
                marginTop: 15,
              }}
            >
              Close
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}