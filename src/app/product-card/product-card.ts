import { Component, Input } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { UsdToKhrPipe } from '../usd-to-khr-pipe';

@Component({
  selector: 'app-product-card',
  imports: [JsonPipe, DecimalPipe, CurrencyPipe, UsdToKhrPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
    @Input() product : any = [];

    imageLoaded = false;
    isFavorite = false;
    isAddingToCart = false;
    

    addToCart() {
      if (this.product.qty <= 0) return;
      
      this.isAddingToCart = true;
      // Your cart logic here
      setTimeout(() => this.isAddingToCart = false, 1000);
    }
}


