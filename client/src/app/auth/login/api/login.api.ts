import { baseApi } from "@/shared/store/base-api";
import type { LoginRequestDto, LoginResponseDto } from "@/common/dto/auth.dto";

export const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseDto, LoginRequestDto>({
      query: (body: LoginRequestDto) => ({ url: "/auth/login", method: "POST", data: body }),
      invalidatesTags: ["Me"],
    }),
  }),
});

export const { useLoginMutation } = loginApi;
