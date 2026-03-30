// Prisma client singleton
// Note: Requires `npx prisma generate` after setting up DATABASE_URL in .env
// For development without a database, the app runs with mock data in the UI

let db: any = null;

try {
  const { PrismaClient } = require("@prisma/client");

  const globalForPrisma = globalThis as unknown as {
    prisma: any | undefined;
  };

  db =
    globalForPrisma.prisma ??
    new PrismaClient({
      log:
        process.env.NODE_ENV === "development"
          ? ["query", "error", "warn"]
          : ["error"],
    });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = db;
  }
} catch {
  // Prisma client not generated yet - running in mock mode
  db = null;
}

export { db };
