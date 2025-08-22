import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];
  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  constructor() {
    this.cart = JSON.parse(localStorage.getItem('cart') ?? '[]');
  }

  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

  get searchTerm() {
    return this.searchTermSubject.value;
  }

  // --- your existing cart methods ---
  addItem(item: any, quantity: number = 1) { 
    const index = this.cart.findIndex(i => i.id === item.id);
    if (index !== -1) this.cart[index].quantity += quantity;
    else { item.quantity = quantity; this.cart.push(item); }
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getItem(): any[] { return this.cart; }
  getTotal(): number { return this.cart.reduce((sum, i) => sum + i.quantity * i.price, 0); }
  removeItem(item: any) { this.cart = this.cart.filter(i => i.id !== item.id); localStorage.setItem('cart', JSON.stringify(this.cart)); }
  increaseQuantity(item: any) { const index = this.cart.findIndex(i => i.id === item.id); if (index !== -1) { this.cart[index].quantity++; localStorage.setItem('cart', JSON.stringify(this.cart)); } }
  decreaseQuantity(item: any) { const index = this.cart.findIndex(i => i.id === item.id); if (index !== -1 && this.cart[index].quantity > 1) { this.cart[index].quantity--; localStorage.setItem('cart', JSON.stringify(this.cart)); } }
  clearCart() { this.cart = []; localStorage.removeItem('cart'); }
}
