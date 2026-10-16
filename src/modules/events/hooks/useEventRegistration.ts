import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { registerForEvent } from "../service/event.services";

import {
  getRegistrationError,
  getRegistrationSessions,
} from "../utils/eventRegistration";

import { useAuthStore } from "@/store/authStore";
import { useChurchStore } from "@/store/churchStore";

const STORAGE_KEY = "registered-event-ids";

const read = async (): Promise<string[]> => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);

    const list = raw ? JSON.parse(raw) : [];

    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
};

export default function useEventRegistration(event: any) {
  const tenantId = useChurchStore(s => s.tenantId);

  const user: any = useAuthStore(s => s.user);

  const token = useAuthStore(s => s.accessToken);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [registered, setRegistered] = useState(false);

  // Blocks a double-tap before the state update lands.
  const busy = useRef(false);

  const eventId = String(event?.id ?? "");

  const sessions = useMemo(
    () => getRegistrationSessions(event),
    [event]
  );

  const personName = [
    user?.person?.firstName ?? user?.firstName,
    user?.person?.lastName ?? user?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    let alive = true;

    read().then(list => {
      if (alive) setRegistered(list.includes(eventId));
    });

    return () => {
      alive = false;
    };
  }, [eventId]);

  const submit = useCallback(
    async (attendanceId: string): Promise<boolean> => {
      if (busy.current) return false;

      if (!tenantId || !user?.personId) {
        setError(
          "We couldn't find your profile. Please sign out and sign in again."
        );

        return false;
      }

      busy.current = true;

      setSubmitting(true);

      setError(null);

      try {
        // The backend takes exactly these two fields.
        const payload = {
          personID: String(user.personId),
          checkInAttendanceID: attendanceId,
        };

        if (__DEV__) {
          console.log(
            "EVENT REGISTER REQUEST:",
            tenantId,
            JSON.stringify(payload)
          );
        }

        const response = await registerForEvent(
          tenantId,
          payload,
          token
        );

        if (response?.status === false) {
          setError(
            response?.message ||
              "The registration couldn't be completed."
          );

          return false;
        }

        const list = await read();

        if (!list.includes(eventId)) {
          AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify([...list, eventId])
          ).catch(() => {});
        }

        setRegistered(true);

        return true;
      } catch (e: any) {
        console.log(
          "EVENT REGISTER ERROR:",
          e?.response?.status,
          e?.response?.data ?? e?.message,
          `${e?.config?.baseURL ?? ""}${e?.config?.url ?? ""}`
        );

        setError(getRegistrationError(e));

        return false;
      } finally {
        busy.current = false;

        setSubmitting(false);
      }
    },
    [tenantId, token, user, eventId]
  );

  return {
    personName,
    sessions,
    submit,
    submitting,
    error,
    clearError: () => setError(null),
    registered,
  };
}
