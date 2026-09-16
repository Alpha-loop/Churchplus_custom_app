import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Circle,
  CircleCheck,
} from "lucide-react-native";

import {
  LinearGradient,
} from "expo-linear-gradient";

interface Props {
  index: number;

  title: string;

  subtitle: string;

  icon: ImageSourcePropType;

  selected?: boolean;

  onPress: () => void;
}

export default function GiveCard({
  index,

  title,

  subtitle,

  icon,

  selected = false,

  onPress,
}: Props) {
  const gradientColors: [
  string,
  string,
  ...string[]
] =
    index === 0
      ? [
          "rgba(8,137,255,1)",
          "rgba(18,65,145,1)",
        ]
      : index === 1
      ? [
          "rgba(77,13,60,1)",
          "rgba(132,28,47,1)",
          "rgba(154,24,48,1)",
        ]
      : [
          "rgba(124,234,73,1)",
          "rgba(3,41,7,1)",
        ];

  const backgroundImage =
    index === 0
      ? require("../../../assets/img/givingballs.png")
      : index === 2
      ? require("../../../assets/img/pledgeballs.png")
      : require("../../../assets/img/give_bg.png");

  if (selected) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
      >
        <LinearGradient
          colors={
            gradientColors
          }
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 0,
            y: 1,
          }}
          style={
            styles.selectedCard
          }
        >
          <Image
            source={
              backgroundImage
            }
            style={
              styles.backgroundImage
            }
          />

          <View
            style={
              styles.topRow
            }
          >
            <Image
              source={icon}
            />

            <CircleCheck
              size={24}
              color="#FFFFFF"
            />
          </View>

          <View
            style={
              styles.textContainer
            }
          >
            <Text
              style={
                styles.selectedTitle
              }
            >
              {title}
            </Text>

            <Text
              style={
                styles.selectedSubtitle
              }
            >
              {subtitle}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={
        styles.unselectedCard
      }
      onPress={onPress}
    >
      <View
        style={styles.topRow}
      >
        <Image source={icon} />

        <Circle
          size={23}
          color="#000"
        />
      </View>

      <View
        style={
          styles.textContainer
        }
      >
        <Text
          style={
            styles.unselectedTitle
          }
        >
          {title}
        </Text>

        <Text
          style={
            styles.unselectedSubtitle
          }
        >
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles =
  StyleSheet.create({
    selectedCard: {
      borderRadius: 20,

      padding: 15,

      marginTop: 15,

      overflow:
        "hidden",
    },

    unselectedCard: {
      marginTop: 15,

      borderWidth: 1,

      borderColor:
        "rgba(0,0,0,0.4)",

      padding: 15,

      borderRadius: 15,

      backgroundColor:
        "#FFFFFF",
    },

    backgroundImage: {
      position:
        "absolute",

      right: 50,

      top: 20,

      zIndex: 1,
    },

    topRow: {
      flexDirection:
        "row",

      justifyContent:
        "space-between",

      alignItems:
        "center",

      zIndex: 2,
    },

    textContainer: {
      marginTop: 15,

      zIndex: 2,
    },

    selectedTitle: {
      marginTop: 40,

      fontSize: 18,

      fontWeight: "700",

      color: "#FFFFFF",
    },

    selectedSubtitle: {
      marginTop: 4,

      fontSize: 13,

      color: "#FFFFFF",
    },

    unselectedTitle: {
      marginTop: 40,

      fontSize: 18,

      fontWeight: "700",

      color: "#000000",
    },

    unselectedSubtitle: {
      marginTop: 4,

      fontSize: 13,

      color:
        "rgba(57,57,57,0.7)",
    },
  });