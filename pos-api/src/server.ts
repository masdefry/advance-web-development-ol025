import express, { NextFunction, Request, Response } from 'express';
import { authRouter } from './features/auth/auth.router';

const PORT: number = 8000;
const app = express();
const API_PREFIX = '/api/v1';

app.use(express.json());

app.use(`${API_PREFIX}/auth`, authRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: error?.message,
    data: null,
  });
});

app.listen(PORT, () => {
  console.log(`[⚡SERVER] Running on port ${PORT}`);
});
