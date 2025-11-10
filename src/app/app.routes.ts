import { Routes } from '@angular/router';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { PostsTableComponent } from './components/posts-table/posts-table.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { UserTodosComponent } from './components/user-todos/user-todos.component';

export const routes: Routes = [
  { path: 'users', component: UsersTableComponent, title: 'მომხმარებლები' },
  {
    path: 'users/:id/posts',
    component: UserPostsComponent,
    title: 'მომხმარებლის პოსტები',
  },
  {
    path: 'users/:id/todos',
    component: UserTodosComponent,
    title: 'To Do სია',
  },
  { path: 'posts', component: PostsTableComponent, title: 'პოსტები' },
  { path: 'promotions', component: PromotionsComponent, title: 'აქციები' },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', redirectTo: '/users' },
];
