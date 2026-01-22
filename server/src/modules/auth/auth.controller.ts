import {BadRequestException, Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { success } from '../../common/utils/response.utils';
import { Public } from '../../common/decorators/public.decorator';
import { CookiesService } from '../../infrastructure/cookies/cookies.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly cookies: CookiesService,
  ) {}

  @Public()
  @Post('signup')
  async signup(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Express.Response) {
    const result = await this.auth.signup(dto);

    this.cookies.setRefreshToken(res as Response, result.refreshToken);

    return success(
      { user: result.user, accessToken: result.accessToken },
      'Signup successful',
      201,
    );
  }

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Express.Response) {
    const result = await this.auth.login(dto);

    this.cookies.setRefreshToken(res as Response, result.refreshToken);

    return success(
      { user: result.user, accessToken: result.accessToken },
      'Login successful',
      200,
    );
  }

  @Post('refreshToken')
  async refreshToken(
    @Req() req: Express.Request,
    @Body() body: Partial<RefreshTokenDto>,
    @Res({ passthrough: true }) res: Express.Request,
  ) {
    const tokenFromBody = body?.refreshToken;
    const tokenFromCookie = req && 'cookies' in req ? (req.cookies as { jwt?: string }).jwt : null;

    const refreshToken = tokenFromBody || tokenFromCookie;

    if (!refreshToken) {
      this.cookies.clearRefreshToken(res as unknown as Response);
      throw new BadRequestException('Refresh token is required');
    }

    try {
      const result = await this.auth.refreshOneTime(refreshToken);

      this.cookies.clearRefreshToken(res as unknown as Response);

      return success({ accessToken: result.accessToken }, 'Token refreshed', 200);
    } catch (e) {
      this.cookies.clearRefreshToken(res as unknown as Response);
      throw e;
    }
  }
}
