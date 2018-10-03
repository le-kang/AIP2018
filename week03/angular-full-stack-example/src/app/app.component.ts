import { Component, OnInit } from '@angular/core';
import { Todo } from "./todo";
import { TodoService } from "./todo.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Todo List';

  todos: Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos()
  }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos => this.todos = todos)
  }

  onTodosUpdated(todos: Todo[]): void {
    this.todos = todos;
  }
}
