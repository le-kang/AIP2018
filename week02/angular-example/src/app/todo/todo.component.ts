import { Component, OnInit } from '@angular/core';
import { TodoService } from "../todo.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todo: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  addTodo(): void {
    if (this.todo) {
      this.todoService.add(this.todo);
      this.todo = '';
    }
  }
}
