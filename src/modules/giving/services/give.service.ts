import { api } from "@/services/apiClient";

export const fetchOnlineDonations =
  async (
    tenantId: string
  ) => {
    const response =
      await api.get(
        `/portal/Ministry/${tenantId}/profile`
      );

    console.log(
      "MINISTRY PROFILE:",
      JSON.stringify(
        response.data,
        null,
        2
      )
    );

    return (
      response.data?.data
        ?.onlineDonations || []
    );
  };



export const getPledgeUrl =
  async (
    tenantId: string
  ) => {
    const response =
      await api.get(
        `/portal/Ministry/${tenantId}/profile`
      );

    return (
      response.data?.data
        ?.pledgePromiseUrl
    );
  };



export const getBankAccounts =
  async (
    tenantId: string
  ) => {
    const response =
      await api.get(
        `/portal/Ministry/${tenantId}/profile`
      );

    return (
      response.data?.data?.banks ||
      []
    );
  };