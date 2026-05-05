import { Request, Response } from 'express';
import { authService } from './auth.service';
import { validate } from '../../validations/validation';
import { authValidation } from '../../validations/auth.validation';

export const authController = {
  async register(req: Request, res: Response) {
    const data = validate(authValidation.registerUser, req.body);

    const {name, email} = await authService.register(data);

    res.status(201).json({
      success: true,
      message: 'Register user account successful',
      data: {
        name,
        email
      },
    });
  },

  async login(req: Request, res: Response) {
    const data = validate(authValidation.loginUser, req.body);

    const { accessToken, name, role } = await authService.login(data);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    res.status(200).json({
      success: true,
      message: 'User authentication successful',
      data: {
        name,
        role,
      },
    });
  },
};
