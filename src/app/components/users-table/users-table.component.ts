import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { HttpService } from '../../services/http.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-table',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class UsersTableComponent implements OnInit {
  public users: User[] = [];
  public searchTerm: string = '';

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.getUsers(this.searchTerm).subscribe((res) => {
      this.users = res;
    });
  }
}
