import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Post } from '../../interfaces/post';
import { HttpService } from '../../services/http.service';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../modal/modal.service';
import { PostCardComponent } from '../post-card/post-card.component';
import { PostDetailsComponent } from '../post-details/post-details.component';

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
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.http.getPosts().subscribe((res) => {
      this.posts = res;
    });
  }

  openModal(post: Post) {
    const postDetails =
      this.viewContainerRef.createComponent(PostDetailsComponent);
    postDetails.instance.post = post;

    this.modalService.openModal(
      this.viewContainerRef,
      postDetails,
      'პოსტის დეტალები'
    );
  }
}
