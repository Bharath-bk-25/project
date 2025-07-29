'use server';
/**
 * @fileOverview A flow for creating a new user and saving to a file.
 *
 * - createUser - A function that handles creating a user.
 * - CreateUserInput - The input type for the createUser function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as fs from 'fs/promises';
import path from 'path';

const USER_DATA_PATH = path.resolve(process.cwd(), 'data', 'users.json');

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
});

export const CreateUserInputSchema = z.union([FarmerSchema, WorkerSchema]);

export type CreateUserInput = z.infer<typeof CreateUserInputSchema>;

async function readUsers(): Promise<CreateUserInput[]> {
  try {
    await fs.access(USER_DATA_PATH);
    const fileContent = await fs.readFile(USER_DATA_PATH, 'utf-8');
    if (fileContent.trim() === '') {
      return [];
    }
    return JSON.parse(fileContent);
  } catch (error) {
    // If the file does not exist or is empty, return an empty array.
    const err = error as NodeJS.ErrnoException;
    if (err.code === 'ENOENT') {
      await fs.mkdir(path.dirname(USER_DATA_PATH), { recursive: true });
      await fs.writeFile(USER_DATA_PATH, '[]', 'utf-8');
      return [];
    }
    console.error('Error reading user data:', error);
    throw new Error('Could not read user data.');
  }
}

async function writeUsers(users: CreateUserInput[]): Promise<void> {
  try {
    await fs.writeFile(USER_DATA_PATH, JSON.stringify(users, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing user data:', error);
    throw new Error('Could not save user data.');
  }
}

export const createUserFlow = ai.defineFlow(
  {
    name: 'createUserFlow',
    inputSchema: CreateUserInputSchema,
    outputSchema: z.void(),
  },
  async (userData) => {
    const users = await readUsers();
    users.push(userData);
    await writeUsers(users);
  }
);

export async function createUser(input: CreateUserInput): Promise<void> {
    return await createUserFlow(input);
}
