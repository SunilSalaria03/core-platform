import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// API response DTO
export class ApiResponseDto<T = any> {
  @ApiProperty()
  success!: boolean;

  @ApiProperty()
  statusCode!: number;

  @ApiProperty()
  message!: string;

  @ApiPropertyOptional({ nullable: true })
  data!: T | null;
}
