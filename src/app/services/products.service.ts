import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { SearchResult } from '../models/search-result.model';
import { BIAnalysis } from '../models/bi-analysis';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getTopProducts(): Observable<Product[]> {
    const url = "http://localhost:3000/api/products/topProducts";
    return this.http.get<Product[]>(url);
  }

  getAlternatives(category: string): Observable<Product[]> {
    const url = "http://localhost:3000/api/products/alternatives/" + category;
    return this.http.get<Product[]>(url);
  }

  searchProducts(searchTerm: string, pageNum: number, limit: number, sort: string | undefined): Observable<SearchResult> {
    let url = "http://localhost:3000/api/products/search?q=" + searchTerm + "&page=" + pageNum + "&limit=" + limit + '&sort=' + sort;
    return this.http.get<SearchResult>(url);
  }

  getBIAnalysis(category: string): Observable<BIAnalysis> {
    const url = "http://localhost:3000/api/products/biAnalysis/" + category;
    return this.http.get<BIAnalysis>(url);
  }
}
