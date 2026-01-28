import { baseApi } from "@/shared/store/base-api";
import type {
  RegisterRequestDto,
  RegisterResponseDto,
} from "@/common/dto/auth.dto";
import { AUTH_ENDPOINTS } from "@/common/constants/auth.constants";
import { HTTP_METHODS } from "@/common/constants/http.constants";

export const signupApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponseDto, RegisterRequestDto>({
      query: (body: RegisterRequestDto) => ({ url: AUTH_ENDPOINTS.REGISTER, method: HTTP_METHODS.POST, data: body }),
    }),
  }),
});

export const { useRegisterMutation } = signupApi;
