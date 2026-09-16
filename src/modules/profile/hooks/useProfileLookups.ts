import {
  useEffect,
  useState,
} from "react";

import { api } from "@/services/apiClient";

// GET /Common/lookups/grouped — confirmed real, returns grouped
// {type, lookUps: [{id, name}]} for many lookup categories at
// once. Only Gender and MaritalStatus are used here; the same
// response has no "AgeGroup" or "PeopleClassification"/
// "MembershipCategory" type anywhere in it — those two profile
// fields (ageGroupID, peopleClassificationID) have no confirmed
// options source yet.
export default function useProfileLookups() {
  const [
    genderOptions,
    setGenderOptions,
  ] = useState<
    { id: number; name: string }[]
  >([]);

  const [
    maritalStatusOptions,
    setMaritalStatusOptions,
  ] = useState<
    { id: number; name: string }[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const response =
          await api.get(
            "/Common/lookups/grouped"
          );

        const groups =
          response.data
            ?.object ?? [];

        const gender =
          groups.find(
            (g: any) =>
              g.type ===
              "Gender"
          );

        const marital =
          groups.find(
            (g: any) =>
              g.type ===
              "MaritalStatus"
          );

        setGenderOptions(
          gender?.lookUps ??
            []
        );

        setMaritalStatusOptions(
          marital?.lookUps ??
            []
        );
      } catch (error) {
        console.log(
          "PROFILE LOOKUPS ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {
    genderOptions,
    maritalStatusOptions,
    loading,
  };
}