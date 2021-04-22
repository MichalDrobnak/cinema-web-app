import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural',
})
export class PluralPipe implements PipeTransform {
  transform(count: number, wordBase: string): string {
    const suffix = count < 2 ? '' : count < 5 ? 'y' : 'ov';
    return `${count} ${wordBase}${suffix}`;
  }
}
