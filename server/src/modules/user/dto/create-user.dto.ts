import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { VALIDATION_MESSAGES } from '../../../common/constants/validation-messages.constants';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: VALIDATION_MESSAGES.NAME_REQUIRED })
  @MinLength(2, { message: VALIDATION_MESSAGES.NAME_MIN_LENGTH })
  @MaxLength(100, { message: VALIDATION_MESSAGES.NAME_MAX_LENGTH })
  @Transform(({ value }: { value: string }) => value?.trim())
  name: string;

  @IsEmail({}, { message: VALIDATION_MESSAGES.EMAIL_REQUIRED })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.EMAIL_REQUIRED })
  @Transform(({ value }: { value: string }) => value?.toLowerCase().trim())
  email: string;
  password: string;
  isActive?: boolean;
  emailVerified?: boolean;
}

export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
