import { api } from "../../../services/apiClient";


export const getChurches = async () => {
  const response = await api.get(
    "/portal/Ministry/portal-enabled-tenants"
  );

  console.log('churches response: ',response.data)

  return response.data;
};

export const getMinistryProfile =
  async (
    tenantId: string,
  ) => {
    const response =
      await api.get(
        `/portal/Ministry/${tenantId}/profile`
      );
    console.log(response, "this is ministry profile")
    return response.data.data;
  };

// Real per-church layout selector — confirmed via a live test:
// object is null with a 404-shaped {status:false, message:
// "Branding configuration not found"} body for a church that
// hasn't configured branding yet (not an HTTP error — status 200
// with status:false in the body). This replaces the hardcoded
// mock/config.ts that's been standing in for this the whole time
// Modern was being built.
export const getBrandingConfiguration =
  async (
    tenantId: string,
  ) => {
    const response =
      await api.get(
        "/BrandingConfiguration/AppConfig",
        {
          params: {
            tenantId,
          },
        }
      );
    
    console.log(
      "BRANDING CONFIGURATION RESPONSE:",
      response.data
    );

      
    return response.data;
  };