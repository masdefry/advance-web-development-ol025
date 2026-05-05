import path from 'node:path';
import { prisma } from '../../database/database';
import { bcrypt } from '../../lib/bcrypt.lib';
import { jwt } from '../../lib/jwt.lib';
import transporter from '../../lib/nodemailer.lib';
import { LoginUserRequest, RegisterUserRequest } from './auth.model';
import fs from 'fs';
import Handlebars from 'handlebars';
import { JWT_SECRET_ACCOUNT_ACTIVATION } from '../../configs/dotenv.config';
import { Request } from 'express';

export const authService = {
  async register(data: RegisterUserRequest) {
    const findExistingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (findExistingUser) throw new Error('Email already registered');

    const hashedPassword = await bcrypt.hashPassword(data.password);

    const createdUser = await prisma.user.create({
      data: {
        name: data.name,
        password: hashedPassword,
        email: data.email,
      },
    });

    const accountActivationToken = await jwt.signToken(
      {
        userId: createdUser?.id,
      },
      JWT_SECRET_ACCOUNT_ACTIVATION!,
      {
        expiresIn: '10m',
      },
    );

    const templateDir = path.resolve(__dirname, './../../templates');

    const templatePath = path.join(templateDir, 'email-verification.html');

    const templateSource = fs.readFileSync(templatePath, 'utf-8');

    const templateCompiled = Handlebars.compile(templateSource);

    const templateHtml = templateCompiled({
      name: data.name,
      accountActivationUrl: `http://localhost:3000/account-activation/${accountActivationToken}`,
    });

    await transporter.sendMail({
      subject: 'Email Verification',
      to: data.email,
      html: templateHtml,
    });

    return {
      name: data.name,
      email: data.email,
    };
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
      role: findExistingUser?.role,
    };
  },

  async accountVerification(userId: string) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isVerified: true,
      },
    });
  },
};
