// Cookies service
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CookiesService {
  constructor(private readonly config: ConfigService) {}

  // set refresh token
  setRefreshToken(res: Response, token: string) {
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: this.config.get('NODE_ENV') === 'production', // secure the cookie in production
      sameSite: 'lax', // same site policy
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days (REFRESH_TOKEN_EXPIRES_IN)
    });
  }
  
  // clear refresh token
  clearRefreshToken(res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: this.config.get('NODE_ENV') === 'production',
      sameSite: 'lax',
      path: '/',
    });
  }
}
