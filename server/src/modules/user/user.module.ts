import { Module } from '@nestjs/common';
import { UsersController } from './controllers';
import { UsersService } from './services';
import { UsersRepository } from './repository';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
