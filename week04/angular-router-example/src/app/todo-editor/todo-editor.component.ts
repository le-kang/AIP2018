import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Todo } from "../todo";
import { TodoService } from "../todo.service";

@Component({
  selector: 'app-todo-editor',
  templateUrl: './todo-editor.component.html',
  styleUrls: ['./todo-editor.component.css']
})
export class TodoEditorComponent implements OnInit {
  todo: Todo;
  fetched = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todoService: TodoService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.todo = this.todoService.findTodo(id);
    if (!this.todo) {
      this.todoService.getTodo(id)
        .subscribe(todo => {
          if (todo) {
            this.todo = todo;
          } else {
            this.router.navigate(['/todo-list'])
          }
          this.fetched = true;
        });
    } else {
      this.fetched = true;
    }
  }

  updateTodo() {
    this.todoService.updateTodo(this.todo)
      .subscribe(todos => {
        this.todoService.todos = todos;
        this.router.navigate(['/todo-list'])
      });
  }
}
