import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { User } from '../interfaces/user';
import { CommonModule } from '@angular/common';
import { PageContentWidthService } from '../services/page-content-width.service';

@Component({
  selector: 'app-users-table',
  imports: [CommonModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class UsersTableComponent implements OnInit {
  public users: User[] = [];

  constructor(
    private http: HttpService,
    public pageContentWidth: PageContentWidthService
  ) {}

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
