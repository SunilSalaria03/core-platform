import { baseApi } from "@/shared/store/base-api";

export const authLogoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation<{ success: boolean }, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      invalidatesTags: ["Me"],
    }),
  }),
});

export const { useLogoutMutation } = authLogoutApi;
