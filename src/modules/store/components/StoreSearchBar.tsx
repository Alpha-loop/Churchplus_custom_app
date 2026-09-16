import AppInput from "@/shared/AppInput";

interface Props {
  value: string;

  onChangeText: (
    text: string
  ) => void;
}

export default function StoreSearchBar({
  value,
  onChangeText,
}: Props) {
  return (
    <AppInput
      placeholder="Search for videos, audios, books..."
      value={value}
      onChangeText={
        onChangeText
      }
    />
  );
}