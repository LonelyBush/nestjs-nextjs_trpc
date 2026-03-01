import z from 'zod';

export const todoEntitySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean(),
  createdAt: z.number(),
  updatedAt: z.number(),
});
export type TodoEntity = z.infer<typeof todoEntitySchema>;
