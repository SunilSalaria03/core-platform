export type UserDto = {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: string | number;
  };
  
  export type LoginRequestDto = { email: string; password: string };
  export type LoginResponseDto = { user: UserDto; accessToken?: string };
  
  export type RegisterRequestDto = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  export type RegisterResponseDto = { user: UserDto };
  