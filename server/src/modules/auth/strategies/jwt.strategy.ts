import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserRole } from 'src/common/enums/user.enum';
import { AuthRepository } from '../repository/auth.repository';
import { TokenService } from '../token.service';
import { UserRepository } from 'src/modules/user/repositary/user.repositary';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    cfg: ConfigService,
    private readonly authService: AuthRepository,
    private readonly tokenService: TokenService,
    private readonly userService: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: tokenService.accessSecret(),
      ignoreExpiration: false,
    });
    }

  async validate(payload: { sub: string; email: string }) {
    const user = await this.userService.findById(payload.sub);

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid user');
    }

    // this becomes req.user
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: UserRole.User,
      isActive: user.isActive,
      emailVerified: user.emailVerified,
    };
  }
}
