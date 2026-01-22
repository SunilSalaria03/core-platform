import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  OnApplicationShutdown,
  Logger,
  INestApplication, } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy, OnApplicationShutdown
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    // Create PostgreSQL connection pool safely
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new TypeError('DATABASE_URL environment variable is not set');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const pool = new Pool({ connectionString });

    // Create Prisma adapter
    const adapter = new PrismaPg(pool);

    super({
      adapter,
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' },
      ],
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Database connection established');
    } catch (error) {
      console.error('Failed to connect to database', {
        error: error as unknown as Error,
      });
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
  async onApplicationShutdown(signal?: string) {
    console.log(`✅ Prisma disconnected${signal ? ` (signal: ${signal})` : ''}`);
    await this.$disconnect();
  }
  enableShutdownHooks(app: INestApplication): Promise<void> {
    return app.close();
  }
}
