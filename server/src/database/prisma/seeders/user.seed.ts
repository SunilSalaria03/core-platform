// User seed
import { PrismaClient } from '@prisma/client';
import { RANDOM_CONSTANTS } from 'src/common/constants/random.constants';
import { UserRole } from 'src/common/enums/user.enum';
import { ADMIN_CONSTANTS } from 'src/modules/admin/constants/admin.constants';
import { hashValue } from 'src/shared/helpers/crypto.helper';

export async function seedUsers(prisma: PrismaClient) {
  // admin email
  const adminEmail = ADMIN_CONSTANTS.EMAIL;

  // check if the admin user already exists
  const existing = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existing) return;

  // admin role
  const role = UserRole.Admin;
  // admin password hash
  const passwordHash = await hashValue(ADMIN_CONSTANTS.PASSWORD, RANDOM_CONSTANTS.SALT_ROUNDS);

  // create admin user
  await prisma.user.create({
    data: {
      name: ADMIN_CONSTANTS.NAME,
      email: adminEmail,
      password: passwordHash,
      role: role,
      emailVerified: true,
      isActive: true,
    },
  });
}
