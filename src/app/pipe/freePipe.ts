import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'free'
})
export class FreePipe implements PipeTransform {
  transform(value: string): string {
    const numericValue = parseFloat(value.replace(',', '.'));
    if (numericValue === 0) {
      return 'Grátis';
    }
    return 'R$' + value;
  }
}
