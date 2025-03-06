import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);
  cartItemCount = new BehaviorSubject<number>(0); // Track cart item count

 constructor(private http: HttpClient) {
    this.loadCartFromStorage(); // Load cart when service is initialized
  }

  private saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartSubject.next(this.cart);
    this.cartItemCount.next(this.cart.length); // Update cart count
  }

  private loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this.cartSubject.next(this.cart);
      this.cartItemCount.next(this.cart.length);
    }
  }

  getCart() {
    return this.cartSubject.asObservable();
  }

  getCartCount() {
    return this.cartItemCount.asObservable();
  }

  addToCart(product: Product) {
    this.cart.push(product);
    this.saveCartToStorage(); // Save to Local Storage
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    this.saveCartToStorage(); // Update Local Storage
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart'); // Remove cart from Local Storage
    this.cartSubject.next(this.cart);
    this.cartItemCount.next(0);
  }
  updateCartItem(productId: number, quantity: number): Observable<any> {
  return this.http.put(`https://api.escuelajs.co/api/v1/cart/${productId}`, { quantity });
}

}
