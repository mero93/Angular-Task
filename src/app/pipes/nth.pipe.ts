import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'place',
})
export class PlacePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    let nth: string = '';

    switch (value) {
      case 1:
        nth = 'st';
        break;
      case 2:
        nth = 'nd';
        break;
      case 3:
        nth = 'rd';
        break;
      default:
        nth = 'th';
        break;
    }

    return `${value}${nth}`;
  }
}
