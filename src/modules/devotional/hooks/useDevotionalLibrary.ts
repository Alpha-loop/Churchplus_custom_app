import {
  useEffect,
  useState,
} from "react";

import {
  getDevotionals,
} from "../services/devotional.service";

import {
  useChurchStore,
} from "@/store/churchStore";

export default function useDevotionalLibrary() {
  const [
    devotionals,
    setDevotionals,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  // authStore.user (the raw login response) never reliably carries
  // a tenantId — useHome.ts already gets this right by reading
  // from churchStore instead, which is explicitly set during
  // confirmChurch(). This hook was reading the unreliable source,
  // so tenantId was silently undefined and the fetch never ran.
  const tenantId =
    useChurchStore(
      state => state.tenantId
    );

  const loadDevotionals =
    async () => {
      try {
        setLoading(true);

        if (!tenantId) return;

        const response =
          await getDevotionals(
            tenantId
          );

        console.log(
          "DEVOTIONALS RESPONSE:",
          response
        );

        setDevotionals(
          response?.object || []
        );
      } catch (error) {
        console.log(
          "DEVOTIONALS ERROR:",
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

    loadDevotionals();
  }, [tenantId]);

  return {
    devotionals,
    loading,
  };
}