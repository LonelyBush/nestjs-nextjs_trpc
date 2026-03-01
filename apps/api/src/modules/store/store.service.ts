import { Injectable } from '@nestjs/common';
import { TodoEntity } from '../../entities/todo';

@Injectable()
export class StoreService {
  private store = new Map<string, TodoEntity>();

  create(data: Omit<TodoEntity, 'id' | 'createdAt' | 'updatedAt'>): TodoEntity {
    const now = Date.now();
    const record: TodoEntity = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: now,
      updatedAt: now,
    };
    this.store.set(record.id, record);
    return record;
  }

  findAll(): TodoEntity[] {
    return Array.from(this.store.values());
  }

  findById(id: string): TodoEntity | undefined {
    return this.store.get(id);
  }

  update(id: string, data: TodoEntity): TodoEntity {
    const update = {
      ...data,
      id,
      updatedAt: Date.now(),
    };

    this.store.set(id, update);
    return update;
  }

  delete(id: string): boolean {
    return this.store.delete(id);
  }
}
