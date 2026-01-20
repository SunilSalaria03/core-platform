import {
  Injectable,
  ConflictException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { UsersService } from '../../user/services/users.service';
import { SignupDto } from '../dto/authDtos';
import { IApiResponse } from 'src/common/interfaces/apiInterface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly saltRounds = 12;

  constructor(private readonly usersService: UsersService) {}

  async signup(dto: SignupDto): Promise<IApiResponse> {
    try {
      const existingUser = await this.usersService.findByEmail(dto.email);
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      const hashedPassword = this.hashPassword(dto.password);

      const user = await this.usersService.create({
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        isActive: true,
        emailVerified: false,
      });

      const { ...userResponse } = user;
      return {
        success: true,
        message: 'Signup successful',
        body: userResponse,
      };
    } catch (error: unknown) {
      if (error instanceof ConflictException) {
        throw error;
      }

      const err = error as { message?: string; stack?: string };
      this.logger.error(
        `Failed to signup user with email ${dto.email}: ${err.message || 'Unknown error'}`,
        err.stack,
      );

      throw new BadRequestException('Failed to create user account');
    }
  }

  private hashPassword(password: string): string {
    try {
      // TODO: Replace with bcrypt for production use
      // For now using crypto with salt for basic hashing
      const salt = crypto.randomBytes(16).toString('hex');
      const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
      return `${salt}:${hash}`;
    } catch (error: unknown) {
      const err = error as { message?: string; stack?: string };
      this.logger.error(
        `Failed to hash password: ${err.message || 'Unknown error'}`,
        err.stack,
      );
      throw new BadRequestException('Failed to process password');
    }
  }

  validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      // TODO: Replace with bcrypt for production use
      const [salt, hash] = hashedPassword.split(':');
      if (!salt || !hash) return Promise.resolve(false);

      return new Promise<boolean>((resolve, reject) => {
        try {
          const hashedInput = crypto.pbkdf2Sync(plainPassword, salt, 1000, 64, 'sha512').toString('hex');
          resolve(hash === hashedInput);
        } catch (err) {
          reject(err instanceof Error ? err : new Error(String(err)));
        }
      });
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error(String(error));
      this.logger.error(
        `Failed to validate password: ${err.message || 'Unknown error'}`,
        err.stack,
      );
      throw err;
    }
  }
}