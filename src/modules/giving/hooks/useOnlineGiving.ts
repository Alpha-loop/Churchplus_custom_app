import {
  useEffect,
  useState,
} from "react";

import {
  useAuthStore,
} from "@/store/authStore";

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

  const tenantId =
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