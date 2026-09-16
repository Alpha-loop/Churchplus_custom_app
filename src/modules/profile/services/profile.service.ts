import { api } from "@/services/apiClient";

export const getUserProfile = async (
  id: string,
  token: string
) => {
  const res = await api.get(
    `/portal/Profile/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log('This is profile res: ', res)

  return res.data;
};

export const deleteUserAccount = async (userId: string, token: string) => {
  const res = await api.delete(
    `/portal/PortalAccount/DeleteAccount?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const updateProfile = async (
  id: string,
  formData: FormData,
  token: string
) => {
  const res = await api.put(
    `/portal/Profile/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};