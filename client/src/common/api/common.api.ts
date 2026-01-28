import { baseApi } from "@/shared/store/base-api";
import type { UserDto } from "@/common/dto/auth.dto";

export const authMeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<UserDto, void>({
      query: () => ({ url: "/auth/me", method: "GET" }),
      providesTags: ["Me"],

      // optional: keep cached longer (override baseApi default)
      keepUnusedDataFor: 300, // 5 minutes
    }),
  }),
});

export const { useMeQuery } = authMeApi;
