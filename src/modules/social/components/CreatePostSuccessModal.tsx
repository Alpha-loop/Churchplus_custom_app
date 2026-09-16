import {
  View,
  Text,
  Image,
} from "react-native";

import {
  Modal,
  Portal,
  Button,
} from "react-native-paper";

interface Props {
  visible: boolean;

  onClose: () => void;
}

export default function CreatePostSuccessModal({
  visible,
  onClose,
}: Props) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={{
          backgroundColor:
            "#FFFFFF",

          padding: 20,

          width: "90%",

          alignSelf:
            "center",
        }}
      >
        <View
          style={{
            alignItems:
              "center",
          }}
        >
          <Image
            source={require("@/assets/img/success_notification.png")}
          />

          <Text
            style={{
              fontSize: 24,

              fontWeight:
                "700",

              color:
                "#124191",

              marginTop: 10,
            }}
          >
            Great Job!
          </Text>

          <Text
            style={{
              marginTop: 10,

              textAlign:
                "center",
            }}
          >
            Your post has
            been published
            successfully.
          </Text>

          <Button
            mode="contained"
            onPress={onClose}
            style={{
              marginTop: 20,
            }}
          >
            OK
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}