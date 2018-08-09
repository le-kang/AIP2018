import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from "./todo";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[];

  private todosUrl = 'api/todos';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl)
  }

  addTodo(todo: string) {
    return this.http.post<Todo[]>(this.todosUrl, { todo }, httpOptions)
  }

  deleteTodo(id: string) {
    return this.http.delete<Todo[]>(this.todosUrl + '/' + id)
  }
}
