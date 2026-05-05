import * as z from 'zod';

export const authValidation = {
  registerUser: z.object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Email format is invalid')
      .transform((val) => val.trim().toLowerCase()),

    name: z.string().min(1, 'Name is required'),

    password: z.string().min(1, 'Password is required'),
  }),

  loginUser: z.object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Email format is invalid')
      .transform((val) => val.trim().toLowerCase()),

    password: z.string().min(1, 'Password is required'),
  }),
};
