import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CookiesService {
  constructor(private readonly config: ConfigService) {}

  setRefreshToken(res: Response, token: string) {
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: this.config.get('NODE_ENV') === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (REFRESH_TOKEN_EXPIRES_IN)
    });
  }

  clearRefreshToken(res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: this.config.get('NODE_ENV') === 'production',
      sameSite: 'lax',
      path: '/',
    });
  }
}
