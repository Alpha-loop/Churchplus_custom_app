import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  DonationCategory,
} from "../types/giving.types";

interface Props {
  category:
    DonationCategory;

  onPress: () => void;
}

export default function DonationCategoryCard({
  category,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View
        style={
          styles.card
        }
      >
        <View
          style={
            styles.row
          }
        >
          <Image
            source={require(
              "@/assets/img/donation.png"
            )}
            style={
              styles.icon
            }
          />

          <Text
            style={
              styles.label
            }
          >
            Donation Name:
          </Text>
        </View>

        <Text
          style={
            styles.title
          }
        >
          {category.name}
        </Text>

        <View
          style={
            styles.providers
          }
        >
          <Image
            source={require(
              "@/assets/img/fw.png"
            )}
            style={
              styles.provider
            }
          />

          <Image
            source={require(
              "../../../assets/img/paystacklogo.png"
            )}
            style={
              styles.provider
            }
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles =
  StyleSheet.create({
    card: {
      backgroundColor:
        "#F8F8F8",

      borderWidth: 1,

      borderColor:
        "#E5E5E5",

      borderRadius:
        10,

      padding: 15,

      marginBottom:
        20,
    },

    row: {
      flexDirection:
        "row",

      alignItems:
        "center",
    },

    icon: {
      width: 20,

      height: 20,
    },

    label: {
      marginLeft: 20,

      fontSize: 12,
    },

    title: {
      fontSize: 18,

      fontWeight:
        "700",

      textAlign:
        "center",

      marginVertical:
        15,
    },

    providers: {
      flexDirection:
        "row",

      justifyContent:
        "flex-end",
    },

    provider: {
      width: 80,

      height: 15,
    },
  });