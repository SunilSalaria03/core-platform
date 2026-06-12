// Token service
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IUser } from './interfaces/refresh-token.interface';

@Injectable() // Injectable decorator
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  // access secret
  accessSecret() {
    return this.config.get<string>('JWT_SECRET')!;
  }

  // refresh secret
  refreshSecret() { 
    return this.config.get<string>('REFRESH_TOKEN_SECRET')!;
  }

  // access expires in
  accessExpiresIn() {
    return this.config.get<number>('JWT_EXPIRES_IN');
  }

  // refresh expires in
  refreshExpiresIn() {
    return this.config.get<number>('REFRESH_TOKEN_EXPIRES_IN');
  }

  // sign access token
  signAccessToken(user: IUser) {
    return this.jwt.signAsync<IUser>(
      { id: user.id, email: user.email },
      { secret: this.accessSecret(), expiresIn: Number(this.accessExpiresIn()) },
    );
  }

  // sign refresh token
  signRefreshToken(user: IUser) {
    return this.jwt.signAsync<IUser>(
      { id: user.id, email: user.email },
      { secret: this.refreshSecret(), expiresIn: Number(this.refreshExpiresIn()) },
    );
  }

  // verify refresh token
  verifyRefreshToken(token: string) {
    return this.jwt.verifyAsync(token, { secret: this.refreshSecret() });
  }
}
