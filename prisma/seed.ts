import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Get default admin credentials from environment or use defaults
  const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@technician.com';
  const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'ChangeMe123!';
  const adminUsername = process.env.DEFAULT_ADMIN_USERNAME || 'admin';

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('✅ Admin user already exists');
    return;
  }

  // Hash password
  const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '10', 10);
  const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

  // Create default admin user
  const admin = await prisma.user.create({
    data: {
      firstName: 'Admin',
      lastName: 'User',
      email: adminEmail,
      username: adminUsername,
      password: hashedPassword,
      role: 'ADMIN',
      whitelisted: true,
    },
  });

  console.log('✅ Default admin user created:');
  console.log(`   Email: ${adminEmail}`);
  console.log(`   Username: ${adminUsername}`);
  console.log(`   Password: ${adminPassword}`);
  console.log('⚠️  Please change the password after first login!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
