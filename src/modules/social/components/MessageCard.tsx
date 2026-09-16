import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

interface Props {
  item: any;
  currentUserId: string;
  onPress: () => void;
}

export default function MessageCard({
  item,
  currentUserId,
  onPress,
}: Props) {
  const otherUser =
    item?.sender?.id ===
    currentUserId
      ? item?.reciever
      : item?.sender;

  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View
        style={{
          backgroundColor:
            "#F6F6F6",

          borderRadius: 12,

          padding: 15,

          marginBottom: 12,

          flexDirection:
            "row",

          justifyContent:
            "space-between",

          alignItems:
            "center",
        }}
      >
        <View
          style={{
            flexDirection:
              "row",

            alignItems:
              "center",
          }}
        >
          <Image
            source={
              otherUser
                ?.pictureUrl
                ? {
                    uri:
                      otherUser.pictureUrl,
                  }
                : require(
                    "@/assets/img/avatar.png"
                  )
            }
            style={{
              width: 45,
              height: 45,
              borderRadius: 22,
            }}
          />

          <View
            style={{
              marginLeft: 10,
            }}
          >
            <Text
              style={{
                fontWeight:
                  "700",
              }}
            >
              {
                otherUser?.name
              }
            </Text>

            <Text
              numberOfLines={
                1
              }
            >
              {item?.messages
                ?.text ||
                "Start a conversation"}
            </Text>
          </View>
        </View>

        {item.unreadMessages >
        0 ? (
          <View
            style={{
              backgroundColor:
                "#1146B5",

              width: 24,

              height: 24,

              borderRadius: 12,

              justifyContent:
                "center",

              alignItems:
                "center",
            }}
          >
            <Text
              style={{
                color:
                  "#FFF",
              }}
            >
              {
                item.unreadMessages
              }
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}