import { Component, EventEmitter, Output } from '@angular/core';
import { TodoService } from "../todo.service";
import {Todo} from "../todo";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  todo: string = '';

  @Output() todosUpdate = new EventEmitter<Todo[]>();

  constructor(private todoService: TodoService) { }

  addTodo(): void {
    if (this.todo.trim() !== '') {
      this.todoService.addTodo(this.todo)
        .subscribe(todos => this.todosUpdate.emit(todos));
    }
    this.todo = ''
  }
}
