import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, of } from 'rxjs';
import { User, UserFull } from './interfaces/user';
import { Post } from './interfaces/post';
import { Player } from './interfaces/player';
import { faker } from '@faker-js/faker';
import { Todo } from './interfaces/todo';

const API_URL = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}
  private users: User[] = [];
  private posts: Post[] = [];
  private leaderBoard: Player[] = [];
  private todos: Todo[] = [];

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

  getUserTodos(userId: number) {
    if (this.todos.length > 0) {
      return of(this.todos.filter((todo) => todo.userId === userId));
    }

    return this.http.get<Todo[]>(`${API_URL}/todos`).pipe(
      map((res) => {
        this.todos = res;
        return this.todos.filter((todo) => todo.userId === userId);
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

  /// Mock Leaderboard
  getLeaderBoard() {
    if (this.leaderBoard.length > 0) {
      return of(this.leaderBoard);
    }

    const players: Player[] = [];

    const uniqueIds = new Set<number>();
    const uniqueUsernames = new Set<string>();

    while (uniqueIds.size < 40 || uniqueUsernames.size < 40) {
      if (uniqueIds.size < 40) {
        uniqueIds.add(faker.number.int({ min: 1, max: 100 }));
      }

      if (uniqueUsernames.size < 40) {
        uniqueUsernames.add(faker.internet.username());
      }
    }

    const uniqueIdsArray = faker.helpers.shuffle(Array.from(uniqueIds));
    const uniqueUsernamesArray = faker.helpers.shuffle(
      Array.from(uniqueUsernames)
    );
    const uniquePlaces = faker.helpers.shuffle(
      Array.from({ length: 40 }, (_, i) => i + 1)
    );

    const playersPerWeekday = {
      I: 0,
      II: 0,
      III: 0,
      IV: 0,
    };

    const weekDays = ['I', 'II', 'III', 'IV'] as const;

    for (let i = 0; i < 40; i++) {
      let validDay = false;
      let weekDay;
      while (!validDay && weekDays.length > 0) {
        const randomWeekDay =
          weekDays[Math.floor(Math.random() * weekDays.length)];

        if (playersPerWeekday[randomWeekDay] < 10) {
          weekDay = randomWeekDay;
          validDay = true;
        }
        if (playersPerWeekday[randomWeekDay] >= 10) {
          weekDays.slice(weekDays.indexOf(randomWeekDay), 1);
        }
      }
      if (weekDay) {
        players.push({
          customerId: uniqueIdsArray[i],
          loginName: uniqueUsernamesArray[i],
          place: uniquePlaces[i],
          week: weekDay,
        });
      }
    }

    this.leaderBoard = players;

    return of(players);
  }
}
