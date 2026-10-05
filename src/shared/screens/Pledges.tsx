import {
  useState,
} from "react";

import AppHeader
from "@/shared/AppHeader";

import AppScreenLayout
from "@/shared/AppScreenLayout";

import PledgeActionCard
from "@/modules/giving/components/PledgeActionCard";

import AuthenticationRequiredModal
from "@/modules/giving/components/AuthenticationRequiredModal";

import ProfileRequiredModal
from "@/modules/giving/components/ProfileRequiredModal";

import usePledgesAndDonations
from "@/modules/giving/hooks/usePledgesAndDonations";

import { Text, View } from "react-native";

export default function PledgesAndDonationsScreen({
  navigation,
}: any) {
  const {
    actions,
    urlFor,
  } =
    usePledgesAndDonations();

  const [
    authVisible,
    setAuthVisible,
  ] = useState(false);

  const [
    profileVisible,
    setProfileVisible,
  ] = useState(false);

  return (
    <>
      <AppHeader
        title="Pledges & Donation"
        onBackPress={() =>
          navigation.goBack()
        }
      />

      <AppScreenLayout>
        <View
            style={{
                paddingHorizontal: 15,
            }}
        >
            {actions.map(
            action => (
                <PledgeActionCard
                key={
                    action.id
                }
                header={
                    action.header
                }
                subText={
                    action.subText
                }
                imageSource={
                    action.id === 1
                    ? require(
                        "@/assets/img/givingballs.png"
                        )
                    : require(
                        "@/assets/img/pledgeballs.png"
                        )
                }
                onPress={() =>
                  navigation.navigate(
                    "ExternalUrl",
                    {
                      title:
                        action.type === "make"
                          ? "Make A Pledge"
                          : "Redeem A Pledge",

                      // Each action opens its OWN page; both
                      // used to open the make-a-pledge one.
                      uri: urlFor(
                        action.type
                      ),
                    }
                  )
                }
                />
            )
            )}

            {actions.length === 0 ? (
              <Text
                style={{
                  textAlign: "center",

                  marginTop: 40,

                  color: "#8E8E93",
                }}
              >
                Pledges haven't been
                set up for this church
                yet.
              </Text>
            ) : null}
        </View>
      </AppScreenLayout>

      <AuthenticationRequiredModal
        visible={
          authVisible
        }
        onLogin={() =>
          navigation.navigate(
            "Login"
          )
        }
        onSignup={() =>
          navigation.navigate(
            "Register"
          )
        }
        onClose={() =>
          setAuthVisible(
            false
          )
        }
      />

      <ProfileRequiredModal
        visible={
          profileVisible
        }
        onUpdateProfile={() =>
          navigation.navigate(
            "ManageProfile"
          )
        }
        onClose={() =>
          setProfileVisible(
            false
          )
        }
      />
    </>
  );
}