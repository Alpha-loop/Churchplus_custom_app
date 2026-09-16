import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import {
  Button,
} from "react-native-paper";

interface Props {
  item: any;

  onAccept: () => void;

  onDecline: () => void;

  navigation: any;
}

export default function NotificationRequestCard({
  item,
  onAccept,
  onDecline,
  navigation,
}: Props) {
  return (
    <View
      style={{
        backgroundColor:
          "#F6F6F6",

        borderRadius: 12,

        padding: 15,

        marginBottom: 15,
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "ConnectionProfile",
              {
                id:
                  item
                    ?.friendRequester
                    ?.id,
              }
            )
          }
        >
          <Image
            source={
              item
                ?.friendRequester
                ?.pictureUrl
                ? {
                    uri:
                      item
                        .friendRequester
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
        </TouchableOpacity>

        <View
          style={{
            marginLeft: 10,
            flex: 1,
          }}
        >
          <Text
            style={{
              fontWeight:
                "700",
            }}
          >
            {
              item
                ?.friendRequester
                ?.name
            }
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection:
            "row",

          marginTop: 15,

          gap: 10,
        }}
      >
        <Button
          mode="contained"
          buttonColor="#F76976"
          onPress={onDecline}
        >
          Decline
        </Button>

        <Button
          mode="contained"
          buttonColor="#1146B5"
          onPress={onAccept}
        >
          Accept
        </Button>
      </View>
    </View>
  );
}