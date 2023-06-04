import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-product-nutrition-facts',
  templateUrl: './product-nutrition-facts.component.html',
  styleUrls: ['./product-nutrition-facts.component.scss']
})
export class ProductNutritionFactsComponent {
  public product!: Product;
  public chart: any;
  private pieChartFields = ["Matières grasses", "Glucides", "Fibres", "Protéines", "Sel"];

  constructor(private router: Router) { }

  ngOnInit() {
    this.product = history.state.product;
    console.log(this.product);
    this.createChart();    
  }

  createChart(){
    this.chart = new Chart("MyChart", {
      type: 'pie',
      data: {
        labels: this.pieChartFields,
        datasets: [
          {
            data: [this.product.fat_100g, this.product.carbohydrates_100g, this.product.fiber_100g, this.product.proteins_100g, this.product.salt_100g],
          }
        ]
      },
    });
  }

  onMainInfo() {
    this.router.navigateByUrl('/productMain', { state: { product: this.product } });
  }

  onBiAnalysis() {
    this.router.navigateByUrl('/productAnalysis', { state: { product: this.product } });
  }
}
