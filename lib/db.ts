import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["query", "error", "warn"],
    errorFormat: "minimal",
  });
};

const db = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// Ensure db connection is closed on app termination
process.on("beforeExit", async () => {
  await db.$disconnect();
});

export default db;
