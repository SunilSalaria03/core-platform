import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { VALIDATION_MESSAGES } from '../../../common/constants/validationMessages';

export class SignupDto {
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

  @IsString()
  @IsNotEmpty({ message: VALIDATION_MESSAGES.PASSWORD_REQUIRED })
  @MinLength(8, { message: VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH })
  @MaxLength(128, { message: VALIDATION_MESSAGES.PASSWORD_MAX_LENGTH })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: VALIDATION_MESSAGES.PASSWORD_TOO_WEAK,
  })
  password: string;
}