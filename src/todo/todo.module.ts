import { Module } from '@nestjs/common';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/items/entities/item.entity';

@Module({
  providers: [TodoResolver, TodoService],
  imports: [
    TypeOrmModule.forFeature([ Item ])
  ],
})
export class TodoModule {}
