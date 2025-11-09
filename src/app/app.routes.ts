import { Routes } from '@angular/router';
import { UsersTableComponent } from './users-table/users-table.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { PostsTableComponent } from './components/posts-table/posts-table.component';

export const routes: Routes = [
  { path: 'users', component: UsersTableComponent, title: 'მომხმარებლები' },
  { path: 'posts', component: PostsTableComponent, title: 'პოსტები' },
  { path: 'promotions', component: PromotionsComponent, title: 'აქციები' },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', redirectTo: '/users' },
];
