import {
  useEffect,
  useState,
} from "react";

import {
  useAuthStore,
} from "@/store/authStore";

import {
  getBankAccounts,
} from "../services/give.service";

export default function useBankAccounts() {
  const [
    banks,
    setBanks,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const user =
    useAuthStore(
      state => state.user
    );

  const tenantId =
    user?.tenantID ||
    user?.tenantId;

  useEffect(() => {
    const loadBanks =
      async () => {
        try {
          setLoading(true);

          const response =
            await getBankAccounts(
              tenantId
            );

          console.log(
            "BANKS:",
            response
          );

          setBanks(
            response || []
          );
        } catch (error) {
          console.log(
            "BANKS ERROR:",
            error
          );
        } finally {
          setLoading(false);
        }
      };

    if (tenantId) {
      loadBanks();
    }
  }, [tenantId]);

  return {
    banks,
    loading,
  };
}