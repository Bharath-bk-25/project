import { z } from 'zod';

const FarmerSchema = z.object({
  type: z.literal('farmer'),
  name: z.string(),
  age: z.string(),
  gender: z.string(),
  location: z.string(),
  crops: z.string(),
});

const WorkerSchema = z.object({
  type: z.literal('worker'),
  name: z.string(),
  age: z.string(),
  gender: z.string(),
  skills: z.string(),
  expectedSalary: z.string(),
  location: z.string(),
});

export const CreateUserInputSchema = z.union([FarmerSchema, WorkerSchema]);

export type CreateUserInput = z.infer<typeof CreateUserInputSchema>;
