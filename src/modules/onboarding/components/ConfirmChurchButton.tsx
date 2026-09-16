import AppButton
from "@/shared/AppButton";

interface Props {
  onPress: () => void;
}

export default function ConfirmChurchButton({
  onPress,
}: Props) {
  return (
    <AppButton
      title="This is my church"
      onPress={onPress}
    />
  );
}