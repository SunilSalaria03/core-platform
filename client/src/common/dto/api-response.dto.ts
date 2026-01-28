export interface ApiResponseDto<T> {
  success: boolean;
  message?: string;
  data: T;
};

export interface ApiErrorDto {
  success: false;
  message?: string;
  errors?: Record<string, string[]>;
};
