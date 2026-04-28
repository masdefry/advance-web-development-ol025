import { User } from '../../../generated/prisma/client';
import { prisma } from '../../database/database';
import { bcrypt } from '../../lib/bcrypt.lib';

export const authService = {
  async register({
    name,
    password,
    email,
    role,
  }: Pick<User, 'name' | 'password' | 'role' | 'email'>) {
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (findUser) throw new Error('Email already registered');

    const hashedPassword = await bcrypt.hashPassword(password);

    await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        email,
        role,
      },
    });
  },
};
