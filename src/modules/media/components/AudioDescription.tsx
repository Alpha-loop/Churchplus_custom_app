import {
  Text,
} from "react-native";

interface Props {
  description?: string;
}

export default function AudioDescription({
  description,
}: Props) {
  return (
    <Text
      style={{
        marginTop: 15,
        lineHeight: 22,
        color:
          "#555",
      }}
    >
      {description}
    </Text>
  );
}