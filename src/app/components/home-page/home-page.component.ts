import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  public searchMessage = "Recherchez parmi des centaines de milliers de produits !";
  public topProductsTitle = "Le top du top";
  public topProducts: Product[] = [];

  constructor(private productService: ProductsService, private router: Router) { }

  ngOnInit() {
    this.productService.getTopProducts().subscribe(products => {
      this.topProducts = products;
      console.log(this.topProducts);
    })
  }

  onClickProduct(product: Product) {
    this.router.navigateByUrl('/productMain', { state: { product: product } });
  }
}
