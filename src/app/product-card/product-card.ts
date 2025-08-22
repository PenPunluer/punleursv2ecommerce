import { Component, EventEmitter, Input,Output } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { UsdToKhrPipe } from '../usd-to-khr-pipe';
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [JsonPipe, DecimalPipe, CurrencyPipe, UsdToKhrPipe, CommonModule, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
    @Input() product : any = [];

    @Output() addToCart: any = new EventEmitter<any>();

    onAddToCart(product: any) {
       return this.addToCart.emit(product);
    }

    imageLoaded = false;
    isFavorite = false;
    isAddingToCart = false;
    

}


