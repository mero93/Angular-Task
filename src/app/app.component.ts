import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PageContentWidthService } from './services/page-content-width.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  title = 'app';
  @ViewChild('pageContent') pageContent!: ElementRef;

  ngAfterViewInit(): void {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize() {
    console.log('fired');
    this.pageContentWidth.setPageContainerWidth(
      this.pageContent.nativeElement.offsetWidth
    );
  }

  constructor(private pageContentWidth: PageContentWidthService) {}
}
