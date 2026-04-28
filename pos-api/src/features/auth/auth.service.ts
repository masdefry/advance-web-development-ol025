import { User } from '../../../generated/prisma/client';
import { prisma } from '../../database/database';
import { bcrypt } from '../../lib/bcrypt.lib';
import { jwt } from '../../lib/jwt.lib';

export const authService = {
  async register({
    name,
    password,
    email,
    role,
  }: Pick<User, 'name' | 'password' | 'role' | 'email'>) {
    const findExistingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (findExistingUser) throw new Error('Email already registered');

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

  async login({ email, password }: Pick<User, 'email' | 'password'>) {
    const findExistingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!findExistingUser) throw new Error('Invalid credential user account');

    const isMatched = await bcrypt.hashCompare(
      password,
      findExistingUser?.password,
    );

    if (!isMatched) throw new Error('Invalid credential user account');

    const accessToken = await jwt.signToken(
      {
        role: findExistingUser?.role,
        userId: findExistingUser?.id,
      },
      'POSAPP@jcwdol025',
      {
        expiresIn: '1h',
      },
    );

    return {
      accessToken, 
      name: findExistingUser?.name, 
      role: findExistingUser?.role
    }
  },
};
