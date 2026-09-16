import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Like,
  Unlike,
} from "../../../assets/img/like";

import {
  Comment,
} from "../../../assets/img/comment";

import MediaRenderer from "./MediaRenderer";

import { dateUtils } from "../../../utils/date/date.utils";

import { Feed } from "../types/home.types";

interface FeedCardProps {
  feed: Feed;

  onPress: () => void;

  onLikePress: () => void;
}

export default function FeedCard({
  feed,
  onPress,
  onLikePress,
}: FeedCardProps) {
  return (
    <View style={styles.card}>
      <View
        style={styles.header}
      >
        <Text
          style={
            styles.category
          }
        >
          {
            feed.postCategoryName
          }
        </Text>

        <Text
          style={styles.date}
        >
          {dateUtils.relativeDate(
            feed._OrderDate
          )}
        </Text>
      </View>

      {feed.mediaUrl ? (
        <MediaRenderer
          mediaUrl={
            feed.mediaUrl
          }
          type={feed.type}
          style={
            styles.media
          }
        />
      ) : null}

      <TouchableOpacity
        onPress={onPress}
      >
        <Text
          style={styles.title}
        >
          {feed.title}
        </Text>

        <Text
          style={
            styles.content
          }
        >
          {feed.content?.length >
          250
            ? `${feed.content.slice(
                0,
                250
              )}...`
            : feed.content}

          {feed.content
            ?.length > 250 && (
            <Text
              style={
                styles.readMore
              }
            >
              {" "}
              Read more
            </Text>
          )}
        </Text>
      </TouchableOpacity>

      <View
        style={styles.footer}
      >
        <TouchableOpacity
          style={
            styles.action
          }
          onPress={
            onLikePress
          }
        >
          {feed.isLiked ? (
            <Like />
          ) : (
            <Unlike />
          )}

          <Text>
            {
              feed.likeCount
            }
          </Text>
        </TouchableOpacity>

        <View
          style={
            styles.action
          }
        >
          <Comment />

          <Text>
            {
              feed.comments
                ?.length
            }
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    card: {
      backgroundColor:
        "#FFFFFF",

      borderRadius: 12,

      overflow:
        "hidden",

    },

    header: {
      flexDirection:
        "row",

      justifyContent:
        "space-between",

      paddingTop: 20,

      paddingHorizontal: 15,
    },

    category: {
      color:
        "rgba(0,0,0,0.6)",

      fontWeight: "700",

      fontSize: 13,
    },

    date: {
      color:
        "rgba(0,0,0,0.6)",

      fontSize: 13,
    },

    media: {
      marginTop: 10,
    },

    title: {
      fontSize: 16,

      fontWeight: "700",

      color:
        "rgba(0,0,0,0.8)",

      paddingHorizontal: 15,

      marginTop: 10,
    },

    content: {
      paddingHorizontal: 15,

      marginTop: 5,

      lineHeight: 20,

      color:
        "rgba(0,0,0,0.5)",
    },

    readMore: {
      color: "#1146B5",

      fontStyle:
        "italic",
    },

    footer: {
      flexDirection:
        "row",

      alignItems:
        "center",

      paddingHorizontal: 15,

      paddingVertical: 20,

      gap: 20,
    },

    action: {
      flexDirection:
        "row",

      alignItems:
        "center",

      gap: 5,
    },
  });