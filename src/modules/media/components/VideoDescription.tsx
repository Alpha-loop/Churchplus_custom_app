import {
  Text,
} from "react-native";

interface Props {
  description?: string;
}

export default function VideoDescription({
  description,
}: Props) {
  return (
    <Text
      style={{
        marginTop: 10,
        color: "#555",
      }}
    >
      {description}
    </Text>
  );
}