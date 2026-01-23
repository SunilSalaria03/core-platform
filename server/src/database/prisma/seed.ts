// Prisma seed
import { createPrismaClient } from './prisma.factory';
import { seedUsers } from './seeders/user.seed';

// create prisma client
const prisma = createPrismaClient();

async function main() {
  await seedUsers(prisma);
}

main()
  .catch(console.error)
  .finally(async () => {
    // disconnect from the database
    await prisma.$disconnect();
  });
