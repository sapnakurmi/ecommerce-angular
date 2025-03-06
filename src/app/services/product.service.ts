import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';
  

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
  
  addProduct(productData: any): Observable<any> {
    return this.http.post('https://api.escuelajs.co/api/v1/products/', productData);
  }
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`https://api.escuelajs.co/api/v1/products/${productId}`);
  }
  
}
  