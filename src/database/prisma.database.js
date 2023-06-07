const PrismaClient = require("@prisma/client").PrismaClient;
let prisma;

if (process.env.APP_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

module.exports = prisma;