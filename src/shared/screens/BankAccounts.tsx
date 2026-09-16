import AppHeader
from "@/shared/AppHeader";

import AppScreenLayout
from "@/shared/AppScreenLayout";

import BankAccountHero
from "@/modules/giving/components/BankAccountHero";

import BankAccountCard
from "@/modules/giving/components/BankAccountCard";

import EmptyBankState from "../../modules/giving/components/EmptyBankState";

import useBankAccounts
from "@/modules/giving/hooks/useBankAccounts";

import { View } from "react-native";
import AppLoader from "@/shared/AppLoader";

export default function BankAccountsScreen({
  navigation,
}: any) {
  const {
    banks,
    loading,
  } =
    useBankAccounts();

  if (loading) {
    return <AppLoader />;
  }

  return (
    <>
      <AppHeader
        title="Bank Account"
        onBackPress={() =>
          navigation.goBack()
        }
      />

      <AppScreenLayout
      >
        <View
            style={{
                paddingHorizontal: 15,
            }}
        >
            <BankAccountHero />

            {banks.length >
            0 ? (
            banks.map(
                bank => (
                <BankAccountCard
                    key={bank.id}
                    bank={bank}
                />
                )
            )
            ) : (
            <EmptyBankState />
            )}
        </View>
      </AppScreenLayout>
    </>
  );
}