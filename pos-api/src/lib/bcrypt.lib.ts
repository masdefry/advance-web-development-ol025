import { hash, compare } from 'bcrypt';

export const bcrypt = {
  async hashPassword(plainPassword: string, saltRounds: number = 10) {
    return await hash(plainPassword, saltRounds);
  },
  async hashCompare(plainPassword: string, hashedPassword: string){
    return await compare(plainPassword, hashedPassword)
  }
};
