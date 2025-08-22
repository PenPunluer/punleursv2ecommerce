import { Component } from '@angular/core';
import { CartService } from '../service/cart-service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
declare var Swal: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, DecimalPipe],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart {
  constructor(public cartService: CartService) {}

  // Increase item quantity
  increaseQuantity(item: any) {
    this.cartService.increaseQuantity(item);
  }

  // Decrease item quantity
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartService.decreaseQuantity(item);
    } else {
      // Show confirmation if quantity is 1
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

  // Remove item directly
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

  // Checkout with USD + KHR invoice
  checkout() {
    const totalUSD = this.cartService.getTotal();

    if (totalUSD <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Cart',
        text: 'Your cart is empty. Please add some products before checkout.'
      });
      return;
    }

    const conversionRate = 4100; // 1 USD = 4100 KHR
    const totalKHR = totalUSD * conversionRate;

    // Prepare invoice
    let invoice = `Product Invoice:\n\n`;
    this.cartService.getItem().forEach(item => {
      const itemTotalUSD = item.price * item.quantity;
      const itemTotalKHR = itemTotalUSD * conversionRate;
      invoice += `${item.name} x ${item.quantity} = $${itemTotalUSD.toFixed(2)} | ${itemTotalKHR.toLocaleString()} KHR\n`;
    });

    invoice += `\nGrand Total: $${totalUSD.toFixed(2)} | ${totalKHR.toLocaleString()} KHR`;

    Swal.fire({
      title: 'Confirm Checkout',
      html: `<pre style="text-align:left">${invoice}</pre>`,
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
          html: `<pre style="text-align:left">${invoice}</pre>`,
          timer: 3500,
          showConfirmButton: false
        });
      }
    });
  }
}
