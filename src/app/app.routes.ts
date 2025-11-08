import { Routes } from '@angular/router';
import { UsersTableComponent } from './users-table/users-table.component';
import { PostsTableComponent } from './posts-table/posts-table.component';
import { PromotionsComponent } from './promotions/promotions.component';

export const routes: Routes = [
  { path: 'users', component: UsersTableComponent, title: 'მომხმარებლები' },
  { path: 'posts', component: PostsTableComponent, title: 'პოსტები' },
  { path: 'promotions', component: PromotionsComponent, title: 'აქციები' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];
