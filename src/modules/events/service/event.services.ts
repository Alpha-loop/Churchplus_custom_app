// modules/events/services/events.service.ts

import { api } from "@/services/apiClient";

export const getEvents = async (
  tenantId: string,
  page = 1,
  pageSize = 20
) => {
  const response = await api.get(
    "/portal/PortalEvents/AllEvents",
    {
      params: {
        tenantId,
        page,
        pageSize,
      },
    }
  );

  console.log('This is event raw', response)

  return response.data;
};

export const checkInToEvent =
  async (
    payload: {
      eventId: string;
      userId: string;
    },
    token: string
  ) => {
    const res =
      await api.post(
        "/api/portal/Events/CheckIn",
        payload,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    console.log('This is checkin raw', res)

    return res.data;
  };

export type EventRegistrationPayload = {
  personID: string;
  checkInAttendanceID: string;
};

// POST /api/portal/PortalEvents/register-attendance?tenantId=...
// The backend answers { status, message, object } — a 200 with
// status:false is a failure, so callers must check it.
export const registerForEvent = async (
  tenantId: string,
  payload: EventRegistrationPayload,
  token?: string | null
) => {
  const response = await api.post(
    "/portal/PortalEvents/register-attendance",
    payload,
    {
      params: { tenantId },
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : undefined,
    }
  );

  return response.data;
};
