// prisma.config.ts

import { config as loadEnv } from 'dotenv';
import { defineConfig } from 'prisma/config';

// Load env files explicitly. This makes Prisma CLI work on Windows too.
loadEnv({ path: '.env.local' });
loadEnv({ path: '.env' });

const databaseUrl = (process.env.DATABASE_URL || '').trim();

if (!databaseUrl) {
  throw new Error('Missing DATABASE_URL. Add it to .env.local or define it in your shell env.');
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: databaseUrl,
  },
});
