import { defineConfig, env } from 'prisma/config';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.development') });

export default defineConfig({
  schema: path.resolve(process.cwd(), 'src/database/prisma'),
  datasource: {
    url: env('DATABASE_URL'),
  },
  migrations: {
    seed: 'npx ts-node -r tsconfig-paths/register src/database/prisma/seed.ts',
  },
});
