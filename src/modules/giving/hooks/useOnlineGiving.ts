import {
  useEffect,
  useState,
} from "react";

import {
  useAuthStore,
} from "@/store/authStore";

import { useChurchStore } from "@/store/churchStore";

import {
  fetchOnlineDonations,
} from "../services/give.service";

export default function useOnlineGiving() {
  const [
    categories,
    setCategories,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const user =
    useAuthStore(
      state => state.user
    );

  // Was only the signed-in user's tenant id. A guest has no user
  // object, so tenantId was undefined, the fetch below never ran, and
  // the Giving tab showed "no giving funds" even though this endpoint
  // is public. The church's id from churchStore (set at startup, and
  // what the rest of the app reads) is always there; the user's is
  // kept as a fallback.
  const storeTenantId =
    useChurchStore(
      state => state.tenantId
    );

  const tenantId =
    storeTenantId ||
    user?.tenantID ||
    user?.tenantId;

  const loadDonations =
    async () => {
      try {
        setLoading(true);

        const donations =
          await fetchOnlineDonations(
            tenantId
          );

        console.log(
          "ONLINE DONATIONS:",
          donations
        );

        setCategories(
          donations || []
        );
      } catch (error) {
        console.log(
          "ONLINE DONATIONS ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (!tenantId) {
      return;
    }

    loadDonations();
  }, [tenantId]);

  return {
    categories,
    loading,
  };
}