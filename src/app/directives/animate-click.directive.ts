import {
  Directive,
  ElementRef,
  Host,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appAnimateClick]',
  standalone: true,
})
export class AnimateClickDirective {
  @Input() animationClass = 'clicked';
  @Input() duration = 500;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'animation-duration',
      `${this.duration}ms`
    );
    console.log(this.el.nativeElement.classList);
    this.renderer.addClass(this.el.nativeElement, this.animationClass);
    console.log(this.el.nativeElement.classList);

    setTimeout(() => {
      this.renderer.removeClass(this.el.nativeElement, this.animationClass);
      console.log(this.el.nativeElement.classList);
    }, this.duration);
  }
}
