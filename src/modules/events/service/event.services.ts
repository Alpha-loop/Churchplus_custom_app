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