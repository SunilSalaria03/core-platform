// Refresh token DTO
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty() // Swagger property
  @IsString()
  @IsNotEmpty()
  refreshToken!: string;
}
