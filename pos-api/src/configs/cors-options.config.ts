import { CORS_WHITELIST } from './dotenv.config';

export const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) {
    if (CORS_WHITELIST?.split(',').includes(origin!) || origin === undefined) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  },
  credentials: true,
};
