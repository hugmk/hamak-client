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

  constructor(private router: Router) { }

  ngOnInit() {
    this.product = history.state.product;
    console.log(this.product);
    this.createChart();
  }

  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Red', 'Pink','Green','Yellow','Orange','Blue', ],
	       datasets: [{
          label: 'My First Dataset',
          data: [300, 240, 100, 432, 253, 34],
          backgroundColor: [
            'red',
            'pink',
            'green',
            'yellow',
            'orange',
            'blue',			
          ],
          hoverOffset: 4
        }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            }
          }
        }
      });
  }

  onMainInfo() {
    this.router.navigateByUrl('/productMain', { state: { product: this.product } });
  }

  onBiAnalysis() {
    console.log("go to bi analysis");
    // this.router.navigateByUrl('/nutritionFacts', { state: { product: this.product } });
  }
}
