import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoService } from "../todo.service";
import { Todo } from "../todo";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  @Input() todos: Todo[];

  @Output() todosUpdate = new EventEmitter<Todo[]>();

  constructor(private todoService: TodoService) { }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id)
      .subscribe(todos => this.todosUpdate.emit(todos))
  }
}
