// Prisma service
import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { getPrismaClientOptions } from './prisma.factory';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // get the PrismaClient options
    super(getPrismaClientOptions());
  }

  async onModuleInit() {
    // connect to the database
    await this.$connect();
  }

  enableShutdownHooks(app: INestApplication): void {
    // enable shutdown hooks
    process.on('beforeExit', () => {
      app.close();
    });
  }
}
