import { createPrismaClient } from './prisma.factory';
import { seedUsers } from './seeders/user.seed';

const prisma = createPrismaClient();

async function main() {
  await seedUsers(prisma);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
