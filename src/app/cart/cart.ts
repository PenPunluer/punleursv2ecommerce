import { Component } from '@angular/core';
import { CartService } from '../service/cart-service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var Swal: any; 

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart {
  constructor(public cartService: CartService) {}

  removeItem(item: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to remove "${item.name}" from your cart?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.cartService.removeItem(item);
        Swal.fire({
          title: 'Removed!',
          text: `"${item.name}" has been removed from your cart.`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  increaseQuantity(item: any) {
    this.cartService.increaseQuantity(item);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartService.decreaseQuantity(item);
    } else {
      // Show alert if quantity is 1
      Swal.fire({
        title: 'Remove Item?',
        text: `Quantity is 1. Do you want to remove "${item.name}" from your cart?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6'
      }).then((result: any) => {
        if (result.isConfirmed) {
          this.cartService.removeItem(item);
          Swal.fire({
            title: 'Removed!',
            text: `"${item.name}" has been removed from your cart.`,
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        }
      });
    }
  }

  checkout() {
    const total = this.cartService.getTotal();

    if (total <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Cart',
        text: 'Your cart is empty. Please add some products before checkout.'
      });
      return;
    }

    Swal.fire({
      title: 'Confirm Checkout',
      text: `Your total is ${total.toFixed(2)}. Do you want to proceed?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Checkout!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#6c757d'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.cartService.clearCart(); 

        Swal.fire({
          icon: 'success',
          title: 'Order Placed!',
          text: 'Thank you for your purchase.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
}
