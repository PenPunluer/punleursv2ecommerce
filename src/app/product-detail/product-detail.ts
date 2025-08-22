import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../service/cart-service';

declare const axios: any;
declare const $: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'],
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule]
})
export class ProductDetailComponent implements OnInit {
  product: any = null;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  async ngOnInit() {
    const product_id = this.route.snapshot.queryParamMap.get('product_id');
    if (!product_id) {
      alert('❌ Invalid request! Redirecting to home...');
      this.router.navigate(['/home']);
      return;
    }

    const apiUrl = `https://sv-gen-api.bczin2zin2takeo.us/api/product_detail?id=${product_id}`;
    $.LoadingOverlay("show");

    try {
      const response = await axios.get(apiUrl);
      this.product = Array.isArray(response.data) ? response.data[0] : response.data;

      if (!this.product) {
        alert('❌ Product not found! Redirecting to home...');
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('❌ Product not found! Redirecting to home...');
      this.router.navigate(['/home']);
    } finally {
      $.LoadingOverlay("hide");
    }
  }

  onAddToCart() {
    if (!this.product || this.quantity < 1) return;

    this.cartService.addItem(this.product, this.quantity);
    alert(`🛒 Added ${this.quantity} of ${this.product.name} to cart`);
  }
}
