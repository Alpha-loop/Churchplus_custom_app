import {
  View,
  Text,
} from "react-native";

import {
  TextInput,
  Button,
} from "react-native-paper";

import AppHeader from "@/shared/AppHeader";

import AppScreenLayout from "@/shared/AppScreenLayout";

import useCreatePost from "@/modules/social/hooks/useCreatePost";

import CreatePostSuccessModal from "@/modules/social/components/CreatePostSuccessModal";
import { Rocket } from "lucide-react-native";

export default function CreatePostScreen({
  navigation,
}: any) {
  const {
    title,

    setTitle,

    content,

    setContent,

    loading,

    publishPost,

    successVisible,

    setSuccessVisible,
  } =
    useCreatePost();

  return (
    <>
      <AppHeader
        title="Create Post"
        onBackPress={() =>
          navigation.goBack()
        }
      />

      <AppScreenLayout>
        <View
          style={{
            paddingHorizontal: 15,

            paddingTop: 50,

            flex: 1,
            
          }}
        >
          <>
            <Text
              style={{
                fontSize: 18,

                fontWeight:
                  "700",

                marginBottom:
                  15,
              }}
            >
              Share an idea
            </Text>

            <TextInput
              mode="outlined"
              value={title}
              onChangeText={
                setTitle
              }
              style={{
                marginBottom: 15,
              }}
              placeholder="Title"
            />

            <TextInput
              mode="outlined"
              multiline
              numberOfLines={8}
              value={content}
              onChangeText={
                setContent
              }
              style={{
                minHeight: 150,
              }}
              placeholder="Write up to 1,500 words"
            />
          </>
        </View>
      </AppScreenLayout>

      <View
        style={{
          paddingHorizontal: 15,

          paddingBottom: 20,
        }}
      >
        <Button
          mode="contained"
          loading={loading}
          onPress={
            publishPost
          }
          style={{
            backgroundColor: 'blue',
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'center',
            alignItems: 'center',

          }}
        >
          Publish
          <Rocket color='#fff' size={16} />
        </Button>
      </View>

      <CreatePostSuccessModal
        visible={
          successVisible
        }
        onClose={() => {
          setSuccessVisible(
            false
          );

          navigation.goBack();
        }}
      />
    </>
  );
}