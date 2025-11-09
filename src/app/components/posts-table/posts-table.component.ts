import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-posts-table',
  imports: [],
  templateUrl: './posts-table.component.html',
  styleUrl: './posts-table.component.css',
})
export class PostsTableComponent implements OnInit {
  public posts: Post[] = [];

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.http.getPosts().subscribe((res) => {
      this.posts = res;
      console.log(res);
    });
  }
}
