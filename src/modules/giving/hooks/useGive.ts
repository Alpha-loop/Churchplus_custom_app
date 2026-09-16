import {
  useEffect,
  useState,
} from "react";

import {
  GiveCardItem,
} from "../types/give.types";

// import { ChurchProfile } from "../services/give.service";

export default function useGive(
  navigation: any
) {
  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    onlineContribution,
    setOnlineContribution,
  ] = useState<any[]>(
    []
  );

  const [
    banks,
    setBanks,
  ] = useState<any[]>([]);

  const [
    pledgeUrl,
    setPledgeUrl,
  ] = useState("");

  const [
    makePledgeUrl,
    setMakePledgeUrl,
  ] = useState("");

  const [
    giveCards,
    setGiveCards,
  ] = useState<
    GiveCardItem[]
  >([
    {
      header:
        "Online Giving",

      subText:
        "Pay with Secure payment gateways",

      icon: require("../../../assets/img/card.png"),

      selected: false,
    },

    {
      header:
        "Bank Account",

      subText:
        "Pay to bank account number",

      icon: require("../../../assets/img/bank.png"),

      selected: false,
    },

    {
      header:
        "Pledges & Donations",

      subText:
        "Redeem pledges and donations",

      icon: require("../../../assets/img/donation.png"),

      selected: false,
    },
  ]);

  useEffect(() => {
    getChurchProfile();
  }, []);

  /**
   * TEMP MOCK API
   */
  const getChurchProfile =
    async () => {
      setLoading(true);

      try {
        /**
         * Replace later
         */

        // const { data } =
        //   await ChurchProfile();

        const data = {
          returnObject: {
            pledgePromiseUrl:
              "https://example.com/make-pledge",

            pledgeDueUrl:
              "https://example.com/redeem-pledge",

            onlineDonations:
              [],

            banks: [],
          },
        };

        setMakePledgeUrl(
          data.returnObject
            .pledgePromiseUrl
        );

        setPledgeUrl(
          data.returnObject
            .pledgeDueUrl
        );

        setOnlineContribution(
          data.returnObject
            .onlineDonations
        );

        setBanks(
          data.returnObject
            .banks
        );

        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.log(
          error
        );
      }
    };

  /**
   * Handle card click
   */
  const onCardPress = (
    index: number
  ) => {
    const updatedCards =
      giveCards.map(
        (
          item,
          i
        ) => ({
          ...item,

          selected:
            i === index,
        })
      );

    setGiveCards(
      updatedCards
    );

    setTimeout(() => {
      if (index === 0) {
        navigation.navigate(
          "OnlineGive",
          {
            data:
              onlineContribution,
          }
        );
      } else if (
        index === 1
      ) {
        navigation.navigate(
          "BankAccount",
          {
            data: banks,
          }
        );
      } else {
        navigation.navigate(
          "PledgesAndDonation",
          {
            makePledgeUrl,

            pledgeUrl,
          }
        );
      }
    }, 500);
  };

  return {
    loading,

    giveCards,

    onCardPress,
  };
}