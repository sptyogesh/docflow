import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password", 10);

  await prisma.user.upsert({
    where: { email: "owner@test.com" },
    update: {},
    create: { email: "owner@test.com", password },
  });

  await prisma.user.upsert({
    where: { email: "user@test.com" },
    update: {},
    create: { email: "user@test.com", password },
  });

  console.log("Seeded users: owner@test.com, user@test.com (password: password)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
