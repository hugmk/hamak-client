import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getTopProducts(): Observable<Product[]> {
    const url = "http://localhost:3000/api/products/topProducts";
    return this.http.get<Product[]>(url);
  }
}
