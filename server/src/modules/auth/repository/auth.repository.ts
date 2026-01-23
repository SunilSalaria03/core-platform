// Auth repository
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}
  // update refresh token hash

  async updateRefreshTokenHash(userId: string, refreshTokenHash: string | null): Promise<{ id: string }> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { refreshTokenHash },
      select: { id: true },
    });

    return user;
  }
}
