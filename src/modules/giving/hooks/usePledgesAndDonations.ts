import {
  useEffect,
  useState,
} from "react";

import {
  useAuthStore,
} from "@/store/authStore";

import {
  getPledgeUrl,
} from "../services/give.service";

export default function usePledgesAndDonations() {
  const [
    actions,
  ] = useState([
    {
      id: 1,
      header:
        "Make a new Pledge",
      subText:
        "Click to make a new pledge",
      type:
        "make",
    },

    {
      id: 2,
      header:
        "Redeem a Pledge",
      subText:
        "Pay for pledges you have made",
      type:
        "redeem",
    },
  ]);

  const [
    pledgeUrl,
    setPledgeUrl,
  ] = useState("");

  const user =
    useAuthStore(
      state => state.user
    );

  const tenantId =
    user?.tenantID ||
    user?.tenantId;

  useEffect(() => {
    const loadPledgeUrl =
      async () => {
        try {
          const url =
            await getPledgeUrl(
              tenantId
            );

          console.log(
            "PLEDGE URL:",
            url
          );

          setPledgeUrl(
            url || ""
          );
        } catch (error) {
          console.log(
            "PLEDGE ERROR:",
            error
          );
        }
      };

    if (tenantId) {
      loadPledgeUrl();
    }
  }, [tenantId]);

  return {
    actions,
    pledgeUrl,
  };
}