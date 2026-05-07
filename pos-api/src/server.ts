import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { authRouter } from './features/auth/auth.router';
import { corsOptions } from './configs/cors-options.config';
import { ZodError } from 'zod';
import cookieParser from 'cookie-parser';
import { productsRouter } from './features/products/products.router';

const PORT: number = 8000;
const app = express();
const API_PREFIX = '/api/v1';

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());

app.use(`${API_PREFIX}/auth`, authRouter);
app.use(`${API_PREFIX}/products`, productsRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: error.issues
        .map((i) => `${i.path.join('.')}: ${i.message}`)
        .join('; '),
    });
  }

  const statusCode = error.statusCode ? error.statusCode : 500;
  const message = error.isExpose ? error.message : 'Something went wrong';

  res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
});

app.listen(PORT, () => {
  console.log(`[⚡SERVER] Running on port ${PORT}`);
});
