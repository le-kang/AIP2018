import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import find from 'lodash/find';
import { Todo } from "./todo";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosUrl = 'api/todos';
  todos: Todo[];

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl)
  }

  getTodo(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.todosUrl}/${id}`)
  }

  findTodo(id: string): Todo {
    return find(this.todos, { id: id });
  }

  addTodo(todo: string) {
    return this.http.post<Todo[]>(this.todosUrl, { todo }, httpOptions)
  }

  updateTodo(todo: Todo) {
    return this.http.put<Todo[]>(`${this.todosUrl}/${todo.id}`, {todo}, httpOptions)
  }

  deleteTodo(id: string) {
    return this.http.delete<Todo[]>(`${this.todosUrl}/${id}`)
  }
}
