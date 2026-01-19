import { Module } from '@nestjs/common';
import { UsersController } from './controllers/user.controller';
import { UsersService } from './services/users.service';
import { UsersRepository } from './repository/user.repository';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
