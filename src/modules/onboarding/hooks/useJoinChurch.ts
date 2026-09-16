import { useCallback, useEffect, useMemo, useState } from "react";

import { Church } from "../types/onboarding.types";
import { getChurches } from "../services/onboarding.service";

import useDebounce from "./useDebounce";

export default function useJoinChurch() {
  const [loading, setLoading] = useState(false);

  const [churchName, setChurchName] = useState("");

  const [churchLocation, setChurchLocation] = useState("");

  const [churches, setChurches] = useState<Church[]>([]);

  const debouncedChurchName =
  useDebounce(churchName, 300);

  const debouncedLocation =
    useDebounce(churchLocation, 300);


  const loadChurches = useCallback(async () => {
    try {
      setLoading(true);


      const response = await getChurches();

      const mappedChurches =
        response.data.map(
          (item: any) => ({
            churchID:
              item.tenantId,

            churchName:
              item.name ?? "",

            churchAddress:
              item.address ?? "",

            churchLogo:
              item.logo ?? "",
          })
        );

      setChurches(mappedChurches);

    } catch (error) {
      console.log("LOAD CHURCHES ERROR:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadChurches();
  }, [loadChurches]);

  const searchName =
    debouncedChurchName
      .trim()
      .toLowerCase();

  const searchLocation =
    debouncedLocation
      .trim()
      .toLowerCase();

  const filteredChurches =
    useMemo(() => {

      if (
        !searchName &&
        !searchLocation
      ) {
        return churches;
      }

      return churches.filter(
        church => {

          const name =
            church.churchName.toLowerCase();

          const address =
            church.churchAddress?.toLowerCase() ?? "";

          return (
            (!searchName ||
              name.includes(searchName)) &&

            (!searchLocation ||
              address.includes(searchLocation))
          );
        }
      );

    }, [
      churches,
      searchName,
      searchLocation,
    ]);

  return {
    loading,

    churchName,
    setChurchName,

    churchLocation,
    setChurchLocation,

    churches,

    filteredChurches,
  };
}