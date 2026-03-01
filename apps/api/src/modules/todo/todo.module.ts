import { ConsoleLogger, Module } from '@nestjs/common';
import { TodoRouter } from './todo.router';
import { TodoService } from './todo.service';
import { StoreModule } from '../store/store.module';
import { LoggedMiddleware } from '../../middleware/logger.middleware';

@Module({
  imports: [StoreModule],
  providers: [ConsoleLogger, LoggedMiddleware, TodoService, TodoRouter],
})
export class TodoModule {}
