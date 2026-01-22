import { Module } from '@nestjs/common';
import { CookiesService } from './cookies/cookies.service';

@Module({
  providers: [CookiesService],
  exports: [CookiesService],
})
export class InfrastructureModule {}
