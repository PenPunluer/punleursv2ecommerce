import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MainSlider } from '../main-slider/main-slider';
import { ProductCard } from '../product-card/product-card';
import { CartService } from '../service/cart-service';
import { ProductService } from '../service/product-service';
declare var Swal: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainSlider, ProductCard, FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  products: any[] = [];

  constructor(
    public cartService: CartService,
    public productService: ProductService
  ) {
    // Subscribe to products observable
    this.productService.products$.subscribe(data => this.products = data);
  }

  onAddToCart(product: any) {
    this.cartService.addItem(product);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Added to Cart',
      text: `${product.name} has been added!`,
      showConfirmButton: false,
      timer: 1500,
      toast: true
    });
  }

  trackByProductId(index: number, product: any) {
    return product.id;
  }

  // Filter products based on search term in navbar
  get filteredProducts() {
    const term = this.cartService.searchTerm.toLowerCase();
    return this.products.filter(p =>
      p.name.toLowerCase().includes(term)
    );
  }
}
