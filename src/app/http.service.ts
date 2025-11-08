import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, of } from 'rxjs';
import { User, UserFull } from '../interfaces/user';
import { Post } from '../interfaces/post';

const API_URL = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}
  private users: User[] = [];
  private posts: Post[] = [];
  private leaderBoard = [];

  getUsers() {
    if (this.users.length > 0) {
      return of(this.users);
    }
    return this.http.get<UserFull[]>(`${API_URL}/users`).pipe(
      map((res) => {
        this.users = res.map((user) => {
          return {
            id: user.id,
            email: user.email,
            phone: user.phone.split(' x')[0],
            companyName: user.company.name,
            lastName: user.name.split(' ')[1],
            name: user.name.split(' ')[0],
          };
        });
        return this.users;
      })
    );
  }

  getPosts() {
    if (this.posts.length > 0) {
      return of(this.posts);
    }
    return forkJoin([
      this.getUsers(),
      this.http.get<Post[]>(`${API_URL}/posts`),
    ]).pipe(
      map(([users, posts]) => {
        this.posts = posts.map((post) => {
          const user = users.find((user) => user.id === post.userId);
          return {
            ...post,
            authorName: user ? `${user.name} ${user.lastName}` : 'No Name',
          };
        });

        return this.posts;
      })
    );
  }

  getPromotions() {}
}
