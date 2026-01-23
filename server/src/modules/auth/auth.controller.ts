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
import { AUTH_CONSTANTS } from './constants/auth.constants';
import { HTTP_STATUS } from 'src/common/constants/http-status.constants';

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
      AUTH_CONSTANTS.SIGNUP_SUCCESS,
      HTTP_STATUS.CREATED,
    );
  }

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Express.Response) {
    const result = await this.auth.login(dto);

    this.cookies.setRefreshToken(res as Response, result.refreshToken);

    return success(
      { user: result.user, accessToken: result.accessToken },
      AUTH_CONSTANTS.LOGIN_SUCCESS,
      HTTP_STATUS.OK,
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
      throw new BadRequestException(AUTH_CONSTANTS.REFRESH_TOKEN_REQUIRED);
    }

    try {
      const result = await this.auth.refreshOneTime(refreshToken);

      this.cookies.clearRefreshToken(res as unknown as Response);

      return success({ accessToken: result.accessToken }, AUTH_CONSTANTS.REFRESH_TOKEN_SUCCESS, HTTP_STATUS.OK);
    } catch (e) {
      this.cookies.clearRefreshToken(res as unknown as Response);
      throw e;
    }
  }
}
