import { PrismaClient } from "@prisma/client";
import { NODE_ENV } from "./env";

declare global {
  var prisma: PrismaClient;
}

let prisma: PrismaClient;

if (NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
