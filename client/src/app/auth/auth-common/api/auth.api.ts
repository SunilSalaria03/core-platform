// Auth apis
import { baseApi } from "@/shared/store/base-api";
import type { SignupRequestDto, SignupResponseDto, SigninRequestDto, SigninResponseDto } from "../dto/auth.dto";
import { AUTH_API_ENDPOINTS } from "../constants/auth.constants";
import { HTTP_METHODS } from "@/common/constants/http.constants";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponseDto, SignupRequestDto>({
      query: (body) => ({
        url: AUTH_API_ENDPOINTS.SIGNUP,
        method: HTTP_METHODS.POST,
        data: body,
      }),
    }),
    signin: builder.mutation<SigninResponseDto, SigninRequestDto>({
      query: (body) => ({
        url: AUTH_API_ENDPOINTS.SIGNIN,
        method: HTTP_METHODS.POST,
        data: body,
      }),
    }),
  }),
});

export const { useSignupMutation, useSigninMutation } = authApi;
