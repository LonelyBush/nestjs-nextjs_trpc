import { Input, Mutation, Query, Router, UseMiddlewares } from 'nestjs-trpc';
import {
  createTodoSchema,
  type CreateTodoInput,
} from './schema/create-todo.schema';
import { todoEntitySchema } from '../../entities/todo';
import z from 'zod';
import {
  updateTodoSchema,
  type UpdateTodoInput,
} from './schema/update-todo.schema';
import { TodoService } from './todo.service';
import { LoggedMiddleware } from '../../middleware/logger.middleware';

@Router({ alias: 'todo' })
export class TodoRouter {
  constructor(private readonly todoService: TodoService) {}


  @UseMiddlewares(LoggedMiddleware)
  @Query({
    output: z.array(todoEntitySchema),
  })
  findAll() {
    return this.todoService.findAll();
  }

  @UseMiddlewares(LoggedMiddleware)
  @Query({
    input: z.object({ id: z.string() }),
    output: todoEntitySchema,
  })
  getById(@Input() { id }: { id: string }) {
    return this.todoService.findById(id);
  }

  @UseMiddlewares(LoggedMiddleware)
  @Mutation({
    input: createTodoSchema,
    output: todoEntitySchema,
  })
  create(@Input() data: CreateTodoInput) {
    return this.todoService.create(data);
  }

  @UseMiddlewares(LoggedMiddleware)
  @Mutation({
    input: z.object({ id: z.string(), data: updateTodoSchema }),
    output: todoEntitySchema,
  })
  update(@Input('id') id: string, @Input('data') data: UpdateTodoInput) {
    return this.todoService.update(id, data);
  }

  @UseMiddlewares(LoggedMiddleware)
  @Mutation({
    input: z.object({ id: z.string() }),
    output: z.object({ success: z.boolean() }),
  })
  delete(@Input() { id }: { id: string }) {
    return this.todoService.delete(id);
  }
}
