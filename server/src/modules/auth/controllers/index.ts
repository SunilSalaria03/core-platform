import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../services';
import { SignupDto } from '../dto/authDtos';
import { IApiResponse } from 'src/common/interfaces/apiInterface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async signup(@Body() dto: SignupDto): Promise<IApiResponse> {
    return this.authService.signup(dto);
  }
};