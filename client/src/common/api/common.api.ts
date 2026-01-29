import { baseApi } from "@/shared/store/base-api";
import type { UserDto } from "@/common/dto/user.dto";

export const authMeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<UserDto, void>({
      query: () => ({ url: "/auth/me", method: "GET" }),
      providesTags: ["Auth"],
      keepUnusedDataFor: 300, // 5 minutes
    }),
  }),
});

export const { useMeQuery } = authMeApi;
