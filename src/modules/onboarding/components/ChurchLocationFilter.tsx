// ChurchLocationFilter.tsx

import { LocateIcon } from "lucide-react-native";
import SearchInput
from "./ChurchSearchBar";

interface Props {
  value: string;

  onChangeText: (
    text: string
  ) => void;
}

export default function ChurchLocationFilter({
  value,
  onChangeText,
}: Props) {
  return (
    <SearchInput
      placeholder="Location"
      icon={<LocateIcon size={20} color="#666" />}
      value={value}
      onChangeText={
        onChangeText
      }
    />
  );
}