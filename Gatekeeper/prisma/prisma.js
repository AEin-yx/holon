const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../generated/prisma"); // Your custom output path
require("dotenv").config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// In Prisma 7, you MUST pass the adapter here for relational DBs
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
