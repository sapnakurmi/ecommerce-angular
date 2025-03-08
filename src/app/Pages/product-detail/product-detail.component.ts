import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.productService.getProductById(+id).subscribe(data => {
      this.product = data;

          if (!this.product.sizes || this.product.sizes.length === 0) {
        this.product.sizes = ["S", "M", "L", "XL"]; 
      }

      if (!this.product.colors || this.product.colors.length === 0) {
        this.product.colors = ["Red", "Blue", "Black"]; 
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
    this.formSubmitted = true;
    if (this.productForm.valid) {
      const selectedOptions = {
        ...this.product,
        selectedSize: this.productForm.value.selectedSize,
        selectedColor: this.productForm.value.selectedColor
      };
      this.cartService.addToCart(selectedOptions);
   
      this.router.navigate(['/cart']);
    }
  }
  
}
