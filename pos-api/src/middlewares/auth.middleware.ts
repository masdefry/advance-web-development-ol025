import { NextFunction, Request, Response } from 'express';
import { jwt } from '../lib/jwt.lib';
import { JWT_SECRET_AUTH_LOGIN } from '../configs/dotenv.config';

export const authMiddleware = {
  async verifyToken(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) throw new Error('Token must be provided');

    const payload = await jwt.verifyToken(accessToken, JWT_SECRET_AUTH_LOGIN!);

    res.locals.payload = payload; 

    next();
  },

  requireAuth(permitRole: string[]){
    return (req: Request, res: Response, next: NextFunction) => {
      const payload = res.locals.payload; 
      
      if(!permitRole.includes(payload.role)) throw new Error('User role is unauthorized');
      
      next();
    }
  }
};
