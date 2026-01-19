import { defineConfig, env } from 'prisma/config';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load .env file for Prisma CLI (db pull / migrate / generate)
dotenv.config({ path: path.resolve(process.cwd(), '.env.development') });

export default defineConfig({
  schema: './schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
  },
});
