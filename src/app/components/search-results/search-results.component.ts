import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

const LIMIT_PER_PAGE = 10;

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  public resultProducts: Product[] = [];
  public currentPage = 1;
  public totalPages = 0;
  public totalProducts = 0;
  public searchTerm = "";

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit() {
    console.log(history.state.searchTerm);
    this.searchTerm = history.state.searchTerm;
    this.productsService.searchProducts(this.searchTerm, 1, LIMIT_PER_PAGE).subscribe(res => {
      this.resultProducts = res.products;
      this.currentPage = res.currentPage;
      this.totalPages = res.totalPages;
      this.totalProducts = res.totalProducts;
    });
    
  }

  getPageRange(): number[] {
    const pageRange: number[] = [];
  
    if (this.totalPages <= 5) {
      for (let i = 1; i <= this.totalPages; i++) {
        pageRange.push(i);
      }
    } else {
      let startPage: number;
      let endPage: number;
  
      if (this.currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (this.currentPage >= this.totalPages - 2) {
        startPage = this.totalPages - 4;
        endPage = this.totalPages;
      } else {
        startPage = this.currentPage - 2;
        endPage = this.currentPage + 2;
      }
  
      for (let i = startPage; i <= endPage; i++) {
        pageRange.push(i);
      }
    }
  
    return pageRange;
  }  

  goToPage(pageNb: number): void {
    console.log("go to page number " + pageNb);
    this.productsService.searchProducts(this.searchTerm, pageNb, LIMIT_PER_PAGE).subscribe(res => {
      this.resultProducts = res.products;
      this.currentPage = res.currentPage;
      this.totalPages = res.totalPages;
      this.totalProducts = res.totalProducts;
    });
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  onClickProduct(product: Product) {
    this.router.navigateByUrl('/productMain', { state: { product: product } });
  }
}
