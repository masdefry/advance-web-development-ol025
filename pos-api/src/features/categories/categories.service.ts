import { prisma } from '../../database/database';
import { CategoriesCreateRequest } from './categories.model';

export const categoriesService = {
  async create({ name }: CategoriesCreateRequest) {
    await prisma.category.create({
      data: { name },
    });

    return { name };
  },

  async getAll(){
    return await prisma.category.findMany()
  }
};
