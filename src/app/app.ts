import { Component } from '@angular/core';
import { RouterOutlet ,RouterLink} from '@angular/router';
import { MainSlider } from './main-slider/main-slider';
import { ProductCard } from './product-card/product-card';
import { CartService } from './service/cart-service';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(public cartService: CartService) {}

   title : string = 'ng_Test';
  std_name: string = 'Punleur';
  std_age : number = 25;
  std_Url : string = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';


 
}
