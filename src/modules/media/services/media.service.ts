import { api } from "@/services/apiClient";

export const getAudios = async (
  tenantId: string
) => {
  const response =
    await api.get(
      "/PortalMedia/audio",
      {
        params: {
          tenantId,
        },
      }
    );

  return response.data;
};