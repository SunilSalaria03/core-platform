import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../user/repository/user.repository';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { TokenService } from './token.service';
import { compareHash, hashValue } from 'src/shared/helpers/crypto.helper';
import { IRefreshTokenPayload } from './interfaces/refresh-token.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UserRepository,
    private readonly jwt: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  private async signAccessToken(user: { id: string; email: string }) {
    return this.tokenService.signAccessToken(user);
  }

  private async signRefreshToken(user: { id: string; email: string }) {
    return this.tokenService.signRefreshToken(user);
  }

  async signup(dto: RegisterDto) {
    const existing = await this.users.findByEmail(dto.email.toLowerCase());
    if (existing) throw new BadRequestException('Email already exists');

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = await this.users.create({
      name: dto.name,
      email: dto.email.toLowerCase(),
      password: passwordHash,
      isActive: true,
      emailVerified: false,
    });

    const accessToken = await this.signAccessToken(user);
    const refreshToken = await this.signRefreshToken(user);

    const refreshTokenHash = await bcrypt.hash(refreshToken, 12);
    await this.users.updateRefreshTokenHash(user.id, refreshTokenHash);

    return { user, accessToken, refreshToken };
  }

  async login(dto: LoginDto) {
    const email = dto.email.toLowerCase();

    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!user.isActive) throw new UnauthorizedException('User is inactive');

    const okPwd = await bcrypt.compare(dto.password, user.password);
    if (!okPwd) throw new UnauthorizedException('Invalid credentials');

    const accessToken = await this.signAccessToken(user);
    const refreshToken = await this.signRefreshToken(user);

    const refreshTokenHash = await hashValue(refreshToken);
    await this.users.updateRefreshTokenHash(user.id, refreshTokenHash);

    return { user, accessToken, refreshToken };
  }

  async refreshOneTime(refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedException('Refresh token missing');

    let payload: IRefreshTokenPayload;
    try {
      payload = await this.tokenService.verifyRefreshToken(refreshToken) as IRefreshTokenPayload;
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.users.findById(payload.sub);
    if (!user || !user.isActive) throw new UnauthorizedException('User not found');

    if (!user.refreshTokenHash) {
      throw new UnauthorizedException('Refresh token already used or revoked');
    }

    const matches = await compareHash(refreshToken, user.refreshTokenHash as string);
    if (!matches) throw new UnauthorizedException('Refresh token mismatch');

    const accessToken = await this.signAccessToken(user);
    await this.users.updateRefreshTokenHash(user.id, null);

    return { accessToken };
  }
}
