import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IUser } from './interfaces/refresh-token.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  accessSecret() {
    return this.config.get<string>('JWT_SECRET')!;
  }

  refreshSecret() {
    return this.config.get<string>('REFRESH_TOKEN_SECRET')!;
  }

  accessExpiresIn() {
    return this.config.get<number>('JWT_EXPIRES_IN');
  }

  refreshExpiresIn() {
    return this.config.get<number>('REFRESH_TOKEN_EXPIRES_IN');
  }

  signAccessToken(user: IUser) {
    return this.jwt.signAsync<IUser>(
      { id: user.id, email: user.email },
      { secret: this.accessSecret(), expiresIn: Number(this.accessExpiresIn()) },
    );
  }

  signRefreshToken(user: IUser) {
    return this.jwt.signAsync<IUser>(
      { id: user.id, email: user.email },
      { secret: this.refreshSecret(), expiresIn: Number(this.refreshExpiresIn()) },
    );
  }

  verifyRefreshToken(token: string) {
    return this.jwt.verifyAsync(token, { secret: this.refreshSecret() });
  }
}
