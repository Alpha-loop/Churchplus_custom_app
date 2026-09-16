import { api } from "@/services/apiClient";

export const getDevotionals =
  async (
    tenantId: string
  ) => {
    const response =
      await api.post(
        `/portal/${tenantId}/devotionals`,
        {
          tenantId,
          userId: null,
          isPending: true,
          isDevotional: true,
          devotionalDate: null,
          tags: null,
          allPost: true,
        }
      );
      console.log(response.data, "Dammy")
    return response.data;

    
  };