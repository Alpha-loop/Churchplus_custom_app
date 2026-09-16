import {
  View,
} from "react-native";

import AppButton
from "@/shared/AppButton";

interface Props {
  onLocationPress: () => void;

  onQRCodePress: () => void;
}

export default function EventCheckinActions({
  onLocationPress,
  onQRCodePress,
}: Props) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingBottom: 20,
      }}
    >
      <AppButton
        title="Location Based Check-In"
        onPress={
          onLocationPress
        }
        
        
      />
      <View style={{height: 15}} />
      <AppButton
        title="Scan QR Code"
        onPress={
          onQRCodePress
        }
        variant="checkin"
      />
    </View>
  );
}