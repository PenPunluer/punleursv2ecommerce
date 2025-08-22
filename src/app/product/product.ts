import { Component } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { ProductService } from '../service/product-service';
import { CartService } from '../service/cart-service';
declare var Swal: any;

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ProductCard],
  templateUrl: './product.html',
  styleUrls: ['./product.css']
})
export class Product {
  productsList: any[] = []; // store products here

  constructor(
    private products: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    // fetch products once
    this.productsList = this.products.getProducts();
    // if getProducts() returns Observable:
    // this.products.getProducts().subscribe(res => this.productsList = res);
  }

  onAddToCart(product: any) {
    this.cartService.addItem(product);

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Product added to cart!',
      showConfirmButton: false,
      timer: 1500
    });
  }
}
