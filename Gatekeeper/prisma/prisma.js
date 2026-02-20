const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../generated/prisma"); // Your custom output path

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// In Prisma 7, you MUST pass the adapter here for relational DBs
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
