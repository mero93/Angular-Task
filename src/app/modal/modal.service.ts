import {
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { Post } from '../interfaces/post';
import { PostDetailsComponent } from '../components/post-details/post-details.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  private openModal(
    viewRef: ViewContainerRef,
    content: ComponentRef<any>,
    title: string = 'Modal Title'
  ) {
    const modalComponent = viewRef.createComponent(ModalComponent, {
      injector: this.injector,
      projectableNodes: [[content.location.nativeElement]],
    });

    modalComponent.instance.title = title;

    modalComponent.instance.close.subscribe(() => {
      modalComponent.destroy();
    });
    content.onDestroy(() => modalComponent.destroy());

    this.document.body.appendChild(modalComponent.location.nativeElement);
  }

  public openPostModal(
    viewRef: ViewContainerRef,
    post: Post,
    title: string = 'Modal Title'
  ) {
    const postDetails = viewRef.createComponent(PostDetailsComponent);
    postDetails.instance.post = post;

    this.openModal(viewRef, postDetails, title);
  }
}
