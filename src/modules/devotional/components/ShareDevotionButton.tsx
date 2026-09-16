import AppButton
from "@/shared/AppButton";

interface Props {
  onPress: () => void;
}

export default function ShareDevotionButton({
  onPress,
}: Props) {
  return (
    <AppButton
      title="Share Devotion"
      onPress={onPress}
    />
  );
}