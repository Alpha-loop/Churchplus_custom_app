import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  FeedDetail,
} from "../types/feed-details.types";

interface Props {
  feed: FeedDetail;
}

export default function FeedHero({
  feed,
}: Props) {
  return (
    <>
      {/* <Image
        source={{
          uri:
            feed.mediaUrl,
        }}
        style={
          styles.image
        }
      /> */}

      <View
        style={
          styles.content
        }
      >
        <Text
          style={
            styles.title
          }
        >
          {feed.title}
        </Text>

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
          style={
            styles.date
          }
        >
          {
            feed.createdDate
          }
        </Text>
      </View>
    </>
  );
}

const styles =
  StyleSheet.create({
    image: {
      width: "100%",

      height: 220,
    },

    content: {
      padding: 15,
    },

    title: {
      fontSize: 15,

      fontWeight: "500",

      color: 'blue'
    },

    category: {
      marginTop: 10,

      fontSize: 16,
    },

    date: {
      marginTop: 5,

      color: "#777",
    },
  });