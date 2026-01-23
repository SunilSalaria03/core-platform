import { PrismaClient } from '@prisma/client';
import { RANDOM_CONSTANTS } from 'src/common/constants/random.constants';
import { UserRole } from 'src/common/enums/user.enum';
import { ADMIN_CONSTANTS } from 'src/modules/admin/constants/admin.constants';
import { hashValue } from 'src/shared/helpers/crypto.helper';

export async function seedUsers(prisma: PrismaClient) {
  const adminEmail = ADMIN_CONSTANTS.EMAIL;

  const existing = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existing) return;

  const role = UserRole.Admin;
  const passwordHash = await hashValue(ADMIN_CONSTANTS.PASSWORD, RANDOM_CONSTANTS.SALT_ROUNDS);

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
