import { Component } from '@angular/core';
import { RouterOutlet , RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from './service/cart-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  searchTerm: string = '';

  constructor(public cartService: CartService, private router: Router) {}

  // called when user types in search
  onSearchChange(value: string) {
    this.searchTerm = value;
    if (!value.trim()) {
      // if input is cleared → go home
      this.router.navigate(['/home']);
    }
  }

  onSearchSubmit() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/product'], { queryParams: { q: this.searchTerm } });
    } else {
      this.router.navigate(['/home']);
    }
  }
}
