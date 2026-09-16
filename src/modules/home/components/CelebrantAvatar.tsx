import {
  Image,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";

interface Props {
  data: any;

  allCelebrants: any[];
}

export default function CelebrantAvatar({
  data,
  allCelebrants,
}: Props) {
  const navigation =
    useNavigation<any>();

  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "Celebrants",
            {
              data:
                allCelebrants,
            }
          )
        }
      >
        <Image
          source={
            data.photo
              ? {
                  uri:
                    data.photo,
                }
              : require("../../../assets/img/avatar.png")
          }
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}