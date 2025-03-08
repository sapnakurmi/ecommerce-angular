import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);
  cartItemCount = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
    this.loadCartFromStorage();
  }

  private saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartSubject.next(this.cart);
    this.cartItemCount.next(this.cart.length);
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
    this.saveCartToStorage();
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    this.saveCartToStorage();
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart');
    this.cartSubject.next(this.cart);
    this.cartItemCount.next(0);
  }
  updateCartItem(productId: number, quantity: number): Observable<any> {
    return this.http.put(`https://api.escuelajs.co/api/v1/cart/${productId}`, {
      quantity,
    });
  }
}
