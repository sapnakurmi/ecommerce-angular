import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  product: any;

  constructor(private cartService: CartService) {}


    ngOnInit(): void {
      this.cartService.getCart().subscribe(data => {
        this.cartItems = data.map(item => ({
          ...item,
          quantity: item.quantity || 1 
        }));
      });

    }
    
  


  clearCart() {
    this.cartService.clearCart();
  }
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  
  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }
  
  increaseQuantity(index: number) {
    this.cartItems[index].quantity++;
  }
  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    } else {
      this.removeFromCart(index);
    }
  }
  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
