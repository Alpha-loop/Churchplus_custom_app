import React from "react";

import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AppHeader from "@/shared/AppHeader";

import AppScreenLayout from "@/shared/AppScreenLayout";

import useConnectionProfile from "@/modules/social/hooks/useConnectionProfile";

export default function ConnectionProfileScreen({
  navigation,
  route,
}: any) {
  const { userId } =
    route.params;

    console.log(userId, "This is the route.params")

  const {
    loading,
    profile,
    posts,
    connectionState,
    connect,
  } =
    useConnectionProfile(
      userId
    );

  if (loading) {
    return (
      <View
        style={
          styles.loader
        }
      >
        <ActivityIndicator
          size="large"
        />
      </View>
    );
  }

  return (
    <>
      <AppHeader
        title="Profile"
        onBackPress={() =>
          navigation.goBack()
        }
      />

      <AppScreenLayout>
        <View
          style={
            styles.container
          }
        >
          {/* PROFILE HEADER */}

          <View
            style={
              styles.centerContent
            }
          >
            <Image
              source={
                profile?.pictureUrl
                  ? {
                      uri:
                        profile.pictureUrl,
                    }
                  : require(
                      "@/assets/img/avatar.png"
                    )
              }
              style={
                styles.avatar
              }
            />

            <Text
              style={
                styles.name
              }
            >
              {profile?.name ||
                ""}
            </Text>

            <Text
              style={
                styles.bio
              }
            >
              {profile?.about ||
                ""}
            </Text>
          </View>

          {/* INFO CARD */}

          <View
            style={
              styles.infoCard
            }
          >
            <View
              style={
                styles.row
              }
            >
              <Text
                style={
                  styles.label
                }
              >
                Occupation:
              </Text>

              <Text
                style={
                  styles.value
                }
              >
                {profile?.occupation ||
                  "-"}
              </Text>
            </View>

            <View
              style={
                styles.row
              }
            >
              <Text
                style={
                  styles.label
                }
              >
                Marital
                Status:
              </Text>

              <Text
                style={
                  styles.value
                }
              >
                {profile
                  ?.maritalStatus
                  ?.name ||
                  "-"}
              </Text>
            </View>

            <View
              style={
                styles.row
              }
            >
              <Text
                style={
                  styles.label
                }
              >
                Ministry:
              </Text>

              <Text
                style={
                  styles.value
                }
              >
                {profile?.ministry ||
                  "-"}
              </Text>
            </View>
          </View>

          {/* ACTION BUTTONS */}

          <View
            style={
              styles.actionRow
            }
          >
            <TouchableOpacity
              style={
                styles.messageButton
              }
              onPress={() =>
                navigation.navigate(
                  "UserChat",
                  {
                    userId,

                    name:
                      profile?.name,
                  }
                )
              }
            >
              <Text
                style={
                  styles.messageText
                }
              >
                Send Message
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.connectButton,

                connectionState ===
                "connected"
                  ? {
                      backgroundColor:
                        "#06AF3F",
                    }
                  : connectionState ===
                    "requested"
                  ? {
                      backgroundColor:
                        "#586A5E",
                    }
                  : {
                      backgroundColor:
                        "#FFFFFF",

                      borderWidth:
                        1,

                      borderColor:
                        "#109655",
                    },
              ]}
              disabled={
                connectionState !==
                "not_connected"
              }
              onPress={
                connect
              }
            >
              <Text
                style={{
                  color:
                    connectionState ===
                    "not_connected"
                      ? "#109655"
                      : "#FFFFFF",

                  fontWeight:
                    "700",
                }}
              >
                {connectionState ===
                "connected"
                  ? "Connected"
                  : connectionState ===
                    "requested"
                  ? "Requested"
                  : "Connect"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* POSTS */}

          <Text
            style={
              styles.postsHeader
            }
          >
            Posts (
            {
              posts.length
            }
            )
          </Text>

          <FlatList
            scrollEnabled={
              false
            }
            data={posts}
            keyExtractor={(
              item,
              index
            ) =>
              item.postId ??
              index.toString()
            }
            renderItem={({
              item,
            }) => (
              <TouchableOpacity
                style={
                  styles.postCard
                }
              >
                <Text
                  style={
                    styles.postAuthor
                  }
                >
                  {item
                    ?.poster
                    ?.name ||
                    profile?.name}
                </Text>

                <Text
                  style={
                    styles.postContent
                  }
                >
                  {
                    item.content
                  }
                </Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text
                style={
                  styles.emptyText
                }
              >
                No posts
                available
              </Text>
            }
          />
        </View>
      </AppScreenLayout>
    </>
  );
}

const styles =
  StyleSheet.create({
    container: {
      padding: 15,
    },

    loader: {
      flex: 1,

      justifyContent:
        "center",

      alignItems:
        "center",
    },

    centerContent: {
      alignItems:
        "center",
    },

    avatar: {
      width: 90,

      height: 90,

      borderRadius: 45,
    },

    name: {
      marginTop: 10,

      fontSize: 18,

      fontWeight:
        "700",

      color:
        "#0E5CBA",
    },

    bio: {
      marginTop: 5,

      color:
        "#555",
      textAlign:
        "center",
    },

    infoCard: {
      marginTop: 20,

      padding: 15,

      borderRadius: 10,

      backgroundColor:
        "#F8F8F8",

      borderWidth: 1,

      borderColor:
        "#EFEFEF",
    },

    row: {
      flexDirection:
        "row",

      marginBottom: 8,
    },

    label: {
      fontWeight:
        "700",

      marginRight: 5,
    },

    value: {
      flex: 1,
    },

    actionRow: {
      flexDirection:
        "row",

      justifyContent:
        "center",

      marginTop: 20,

      gap: 10,
    },

    messageButton: {
      backgroundColor:
        "#0871D1",

      paddingHorizontal:
        20,

      paddingVertical: 12,

      borderRadius: 25,
    },

    messageText: {
      color:
        "#FFF",

      fontWeight:
        "700",
    },

    connectButton: {
      paddingHorizontal:
        20,

      paddingVertical: 12,

      borderRadius: 25,
    },

    postsHeader: {
      marginTop: 25,

      marginBottom: 15,

      fontSize: 16,

      fontWeight:
        "700",
    },

    postCard: {
      paddingVertical: 15,

      borderBottomWidth: 1,

      borderBottomColor:
        "#EFEFEF",
    },

    postAuthor: {
      fontWeight:
        "700",

      marginBottom: 5,
    },

    postContent: {
      color: "#333",
    },

    emptyText: {
      textAlign:
        "center",

      marginTop: 20,

      color: "#999",
    },
  });