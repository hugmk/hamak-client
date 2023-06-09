import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-product-alternatives',
  templateUrl: './product-alternatives.component.html',
  styleUrls: ['./product-alternatives.component.scss']
})
export class ProductAlternativesComponent {
  public product!: Product;
  public alternatives: Product[] = [];
  public hasAlternatives = false;
  public isLoading = false;

  constructor(private router: Router, private productsService: ProductsService,
    private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.product = history.state.product;
    this.getAlternatives();
  }

  getAlternatives() {
    if(this.product.calculatedScore < 50 && this.product.mainCategory) {
      this.spinnerService.showSpinner();
      this.isLoading = true;
      this.productsService.getAlternatives(this.product.mainCategory).subscribe(alternatives => {
        this.alternatives = alternatives;
        if(this.alternatives.length > 0) {
          this.hasAlternatives = true;
        }
        this.spinnerService.hideSpinner();
        this.isLoading = false;
      });
    }
  }

  onClickAlternative(alternative: Product) {
    this.router.navigateByUrl('/productMain', { state: { product: alternative } });
  }

  onBiAnalysis() {
    this.router.navigateByUrl('/productAnalysis', { state: { product: this.product } });
  }
}
