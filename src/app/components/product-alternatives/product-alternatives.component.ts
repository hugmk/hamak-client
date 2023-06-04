import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-alternatives',
  templateUrl: './product-alternatives.component.html',
  styleUrls: ['./product-alternatives.component.scss']
})
export class ProductAlternativesComponent {
  public product!: Product;
  public alternatives: Product[] = [];
  public hasAlternatives = false;

  constructor(private router: Router, private productsService: ProductsService) { }

  ngOnInit() {
    this.product = history.state.product;
    this.getAlternatives();
  }

  getAlternatives() {
    if(this.product.calculatedScore < 50 && this.product.mainCategory) {
      this.productsService.getAlternatives(this.product.mainCategory).subscribe(alternatives => {
        this.alternatives = alternatives;
        console.log(this.alternatives);
        this.hasAlternatives = true;
      });
    }
    else {
      console.log("no alternative");
    }
  }

  onClickAlternative(alternative: Product) {
    this.router.navigateByUrl('/productMain', { state: { product: alternative } });
  }

  onBiAnalysis() {
    this.router.navigateByUrl('/productAnalysis', { state: { product: this.product } });
  }
}
