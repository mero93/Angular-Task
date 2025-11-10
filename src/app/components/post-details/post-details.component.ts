import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/post';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-details',
  imports: [CommonModule],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent {
  @Input() post!: Post;
}
