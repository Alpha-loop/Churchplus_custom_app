import AppButton
from "@/shared/AppButton";

interface Props {
  onPress: () => void;
}

export default function PlayAudioButton({
  onPress,
}: Props) {
  return (
    <AppButton
      title="Play Now"
      onPress={onPress}
    />
  );
}