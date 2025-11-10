import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../../interfaces/todo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-todos',
  imports: [CommonModule],
  templateUrl: './user-todos.component.html',
  styleUrl: './user-todos.component.css',
})
export class UserTodosComponent implements OnInit {
  userId!: number;
  todos: Todo[] = [];

  constructor(private http: HttpService, private route: ActivatedRoute) {
    this.userId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.http.getUserTodos(this.userId).subscribe((data) => {
      this.todos = data;
    });
  }
}
