import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Product } from './product/product';
import { ProductDetailComponent } from './product-detail/product-detail';
import { Cart } from './cart/cart';
import { Error404 } from './error404/error404';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'product', component: Product },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'cart', component: Cart },
  { path: '**', component: Error404 }
];
