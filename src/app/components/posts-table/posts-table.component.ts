import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/post';
import { HttpService } from '../../services/http.service';
import { PageContentWidthService } from '../../services/page-content-width.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts-table',
  imports: [CommonModule],
  templateUrl: './posts-table.component.html',
  styleUrl: './posts-table.component.css',
})
export class PostsTableComponent implements OnInit {
  public posts: Post[] = [];

  constructor(
    private http: HttpService,
    public pageContentWidth: PageContentWidthService
  ) {}

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
