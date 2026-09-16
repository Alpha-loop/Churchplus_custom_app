import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  header: string;

  subText: string;

  imageSource: any;

  onPress: () => void;
}

export default function PledgeActionCard({
  header,
  subText,
  imageSource,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View
        style={styles.card}
      >
        <Image
          source={imageSource}
          style={styles.image}
        />

        <Text style={styles.header}>
          {header}
        </Text>

        <Text style={styles.subText}>
          {subText}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles =
  StyleSheet.create({
    card: {
      borderRadius: 15,
      padding: 20,
      marginTop: 20,
      backgroundColor:
        "#124191",
    },

    image: {
      width: 80,
      height: 80,
      position:
        "absolute",
      right: 20,
      top: 20,
    },

    header: {
      color: "#FFF",
      fontSize: 18,
      fontWeight:
        "700",
    },

    subText: {
      color: "#FFF",
      marginTop: 5,
    },
  });