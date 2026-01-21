import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { CreateUserDto } from '../dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: dto,
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
