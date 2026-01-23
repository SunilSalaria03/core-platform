// Auth service
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './repository/auth.repository';
import { UserRepository } from '../user/repositary/user.repositary';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { TokenService } from './token.service';
import { compareHash, hashValue } from 'src/shared/helpers/crypto.helper';
import { IRefreshTokenPayload } from './interfaces/refresh-token.interface';

@Injectable() // Injectable decorator
export class AuthService {
  constructor(
    private readonly userService: UserRepository,
    private readonly tokenService: TokenService,
    private readonly authService: AuthRepository,
  ) {}

  // sign access token
  private async signAccessToken(user: { id: string; email: string }) {
    return this.tokenService.signAccessToken(user);
  }

  // sign refresh token
  private async signRefreshToken(user: { id: string; email: string }) {
    return this.tokenService.signRefreshToken(user);
  }

  // signup
  async signup(dto: RegisterDto) {
    const existing = await this.userService.findByEmail(dto.email.toLowerCase());
    if (existing) throw new BadRequestException('Email already exists');

    const passwordHash = await hashValue(dto.password, 12);

    const user = await this.userService.create({
      name: dto.name,
      email: dto.email.toLowerCase(),
      password: passwordHash,
      isActive: true,
      emailVerified: false,
    });

    const accessToken = await this.signAccessToken(user);
    const refreshToken = await this.signRefreshToken(user);

    const refreshTokenHash = await hashValue(refreshToken, 12);
    await this.authService.updateRefreshTokenHash(user.id, refreshTokenHash);

    return { user, accessToken, refreshToken };
  }

  // login
  async login(dto: LoginDto) {
    const email = dto.email.toLowerCase();

    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!user.isActive) throw new UnauthorizedException('User is inactive');

    const okPwd = await bcrypt.compare(dto.password, user.password);
    if (!okPwd) throw new UnauthorizedException('Invalid credentials');

    const accessToken = await this.signAccessToken(user);
    const refreshToken = await this.signRefreshToken(user);

    const refreshTokenHash = await hashValue(refreshToken);
    await this.authService.updateRefreshTokenHash(user.id, refreshTokenHash);

    return { user, accessToken, refreshToken };
  }

  // refresh one time
  async refreshOneTime(refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedException('Refresh token missing');

    let payload: IRefreshTokenPayload;
    try {
      payload = await this.tokenService.verifyRefreshToken(refreshToken) as IRefreshTokenPayload;
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.userService.findById(payload.sub);
    if (!user || !user.isActive) throw new UnauthorizedException('User not found');

    if (!user.refreshTokenHash) {
      throw new UnauthorizedException('Refresh token already used or revoked');
    }

    const matches = await compareHash(refreshToken, user.refreshTokenHash);
    if (!matches) throw new UnauthorizedException('Refresh token mismatch');

    const accessToken = await this.signAccessToken(user);
    await this.authService.updateRefreshTokenHash(user.id, null);

    return { accessToken };
  }
}
