import { ConsoleLogger, Module } from '@nestjs/common';
import { TrpcModule } from './modules/trpc/trpc.module';
import { TodoModule } from './modules/todo/todo.module';
import { StoreModule } from './modules/store/store.module';

@Module({
  imports: [TrpcModule, TodoModule, StoreModule],
})
export class AppModule {}
