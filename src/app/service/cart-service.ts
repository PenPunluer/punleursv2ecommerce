import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: any[] = [];

  constructor() {
    this.cart = JSON.parse(localStorage.getItem('cart') ?? '[]');
  }

  // Add item with optional quantity
  addItem(item: any, quantity: number = 1) { 
    let dpl_index = this.cart.findIndex(i => i.id === item.id);

    if (dpl_index !== -1) {
      this.cart[dpl_index].quantity += quantity;
    } else {
      item.quantity = quantity;
      this.cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getItem(): any[] {
    return this.cart;
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }

  removeItem(item: any) {
    this.cart = this.cart.filter(i => i.id !== item.id);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  increaseQuantity(item: any) {
    const index = this.cart.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.cart[index].quantity += 1;
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  decreaseQuantity(item: any) {
    const index = this.cart.findIndex(i => i.id === item.id);
    if (index !== -1 && this.cart[index].quantity > 1) {
      this.cart[index].quantity -= 1;
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart');
  }
}
