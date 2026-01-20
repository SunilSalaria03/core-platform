import { Module } from '@nestjs/common';
import { UsersModule } from '../user/user.module';
import { AuthController } from './controllers';
import { AuthService } from './services';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
