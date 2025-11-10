import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  @Input() title!: string;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @ViewChild('modal') modal: any;
  private unlistener!: () => void;

  constructor(private renderer: Renderer2) {}

  @HostListener('document:keydown.escape')
  closeModal() {
    this.close.emit();
  }

  ngAfterViewInit(): void {
    if (this.modal) {
      this.unlistener = this.renderer.listen(
        this.modal.nativeElement,
        'click',
        (event: Event) => {
          if (event.target === this.modal.nativeElement) {
            this.closeModal();
          }
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.unlistener) {
      this.unlistener();
    }
  }
}
