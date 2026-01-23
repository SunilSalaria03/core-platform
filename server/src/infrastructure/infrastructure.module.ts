import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CookiesService } from './cookies/cookies.service';

@Module({
  imports: [
    ConfigModule,
  ],
  providers: [
    CookiesService,
  ],
  exports: [
    CookiesService,
  ],
})
export class InfrastructureModule {}
