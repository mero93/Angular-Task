import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription, timer } from 'rxjs';
import { DatePipe } from '@angular/common';
import { AnimateClickDirective } from '../directives/animate-click.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [DatePipe, AnimateClickDirective, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  time = new Date();
  timerSubscription: Subscription | undefined;
  dateFormat = '';

  ngOnInit(): void {
    this.timerSubscription = timer(0, 1000)
      .pipe(map(() => new Date()))
      .subscribe((time) => {
        this.time = time;
      });
    this.onWindowResize();
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize = () => {
    this.dateFormat =
      window.innerWidth < 768
        ? 'dd/MM/yyyy, h:mm:ss a'
        : 'dd MMM, yyyy, h:mm:ss a';
  };
}
