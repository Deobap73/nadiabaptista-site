// src/lib/prisma.ts

import dns from 'node:dns';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

dns.setDefaultResultOrder('ipv4first');

declare global {
  var prisma: PrismaClient | undefined;
}

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('Missing DATABASE_URL in environment variables.');
  }

  const pool = new Pool({
    connectionString: databaseUrl,

    // Important for Supabase pooler. Accept the cert chain even if Node dislikes it.
    ssl: { rejectUnauthorized: false },

    // Helps with serverless spikes and pooler behaviour.
    max: 5,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 10_000,

    // Optional but can reduce issues with poolers.
    keepAlive: true,
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: ['error', 'warn'],
  });
}

export const prisma = globalThis.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}
