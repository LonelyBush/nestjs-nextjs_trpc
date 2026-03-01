import { TRPCError } from '@trpc/server';

export class TodoNotFoundException extends TRPCError {
  constructor(id: string) {
    super({
      code: 'NOT_FOUND',
      message: `Todo with id "${id}" not found`,
    });
  }
}
