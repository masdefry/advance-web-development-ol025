import jsonwebtoken, { SignOptions } from 'jsonwebtoken';

export const jwt = {
  async signToken(payload: any, secretKey: string, options: SignOptions) {
    return await jsonwebtoken.sign(payload, secretKey, options);
  },

  async verifyToken(token: string, secretKey: string) {
    return jsonwebtoken.verify(token, secretKey);
  },
};
