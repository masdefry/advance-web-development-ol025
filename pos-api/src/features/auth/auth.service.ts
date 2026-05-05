import { User } from '../../../generated/prisma/client';
import { prisma } from '../../database/database';
import { bcrypt } from '../../lib/bcrypt.lib';
import { jwt } from '../../lib/jwt.lib';
import { LoginUserRequest, RegisterUserRequest } from './auth.model';

export const authService = {
  async register(data: RegisterUserRequest) {
    const findExistingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (findExistingUser) throw new Error('Email already registered');

    const hashedPassword = await bcrypt.hashPassword(data.password);

    await prisma.user.create({
      data: {
        name: data.name,
        password: hashedPassword,
        email: data.email,
      },
    });

    return {
      name: data.name, 
      email: data.email
    }
  },

  async login(data: LoginUserRequest) {
    const findExistingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!findExistingUser) throw new Error('Invalid credential user account');

    const isMatched = await bcrypt.hashCompare(
      data.password,
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
