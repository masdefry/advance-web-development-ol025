import { hash } from 'bcrypt';

export const bcrypt = {
  async hashPassword(plainPassword: string, saltRounds: number = 10) {
    return await hash(plainPassword, saltRounds);
  },
};
