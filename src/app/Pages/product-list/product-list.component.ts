import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  searchTerm: string = '';
  maxPrice: number | null = null;
  sortDirection: string = 'lowToHigh';
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.extractCategories();
      this.applyFilters();
    });
  }

  extractCategories() {
    this.categories = Array.from(
      new Set(this.products.map((p) => p.category.name))
    );
  }

  applyFilters() {
    let filtered = this.products.filter(product => {
      const matchesCategory = this.selectedCategory ? product.category.name === this.selectedCategory : true;
      const matchesSearch = product.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesPrice = this.maxPrice ? product.price <= this.maxPrice : true;
      return matchesCategory && matchesSearch && matchesPrice;
    });
  
    this.filteredProducts = [...filtered]; 
    this.applySorting();
    this.currentPage = 1;
  }
  

  applySorting() {
    this.filteredProducts.sort((a, b) => {
      return this.sortDirection === 'lowToHigh'
        ? a.price - b.price
        : b.price - a.price;
    });
  }

  onSortChange(event: any) {
    this.sortDirection = event.value;
    this.applySorting();
  }

  onCategoryChange(event: any) {
    this.selectedCategory = event.value;
    this.applyFilters();
  }
}
