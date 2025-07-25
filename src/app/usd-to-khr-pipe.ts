import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usdToKhr',
  standalone: true 
})
export class UsdToKhrPipe implements PipeTransform {
  private exchangeRate: number = 4100;

  transform(value: number, ...args: any[]): string {
    if (isNaN(value)) return '';

    const rielValue = value * this.exchangeRate;
    
    return new Intl.NumberFormat('km-KH', {
      style: 'decimal',
      maximumFractionDigits: 0
    }).format(rielValue) + ' ៛';
  }
}