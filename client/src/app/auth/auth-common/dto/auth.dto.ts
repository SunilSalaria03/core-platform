import { UserDto } from "@/common/dto/user.dto";

// Success DTOs
export type AuthSuccessDto = { user: UserDto; accessToken?: string };

// Signup DTOs
export type SignupRequestDto = {
  name: string;
  email: string;
  password: string;
};
export type SignupResponseDto = AuthSuccessDto;

// Signin DTOs
export type SigninRequestDto = { email: string; password: string };
export type SigninResponseDto = AuthSuccessDto;
