import React from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import {
  Swipeable,
} from "react-native-gesture-handler";

import {
  Like,
  Unlike,
} from "@/assets/img/like";

interface Props {
  item: any;

  index: number;

  currentUserId?: string;

  onLike: (
    item: any,
    index: number
  ) => void;

  onDelete: (
    postId: string,
    posterUserId: string
  ) => void;

  onPress: (
    item: any
  ) => void;
}

export default function SocialFeedCard({
  item,
  index,
  currentUserId,
  onLike,
  onDelete,
  onPress,
}: Props) {
  const renderRightActions =
    () => {
      if (
        item?.poster?.id !==
        currentUserId
      ) {
        return null;
      }

      return (
        <TouchableOpacity
          style={{
            backgroundColor:
              "#E53935",

            width: 90,

            justifyContent:
              "center",

            alignItems:
              "center",

            borderRadius: 10,

            marginVertical: 10,
          }}
          onPress={() =>
            onDelete(
              item.postId,
              item.poster?.id
            )
          }
        >
          <Text
            style={{
              color:
                "#FFFFFF",

              fontWeight:
                "700",
            }}
          >
            Delete
          </Text>
        </TouchableOpacity>
      );
    };

  return (
    <Swipeable
      renderRightActions={
        renderRightActions
      }
      overshootRight={
        false
      }
    >
      <View
        style={{
          flexDirection:
            "row",

          marginTop: 15,
        }}
      >
        <Image
          source={
            item?.poster
              ?.pictureUrl
              ? {
                  uri: item
                    .poster
                    .pictureUrl,
                }
              : require(
                  "@/assets/img/avatar.png"
                )
          }
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
          }}
        />

        <View
          style={{
            flex: 1,

            marginLeft: 10,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              onPress(item)
            }
          >
            <View
              style={{
                flexDirection:
                  "row",

                justifyContent:
                  "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    fontWeight:
                      "700",
                  }}
                >
                  {
                    item
                      ?.poster
                      ?.name
                  }
                </Text>

                <Text
                  style={{
                    opacity:
                      0.6,

                    fontSize:
                      12,
                  }}
                >
                  {item
                    ?.poster
                    ?.about ||
                    ""}
                </Text>
              </View>

              <Text
                style={{
                  fontSize:
                    12,

                  opacity:
                    0.5,
                }}
              >
                {
                  item.dateEntered
                }
              </Text>
            </View>

            <Text
              style={{
                marginTop: 10,
              }}
            >
              {
                item.content
              }
            </Text>

            {item.mediaUrl ? (
              <Image
                source={{
                  uri: item.mediaUrl,
                }}
                style={{
                  width:
                    "100%",

                  height:
                    220,

                  borderRadius:
                    10,

                  marginTop:
                    10,
                }}
                resizeMode="cover"
              />
            ) : null}
          </TouchableOpacity>

          <View
            style={{
              flexDirection:
                "row",

              marginTop: 12,

              alignItems:
                "center",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                onLike(
                  item,
                  index
                )
              }
              style={{
                flexDirection:
                  "row",

                alignItems:
                  "center",
              }}
            >
              {item.isLiked ? (
                <Like />
              ) : (
                <Unlike />
              )}

              <Text
                style={{
                  marginLeft:
                    5,
                }}
              >
                {
                  item.likeCount
                }
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Swipeable>
  );
}