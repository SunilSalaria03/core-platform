import {  Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './modules/admin/admin.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGlobalGuard } from './common/guards/jwt.guard';
import { RolesGuard } from './common/guards/users.guard';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',
      cache: true,
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    SharedModule,
    AdminModule,
    InfrastructureModule
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtGlobalGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  controllers: [],
})
export class AppModule {}
