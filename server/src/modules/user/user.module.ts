import { Module } from '@nestjs/common';
import { UserRepository } from './repositary/user.repositary';

@Module({
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
