import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://p4g200m0-9007.inc1.devtunnels.ms/api/auth/session",
    credentials: "include",
  });
export const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    let result = await baseQuery(args, api, extraOptions);
  
    if (result.error && result.error.status === 401) {
      console.warn("Token expired, attempting refresh...");
  
      // Attempt to refresh the token
      const refreshResult = await baseQuery(
        { url: "refresh_token/", method: "POST", credentials: "include" },
        api,
        extraOptions
      );
  
      if (refreshResult.data) {
        console.log("Token refreshed successfully, retrying request...");
  
        // Retry the original request after refreshing the token
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.error("Token refresh failed, logging out...");
        // Optionally, trigger logout (dispatch an action)
      }
    }
  
    return result;
  };
  