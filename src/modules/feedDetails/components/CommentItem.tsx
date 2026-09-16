import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  FeedComment,
} from "../types/comment.types";

interface Props {
  comment: FeedComment;
}

export default function CommentItem({
  comment,
}: Props) {
  return (
    <View
      style={styles.row}
    >
      <Image
        source={
          comment.commenterPicture
            ? {
                uri:
                  comment.commenterPicture,
              }
            : require("@/assets/img/avatar.png")
        }
        style={styles.avatar}
      />

      <View
        style={styles.content}
      >
        <Text
          style={styles.name}
        >
          {
            comment.commenterName
          }
        </Text>

        <Text
          style={styles.date}
        >
          {
            comment.commentDate
          }
        </Text>

        <Text
          style={styles.message}
        >
          {
            comment.commentMessage
          }
        </Text>
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    row: {
      flexDirection:
        "row",

      gap: 10,

      marginTop: 15,

      paddingBottom: 15,

      borderBottomWidth: 1,

      borderBottomColor:
        "rgba(0,0,0,0.1)",
    },

    avatar: {
      width: 40,

      height: 40,

      borderRadius: 20,
    },

    content: {
      flex: 1,
    },

    name: {
      fontWeight: "600",
    },

    date: {
      color:
        "rgba(0,0,0,0.5)",

      fontSize: 12,
    },

    message: {
      marginTop: 5,

      color:
        "rgba(0,0,0,0.7)",
    },
  });