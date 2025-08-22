import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
export class Product implements OnInit {
  productsList: any[] = [];       // all products
  filteredProducts: any[] = [];   // filtered list

  constructor(
    private products: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Load all products
    this.productsList = this.products.getProducts();
    this.filteredProducts = this.productsList;

    // Apply search filter if query param exists
    this.route.queryParams.subscribe(params => {
      const q = params['q']?.toLowerCase() || '';
      this.filteredProducts = this.productsList.filter(p =>
        p.name.toLowerCase().includes(q)
      );
    });
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
