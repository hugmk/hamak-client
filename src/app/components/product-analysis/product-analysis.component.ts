import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-analysis',
  templateUrl: './product-analysis.component.html',
  styleUrls: ['./product-analysis.component.scss']
})
export class ProductAnalysisComponent {
  public product!: Product;
  public showAlternativesBtn = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.product = history.state.product;
    if(this.product.calculatedScore && this.product.calculatedScore < 50) {
      this.showAlternativesBtn = true;
    }
  }

  onNutritionFacts() {
    this.router.navigateByUrl('/nutritionFacts', { state: { product: this.product } });
  }

  onAlternatives() {
    this.router.navigateByUrl('/productAlternatives', { state: { product: this.product } });
  }
}
