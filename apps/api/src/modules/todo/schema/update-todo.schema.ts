import z from 'zod';

export const updateTodoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
