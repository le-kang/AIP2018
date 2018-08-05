import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: string[] = [];

  add(todo: string) {
    this.todos.push(todo)
  }
}
