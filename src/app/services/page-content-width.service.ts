import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageContentWidthService {
  private pageContainerSource = new BehaviorSubject<number>(0);
  public pageContainer$ = this.pageContainerSource.asObservable();

  public setPageContainerWidth(width: number): void {
    this.pageContainerSource.next(width);
  }
}
