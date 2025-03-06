import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  productForm!: FormGroup;
  formSubmitted = false;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.productService.getProductById(+id).subscribe(data => {
      this.product = data;

          if (!this.product.sizes || this.product.sizes.length === 0) {
        this.product.sizes = ["S", "M", "L", "XL"]; // Default sizes
      }

      if (!this.product.colors || this.product.colors.length === 0) {
        this.product.colors = ["Red", "Blue", "Black"]; // Default colors
      }

      this.initializeForm();
    });
  }
  }

  initializeForm() {
    this.productForm = this.fb.group({
      selectedSize: ['', Validators.required],
      selectedColor: ['', Validators.required]
    });
  }

  addToCart() {
    this.formSubmitted = true; // Mark form as submitted
    if (this.productForm.valid) {
      const selectedOptions = {
        ...this.product,
        selectedSize: this.productForm.value.selectedSize,
        selectedColor: this.productForm.value.selectedColor
      };
      this.cartService.addToCart(selectedOptions);
      alert('Product added to cart with selected options!');
    }
  }
  
}
