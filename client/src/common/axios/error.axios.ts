// response-normalizer.ts
import type { ApiResponseDto } from "@/common/dto/api.dto";

export function normalizeApiResponse<T>(
  response: ApiResponseDto<T>
) {
  if (!response.success) {
    return {
      success: false as const,
      statusCode: response.statusCode ?? 500,
      message: response.message ?? "Request failed",
      data: response.data,
    };
  }

  return {
    success: true as const,
    statusCode: response.statusCode,
    message: response.message,
    data: response.data,
  };
}
