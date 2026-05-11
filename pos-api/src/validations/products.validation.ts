import * as z from 'zod';

export const productsValidation = {
  getAll: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    categoryId: z.string().optional(),
    search: z.string().optional(),
  }),
};
