import { Module } from '@nestjs/common';
import { UserRepository } from '../auth/repository/auth.repository';

@Module({
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
