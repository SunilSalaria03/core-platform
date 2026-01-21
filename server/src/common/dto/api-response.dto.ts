import { ApiProperty } from '@nestjs/swagger';
import type { IErrorDetails } from '../interfaces/api-response.interface';

// Generic API Response DTO
export class ApiResponseDto<T = any> {
  @ApiProperty({
    description: 'Success status of the operation',
    example: true,
    type: Boolean
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message',
    example: 'Operation completed successfully'
  })
  message: string;

  @ApiProperty({
    description: 'Response data payload',
    type: 'object',
    additionalProperties: false
  })
  body: T;

  constructor(success: boolean, message: string, body: T) {
    this.success = success;
    this.message = message;
    this.body = body;
  }
}

// Success Response DTO
export class SuccessResponseDto<T = any> {
  @ApiProperty({
    description: 'Success status (always true for success responses)',
    example: true,
    type: Boolean
  })
  readonly success: true = true as const;

  @ApiProperty({
    description: 'Success message',
    example: 'Operation completed successfully'
  })
  message: string;

  @ApiProperty({
    description: 'Success response data',
    type: 'object',
    additionalProperties: false
  })
  body: T;

  constructor(message: string, body: T) {
    this.message = message;
    this.body = body;
  }
}

// Error Response DTO
export class ErrorResponseDto {
  @ApiProperty({
    description: 'Success status (always false for error responses)',
    example: false,
    type: Boolean
  })
  readonly success: false = false as const;

  @ApiProperty({
    description: 'Error message',
    example: 'An error occurred while processing the request'
  })
  message: string;

  @ApiProperty({
    description: 'Error details and metadata',
    type: 'object',
    properties: {
      code: { type: 'string', description: 'Error code', example: 'VALIDATION_ERROR' },
      details: { type: 'object', description: 'Additional error details', additionalProperties: false },
      stack: { type: 'string', description: 'Stack trace (development only)' }
    }
  })
  body: IErrorDetails;

  constructor(message: string, errorDetails: IErrorDetails = {}) {
    this.message = message;
    this.body = errorDetails;
  }
}

// Export the type for external use if needed
export type { IErrorDetails };