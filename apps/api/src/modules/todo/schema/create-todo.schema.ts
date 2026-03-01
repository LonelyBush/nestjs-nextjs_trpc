import z from 'zod';

export const createTodoSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean().default(false),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
