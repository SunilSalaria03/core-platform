import { HttpStatus } from '@nestjs/common';
import { ApiResponseDto } from '../dto/api-response.dto';

export const success = <T>(
  data: T | T[] | null = null,
  message = 'Successfully completed',
  statusCode: number = HttpStatus.OK,
): ApiResponseDto<T | T[]> => ({
  success: true,
  statusCode,
  message,
  data,
});

export const error = (
  message: string,
  statusCode: number,
  data: null = null,
): ApiResponseDto<null> => ({
  success: false,
  statusCode,
  message,
  data,
});
