import { Request, Response } from 'express';
import { authService } from './auth.service';

export const authController = {
  async register(req: Request, res: Response) {
    const { name, password, email, role } = req.body;

    await authService.register({
      name,
      password,
      email,
      role,
    });

    res.status(201).json({
      success: true,
      message: 'Register user account successful',
      data: {
        name,
        email,
        role,
      },
    });
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const { accessToken, name, role } = await authService.login({
      email,
      password,
    });

    res.status(200).json({
      success: true,
      message: 'User authentication successful',
      data: {
        accessToken,
        name,
        role,
      },
    });
  },
};
