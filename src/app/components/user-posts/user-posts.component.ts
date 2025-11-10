import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Post } from '../../interfaces/post';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from '../post-card/post-card.component';
import { ModalService } from '../../modal/modal.service';

@Component({
  selector: 'app-user-posts',
  imports: [CommonModule, PostCardComponent],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css',
})
export class UserPostsComponent implements OnInit {
  posts: Post[] = [];
  userId!: number;

  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private viewRef: ViewContainerRef
  ) {
    this.route.params.subscribe((params) => {
      this.userId = +params['id'];
    });
  }

  ngOnInit(): void {
    this.loadUserPosts(this.userId);
  }

  loadUserPosts(userId: number) {
    this.http.getUserPosts(userId).subscribe((posts) => {
      this.posts = posts;
    });
  }

  openModal(post: Post) {
    this.modalService.openPostModal(this.viewRef, post, 'პოსტის დეტალები');
  }
}
