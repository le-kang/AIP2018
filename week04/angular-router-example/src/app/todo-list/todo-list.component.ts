import { Component, OnInit } from '@angular/core';
import isEmpty from 'lodash/isEmpty';
import { TodoService } from "../todo.service";
import { Todo } from "../todo";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    if (!isEmpty(this.todoService.todos)) {
      this.todos = this.todoService.todos;
    } else {
      this.getTodos()
    }
  }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos => {
        this.todoService.todos = todos;
        this.todos = todos;
      })
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id)
      .subscribe(todos => {
        this.todoService.todos = todos;
        this.todos = todos;
      })
  }

  onTodosUpdated(todos: Todo[]): void {
    this.todoService.todos = todos;
    this.todos = todos;
  }
}
