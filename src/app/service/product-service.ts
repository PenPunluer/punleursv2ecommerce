import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
declare const axios: any;
declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsSubject = new BehaviorSubject<any[]>([]);
  products$ = this.productsSubject.asObservable();
  private apiUrl: string = 'https://sv-gen-api.bczin2zin2takeo.us/api/product'; 

  constructor() { 
    this.fetchProducts();
  }

  private fetchProducts() {
    $.LoadingOverlay("show");
    axios.get(this.apiUrl)
      .then((response: any) => this.productsSubject.next(response.data))
      .catch((error: any) => { console.error(error); this.productsSubject.next([]); })
      .finally(() => $.LoadingOverlay("hide"));
  }

  getProducts(): any[] {
    return this.productsSubject.value;
  }
}
