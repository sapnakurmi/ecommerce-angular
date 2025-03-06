import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  cartTotal: number = 0;

  constructor(private fb: FormBuilder, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: [''],
      cardNumber: [''],
      expiration: ['', Validators.required],
      cvv: ['']
    });

    this.cartService.getCart().subscribe(cartItems => {
      this.cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
    });
  }

  placeOrder() {
    if (this.checkoutForm.valid) {
      this.cartService.clearCart(); 
      this.router.navigate(['/order-confirmation']);
    }
  }
}
