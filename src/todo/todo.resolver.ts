import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/inputs';
import { UpdateTodoInput } from './dto/inputs';
import { statusArgs } from './dto/args';
import { AggregationsType } from './types/aggregtions.type';

@Resolver(()=> Todo)
export class TodoResolver {
  constructor(private readonly todoServices: TodoService) {}

  @Query(() => [Todo], { name: 'todos' })
  findAll(@Args({nullable: true}) status : statusArgs): Todo[] {
    return this.todoServices.findAll(status);
  }

  @Query(() => Todo, { name: 'todoById' })
  findOne(@Args('id',{type : ()=> Int}) id: number): Todo {
    return this.todoServices.findOne(id);
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  create(@Args('createTodoInput') createTodoInput : CreateTodoInput): Todo {
    console.log({createTodoInput});
    return this.todoServices.create(createTodoInput);
  }

  @Mutation(() => Todo, { name: 'updateTodo' })
  update(@Args('createTodoInput') UpdateTodo : UpdateTodoInput): Todo {
   return this.todoServices.update(UpdateTodo);
  }

  @Mutation(() => Boolean, { name: 'deleteTodo' })
  remove(@Args('id', {type : ()=> Int }) id : number): boolean {
    return this.todoServices.delete(id);
  }

  @Query(() => Int,  { name:  'totalTodos'})
  totalTodos(){
    return this.todoServices.totalTodo;
  }
  @Query(() => Int,  { name:  'completedTodos'})
  completedTodos(){
    return this.todoServices.totalTodo;
  }
  @Query(() => Int,  { name:  'pendingTodos'})
  pendingTodos(){
    return this.todoServices.totalTodo;
  }

  @Query(() => AggregationsType,  { name:  'aggregations'})
  aggregations() {
    return {
      total : this.todoServices.totalTodo,
      completed : this.todoServices.completedTodos,
      pending : this.todoServices.pendingTodos
    }
  }
}
