// modules/events/hooks/useLocationCheckin.ts

import {
  useState,
} from "react";

import {
  PermissionsAndroid,
  Platform,
} from "react-native";

import * as Location from "expo-location";

export default function useLocationCheckin() {
  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    location,
    setLocation,
  ] = useState<any>(null);

  const requestLocation =
  async () => {
    try {
      setLoading(true);

      const {
        status,
      } =
        await Location.requestForegroundPermissionsAsync();

      if (
        status !==
        "granted"
      ) {
        throw new Error(
          "Location permission denied"
        );
      }

      const position =
        await Location.getCurrentPositionAsync(
          {
            accuracy:
              Location.Accuracy.High,
          }
        );

      const result = {
        latitude:
          position.coords.latitude,

        longitude:
          position.coords.longitude,

        accuracy:
          position.coords.accuracy,
      };

      setLocation(
        result
      );

      return result;
    } catch (
      e: any
    ) {
      setError(
        e.message
      );

      throw e;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    location,
    requestLocation,
  };
}