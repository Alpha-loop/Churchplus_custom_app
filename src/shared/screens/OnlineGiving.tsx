import AppHeader
from "@/shared/AppHeader";

import AppScreenLayout
from "@/shared/AppScreenLayout";

import GivingHero
from "@/modules/giving/components/GivingHero";

import DonationCategoriesList
from "@/modules/giving/components/DonationCategoriesList";

import useOnlineGiving
from "@/modules/giving/hooks/useOnlineGiving";

import { View } from "react-native";

export default function OnlineGivingScreen({
  navigation,
}: any) {
  const {
    categories,
  } =
    useOnlineGiving();

  const openCategory =
    (
      category: any
    ) => {
      navigation.navigate(
        "ExternalUrl",
        {
          title:
            category.name,

          uri:
            `https://my.churchplus.co/give/${category.id}`,
        }
      );
    };

  return (
    <>
      <AppHeader
        title="Online Giving"
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
            <GivingHero />

            <DonationCategoriesList
            categories={
                categories
            }
            onSelect={
                openCategory
            }
            />
        </View>
      </AppScreenLayout>
    </>
  );
}