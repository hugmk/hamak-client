import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Averages } from 'src/app/models/averages.model';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-product-analysis',
  templateUrl: './product-analysis.component.html',
  styleUrls: ['./product-analysis.component.scss']
})
export class ProductAnalysisComponent {
  public product!: Product;
  public showAlternativesBtn = false;
  public hasAnalysis = false;
  public isLoading = false;
  public bestProducts: Product[] = [];
  public worstProducts: Product[] = [];
  public averages!: Averages;
  public bestWorstComparisonChart: any;
  public averagesChart: any;

  constructor(private router: Router, private productsService: ProductsService,
    private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.product = history.state.product;
    if(this.product.calculatedScore && this.product.calculatedScore < 50) {
      this.showAlternativesBtn = true;
    }
    if(this.product.mainCategory) {
      this.spinnerService.showSpinner();
      this.isLoading = true;
      this.productsService.getBIAnalysis(this.product.mainCategory).subscribe(res => {
        this.bestProducts = res.bestProducts;
        this.worstProducts = res.worstProducts;
        this.averages = res.averages;
        if(this.bestProducts.length > 0 && this.worstProducts.length > 0 && this.averages) {
          this.hasAnalysis = true;
          setTimeout(() => {
            this.createBestWorstChart();
            this.createAveragesChart();
          }, 0);
        }
        this.spinnerService.hideSpinner();
        this.isLoading = false;
      });
    }
  }

  createBestWorstChart(){
    const sortedProducts = this.bestProducts.concat(this.worstProducts);
  
    // Supprimer le produit actuel des tableaux worstProducts et bestProducts si il est présent dedans
    const productIndex = sortedProducts.findIndex(product => product._id === this.product._id);
    if (productIndex !== -1) {
      sortedProducts.splice(productIndex, 1);
    }
  
    sortedProducts.push(this.product);
    
    sortedProducts.sort((a, b) => a.calculatedScore - b.calculatedScore);

    const scores = sortedProducts.map(product => Math.round(product.calculatedScore));
    const labels = sortedProducts.map(product => product.name + ' - ' + product.brand);

    this.bestWorstComparisonChart = new Chart("BestWorstChart", {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Score",
            data: scores,
            backgroundColor: (context) => {
              const index = context.dataIndex;
              const product = sortedProducts[index];
            
              if (product === this.product) {
                return '#3982fb';
              } else if (this.worstProducts.includes(product)) {
                return 'rgba(255, 0, 0, 0.5)';
              } else {
                return 'rgba(0, 255, 25, 0.5)';
              }
            }
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          
          title: {
            display: true,
            text: 'Comparaison du score avec les meilleurs et les pires produits de la catégorie : ' + this.product.mainCategory
          }
        },
        scales: {
          x: {
            display: false
          },
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }

  createAveragesChart(){
    const labels = ["Matières grasses", "Graisses saturées", "Glucides", "Sucres", "Protéines", "Fibres", "Sel", "Sodium"];
    this.averagesChart = new Chart("AveragesChart", {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: this.product.name,
            data: [
              this.product.fat_100g,
              this.product.saturated_fat_100g,
              this.product.carbohydrates_100g,
              this.product.sugars_100g,
              this.product.proteins_100g,
              this.product.fiber_100g,
              this.product.salt_100g,
              this.product.sodium_100g
            ],
            backgroundColor: "#3982fb"
          },
          {
            label: "Moyennes des autres produits",
            data: [
              Math.round(this.averages.averageFat * 100) / 100,
              Math.round(this.averages.averageSaturatedFat * 100) / 100,
              Math.round(this.averages.averageCarbohydrates * 100) / 100,
              Math.round(this.averages.averageSugars * 100) / 100,
              Math.round(this.averages.averageProteins * 100) / 100,
              Math.round(this.averages.averageFiber * 100) / 100,
              Math.round(this.averages.averageSalt * 100) / 100,
              Math.round(this.averages.averageSodium * 100) / 100
            ],
            backgroundColor: "rgba(240, 192, 110, 0.8)"
          }          
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Comparaison des informations nutritionnelles (pour 100g) avec les moyennes des produits de la catégorie : ' + this.product.mainCategory
          }
        }
      }
    });
  }

  onNutritionFacts() {
    this.router.navigateByUrl('/nutritionFacts', { state: { product: this.product } });
  }

  onAlternatives() {
    this.router.navigateByUrl('/productAlternatives', { state: { product: this.product } });
  }
}
