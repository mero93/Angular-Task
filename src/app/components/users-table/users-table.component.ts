import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { HttpService } from '../../services/http.service';
import { PageContentWidthService } from '../../services/page-content-width.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-table',
  imports: [CommonModule, RouterLink],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class UsersTableComponent implements OnInit {
  public users: User[] = [];
  public contentWidth: number = 0;

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

  userPosts() {
    console.log('userPosts');
  }
}
