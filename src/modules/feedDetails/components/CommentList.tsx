import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CommentItem from "./CommentItem";

import {
  FeedComment,
} from "../types/comment.types";

interface Props {
  comments: FeedComment[];

  expanded: boolean;

  onToggle: () => void;
}

export default function CommentList({
  comments,
  expanded,
  onToggle,
}: Props) {
  return (
    <View
      style={styles.container}
    >
      <Text
        style={styles.header}
      >
        Showing all comments (
        {comments.length})
      </Text>

      {comments.length >
      0 ? (
        comments.map(
          (
            comment,
            index
          ) => (
            <CommentItem
              key={
                index
              }
              comment={
                comment
              }
            />
          )
        )
      ) : (
        <Text>
          No comments yet
        </Text>
      )}

      {comments.length >
        5 && (
        <TouchableOpacity
          onPress={
            onToggle
          }
        >
          <Text
            style={
              styles.showMore
            }
          >
            {expanded
              ? "Show Less Comments"
              : "Show All Comments"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      marginTop: 30,
    },

    header: {
      fontWeight: "600",
    },

    showMore: {
      marginTop: 15,

      textAlign:
        "center",

      fontWeight:
        "600",
    },
  });