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

import { View } from "react-native";

export default function PledgesAndDonationsScreen({
  navigation,
}: any) {
  const {
    actions,
    pledgeUrl,
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
                onPress={() => {
                  if (!pledgeUrl) {
                    return;
                  }

                  navigation.navigate(
                    "ExternalUrl",
                    {
                      title:
                        action.type === "make"
                          ? "Make A Pledge"
                          : "Redeem A Pledge",

                      uri: pledgeUrl,
                    }
                  );
                }}
                />
            )
            )}
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