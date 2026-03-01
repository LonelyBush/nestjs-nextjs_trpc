import { Injectable } from '@nestjs/common';
import { StoreService } from '../store/store.service';
import { TodoEntity } from '../../entities/todo';
import { CreateTodoInput } from './schema/create-todo.schema';
import { UpdateTodoInput } from './schema/update-todo.schema';
import { TodoNotFoundException } from './exceptions/todo-not-found.exception';

@Injectable()
export class TodoService {
  constructor(private readonly store: StoreService) {}

  findAll() {
    return this.store.findAll();
  }

  findById(id: string): TodoEntity | undefined {
    return this.store.findById(id);
  }

  create(data: CreateTodoInput): TodoEntity {
    const { title, description, completed } = data;

    return this.store.create({
      title,
      description,
      completed,
    });
  }

  update(id: string, data: UpdateTodoInput): TodoEntity {
    const { title, description, completed } = data;
    const todo = this.store.findById(id);

    if (!todo) {
      throw new TodoNotFoundException(id);
    }

    return this.store.update(id, {
      title: title ?? todo.title,
      description: description ?? todo.description,
      completed: completed ?? todo.completed,
      updatedAt: Date.now(),
      createdAt: todo.createdAt,
      id,
    });
  }

  delete(id: string): { success: boolean } {
    const todo = this.store.findById(id);

    if (!todo) {
      throw new TodoNotFoundException(id);
    }

    return { success: this.store.delete(id) };
  }
}
