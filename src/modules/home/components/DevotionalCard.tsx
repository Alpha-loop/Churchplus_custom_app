import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  LinearGradient,
} from "expo-linear-gradient";

import {
  useNavigation,
} from "@react-navigation/native";

import FeedCard from "./FeedCard";

import {
  Feed,
} from "../types/home.types";

interface DevotionalCardProps {
  devotional?: {
    title: string,
    mediaUrl: string,
  };

  churchFeeds?: Feed[];

  userInfo?: any;

  onLikePress?: (
    feed: Feed,
    index: number
  ) => void;
}

export default function DevotionalCard({
  devotional,

  churchFeeds = [],

  userInfo,

  onLikePress,
}: DevotionalCardProps) {
  const navigation =
    useNavigation<any>();

  if (devotional) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[
            "rgba(168,108,37,0)",
            "#B28E28",
          ]}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 0,
            y: 1,
          }}
          style={
            styles.gradient
          }
        />

        <Image
          source={
            devotional.mediaUrl
              ? {
                  uri: devotional.mediaUrl,
                }
              : require("../../../assets/img/familydevotion.png")
          }
          style={
            styles.image
          }
        />

        <View
          style={
            styles.overlay
          }
        >
          <View
            style={
              styles.badge
            }
          >
            <Text
              style={
                styles.badgeText
              }
            >
              Today's Devotion
            </Text>
          </View>

          <Text
            style={
              styles.title
            }
          >
            {
              devotional.title
            }
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                "TodayDevotional",
                {
                  // Was `data: devotional` — a copy-paste from
                  // Modern's own version of this same navigate
                  // call. This component is Classic's, and
                  // Classic's TodayDevotionalScreen.tsx
                  // destructures `route.params.devotion`, not
                  // `.data` — so `devotion` was always undefined
                  // here, throwing "Cannot read property
                  // 'memoryVerse' of undefined" the moment that
                  // screen tried to read devotion.memoryVerse.
                  // DevotionalLibraryScreen.tsx's own "Previous
                  // Devotions" list already sends the right param
                  // name; this call just hadn't matched it.
                  devotion:
                    devotional,
                }
              )
              
            }
          >
            <View
              style={
                styles.readMoreButton
              }
            >
              <Text
                style={
                  styles.readMoreText
                }
              >
                Read more
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (
    churchFeeds &&
    churchFeeds.length > 0
  ) {
    return (
      <View
        style={{
          marginTop: 20,
        }}
      >
        <FeedCard
          feed={churchFeeds[0]}
          onPress={() =>
            navigation.navigate(
              "FeedsDetail",
              {
                id: churchFeeds[0]
                  .postId,
              }
            )
          }
          onLikePress={() =>
            onLikePress?.(
              churchFeeds[0],
              0
            )
          }
        />
      </View>
    );
  }

  return null;
}

const styles =
  StyleSheet.create({
    container: {
      marginTop: 15,

      borderRadius: 15,

      overflow:
        "hidden",
    },

    image: {
      width: "100%",

      height: 200,

      borderRadius: 15,
    },

    gradient: {
      position:
        "absolute",

      top: 0,

      left: 0,

      right: 0,

      bottom: 0,

      zIndex: 1,

      borderRadius: 15,
    },

    overlay: {
      position:
        "absolute",

      top: 70,

      width: "100%",

      alignItems:
        "center",

      zIndex: 2,
    },

    badge: {
      backgroundColor:
        "#FFFFFF",

      borderRadius: 15,

      paddingHorizontal:
        15,

      paddingVertical: 5,
    },

    badgeText: {
      color: "#000",

      fontSize: 12,

      fontWeight: "600",
    },

    title: {
      marginTop: 5,

      textAlign:
        "center",

      color:
        "rgba(244,244,244,1)",

      fontSize: 16,

      fontWeight: "800",

      paddingHorizontal:
        20,
    },

    readMoreButton: {
      marginTop: 10,

      borderWidth: 1,

      borderColor:
        "#FFFFFF",

      borderRadius: 20,

      paddingHorizontal:
        20,

      paddingVertical: 6,
    },

    readMoreText: {
      color: "#FFFFFF",

      fontWeight: "600",
    },
  });