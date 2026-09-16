import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props {
  churchName: string;

  churchLogo?: string;
}

export default function ChurchProfileHeader({
  churchName,
  churchLogo,
}: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            churchLogo ||
            "https://via.placeholder.com/100",
        }}
        style={styles.logo}
      />

      <Text style={styles.name}>
        {churchName}
      </Text>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginVertical: 20,
      width: "40%",
      alignSelf: "center",
    },

    logo: {
      width: 100,
      height: 100,
      alignSelf: "center",
    },

    name: {
      textAlign: "center",
      marginTop: 5,
    },
  });