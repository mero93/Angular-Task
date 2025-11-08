import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-users-table',
  imports: [],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class UsersTableComponent implements OnInit {
  public users: User[] = [];

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.getUsers().subscribe((res) => {
      this.users = res;
      console.log(res);
    });
  }
}
