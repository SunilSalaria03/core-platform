import {
  Injectable,
  ConflictException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { UsersRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly repo: UsersRepository) {}

  async create(dto: CreateUserDto): Promise<User> {
    try {
      return await this.repo.create(dto);
    } catch (error: unknown) {
      const err = error as { code?: string; message?: string; stack?: string };
      if (err.code === 'P2002') {
        throw new ConflictException('User with this email already exists');
      }
      this.logger.error(`Failed to create user: ${err.message || 'Unknown error'}`, err.stack);
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.repo.findAll();
    } catch (error: unknown) {
      const err = error as { message?: string; stack?: string };
      this.logger.error(`Failed to fetch users: ${err.message || 'Unknown error'}`, err.stack);
      throw error;
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.repo.findById(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      const err = error as { message?: string; stack?: string };
      this.logger.error(
        `Failed to find user by ID ${id}: ${err.message || 'Unknown error'}`,
        err.stack,
      );
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.repo.findByEmail(email);
    } catch (error: unknown) {
      const err = error as { message?: string; stack?: string };
      this.logger.error(
        `Failed to find user by email ${email}: ${err.message || 'Unknown error'}`,
        err.stack,
      );
      throw error;
    }
  }
}
