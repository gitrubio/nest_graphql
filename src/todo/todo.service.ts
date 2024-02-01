import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs';
import { UpdateTodoInput } from './dto/inputs';
import { statusArgs } from './dto/args';

@Injectable()
export class TodoService {

    private todo  : Todo[] = [
        {id: 1, title: 'Todo 1', description: 'Description 1', done: false},
        {id: 2, title: 'Todo 2', description: 'Description 2', done: true},
        {id: 3, title: 'Todo 3', description: 'Description 3', done: false},
        {id: 4, title: 'Todo 4', description: 'Description 4', done: true},
    ]
    get  totalTodo(){
        return this.todo.length
    }
    
    get  completedTodos(){
        return this.todo.filter(todo => todo.done).length
    }
    get  pendingTodos(){
        return this.todo.filter(todo => todo.done === false).length
    }

    findAll(status? : statusArgs): Todo[] {
        if(status.status) return this.todo.filter(todo => todo.done === status.status);
        return this.todo
    }

    findOne(id: number): Todo {
      const todo =  this.todo.find(todo => todo.id === id);
      if(!todo) throw new NotFoundException(`Todo with id ${id} not found`)
      return todo
    }

    create( todoInput : CreateTodoInput) : Todo {
        const todo = new Todo();
        todo.id = Math.max(...this.todo.map(todo => todo.id)) + 1;
        todo.description = todoInput.description;
        todo.title = todoInput.title;
        this.todo.push(todo);
        return todo
    }

    update( todoInput : UpdateTodoInput) : Todo {
        const {id,title,description,done} = todoInput
        const updateTodo = this.findOne(id);
        updateTodo.description = description ?? updateTodo.description;
        updateTodo.title = title ?? updateTodo.title;
        updateTodo.done = done ?? updateTodo.done;
        this.todo = this.todo.map(todo => todo.id === id ? updateTodo : todo);
        return updateTodo
    }

    delete(id: number): boolean {
       this.todo = this.todo.filter(todo => todo.id !== id);
        return true
    }

    
}
