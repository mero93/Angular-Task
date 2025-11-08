import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription, timer } from 'rxjs';
import { DatePipe } from '@angular/common';
import { AnimateClickDirective } from "../directives/animate-click.directive";

@Component({
  selector: 'app-header',
  imports: [DatePipe, AnimateClickDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  time = new Date();
  subscription: Subscription | undefined;

  ngOnInit(): void {
    this.subscription = timer(0, 1000)
      .pipe(map(() => new Date()))
      .subscribe((time) => {
        this.time = time;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
