import { Component } from '@angular/core';
import { MainSlider } from '../main-slider/main-slider';
import { ProductCard } from '../product-card/product-card';
import { CartService } from '../service/cart-service';
declare var Swal: any; // Declare Swal for SweetAlert2 usage
import { ProductService } from '../service/product-service';

@Component({
  selector: 'app-home',
  imports: [MainSlider, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  constructor(public cartService: CartService, public products: ProductService) {}

  

  onAddToCart(product: any) {
    this.cartService.addItem(product);

    Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500
});
  }

}
