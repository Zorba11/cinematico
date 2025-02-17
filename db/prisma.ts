import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

// Optional: Immediately test the connection.
// In many applications, you may instead connect when needed.
db.$connect().catch((error) => {
  console.error('Error connecting to the database:', error);
  process.exit(1);
});

export { db };
