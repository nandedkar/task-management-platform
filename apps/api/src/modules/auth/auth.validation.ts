import { z } from 'zod';

export const RegisterSchema = z.object({
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  email: z.email(),
  password: z
    .string()
    .min(6)
    .max(100)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[!@#$%^&*]/),
});

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});
