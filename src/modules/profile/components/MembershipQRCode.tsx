import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";

import QRCode from "react-native-qrcode-svg";

interface Props {
  userId: string;
}

export default function MembershipQRCode({
  userId,
}: Props) {
  const [visible, setVisible] =
    useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() =>
          setVisible(true)
        }
        style={{
          marginHorizontal: 'auto',
          marginVertical: 20,
          backgroundColor:
            "#1146B5",
          paddingVertical: 10,
          borderRadius: 12,
          alignItems: "center",
          width: 200,
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: "#FFF",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Membership Code
        </Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setVisible(false)
        }
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor:
              "rgba(0,0,0,0.4)",
          }}
        >
          <Pressable
            style={{ flex: 1 }}
            onPress={() =>
              setVisible(false)
            }
          />

          <View
            style={{
              backgroundColor: "#FFF",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 24,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 50,
                height: 5,
                borderRadius: 10,
                backgroundColor: "#DDD",
                marginBottom: 20,
              }}
            />

            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                marginBottom: 20,
              }}
            >
              Membership QR Code
            </Text>

            <QRCode
              value={userId}
              size={220}
            />

            <Text
              style={{
                marginTop: 16,
                textAlign: "center",
                color: "#666",
              }}
            >
              Present this code during
              check-in or verification
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
}