import {
  Text,
  View,
} from "react-native";

import PaymentOptionCard
from "./PaymentOptionCard";

interface Props {
  onFlutterwave: () => void;

  onPaystack: () => void;

  onBankTransfer: () => void;
}

export default function PaymentOptionsSection({
  onFlutterwave,
  onPaystack,
  onBankTransfer,
}: Props) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          textAlign:
            "center",
          marginBottom:
            20,
        }}
      >
        Select Payment Option
      </Text>

      <PaymentOptionCard
        imageSource={require(
          "@/assets/img/flutterw.png"
        )}
        onPress={
          onFlutterwave
        }
      />

      <PaymentOptionCard
        imageSource={require(
          "@/assets/img/paystack.png"
        )}
        onPress={onPaystack}
      />

      <PaymentOptionCard
        imageSource={require(
          "@/assets/img/alart.png"
        )}
        onPress={
          onBankTransfer
        }
      />
    </View>
  );
}