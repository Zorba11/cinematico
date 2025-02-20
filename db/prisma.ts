import { PrismaClient } from '@prisma/client';

// Declare global variable for prisma instance
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a singleton instance of PrismaClient
const db =
  global.prisma ||
  new PrismaClient({
    log: ['error', 'warn'],
  });

// In development, save the prisma instance to global
if (process.env.NODE_ENV === 'development') {
  global.prisma = db;
}

// Graceful connection handling
try {
  await db.$connect();
} catch (error) {
  if (error instanceof Error) {
    console.error('Failed to connect to the database:', error.message);
  } else {
    console.error('An unexpected error occurred:', error);
  }
  process.exit(1);
}

export { db };
