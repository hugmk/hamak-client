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
  public fatChart: any;
  public saturatedFatChart: any;
  public carbohydratesChart: any;
  public sugarsChart: any;
  public proteinsChart: any;
  public fibersChart: any;
  public saltChart: any;
  public sodiumChart: any;
  public scoreChart: any;
  public ecoScoreChart: any;
  
  public showingChart = "BestWorstChart";
  public availableCharts: string[] = [];

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
          this.getAvailableCharts();
          console.log(this.availableCharts);
          setTimeout(() => {
            this.createBestWorstChart();
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
            text: 'Comparaison du Score avec les meilleurs et les pires produits de la catégorie'
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
        },
        onClick: (event, activeElements) => {
          if (activeElements.length > 0) {
            const index = activeElements[0].index;
            const product = sortedProducts[index];
            if (product === this.product) {
              return;
            }
            this.onClickProduct(product);
          }
        },
        onHover: (event, activeElements) => {
          if (activeElements?.length > 0) {
            const index = activeElements[0].index;
            const product = sortedProducts[index];
            if (product === this.product) {
              (event.native!.target as any).style.cursor = 'auto';
            }
            else {
              (event.native!.target as any).style.cursor = 'pointer';
            }
          } else {
            (event.native!.target as any).style.cursor = 'auto';
          }
        },
      }
    });
  }

  createScoreChart(){
    const labels = ["Score"];
    this.scoreChart = new Chart("ScoreChart", {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: this.product.name,
            data: [
              Math.round(this.product.calculatedScore)
            ],
            backgroundColor: "#3982fb"
          },
          {
            label: "Moyennes des autres produits",
            data: [
              Math.round(this.averages.averageScore)
            ],
            backgroundColor: "rgba(240, 192, 110, 0.8)"
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
            text: 'Comparaison du Score avec la moyenne des produits de la catégorie'
          }
        },
        scales: {
          x: {
            display: false
          }
        }
      }
    });
  }

  createEcoScoreChart(){
    const labels = ["Éco-score"];
    this.ecoScoreChart = new Chart("EcoScoreChart", {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: this.product.name,
            data: [
              Math.round(this.product.ecoscoreScore)
            ],
            backgroundColor: "#3982fb"
          },
          {
            label: "Moyennes des autres produits",
            data: [
              Math.round(this.averages.averageEcoscore)
            ],
            backgroundColor: "rgba(240, 192, 110, 0.8)"
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
            text: 'Comparaison de l\'Éco-score avec la moyenne des produits de la catégorie'
          }
        },
        scales: {
          x: {
            display: false
          }
        }
      }
    });
  }

  createFatChart(){
    const labels = ["Matières grasses"];
    this.fatChart = new Chart("FatChart", {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: this.product.name,
            data: [
              this.product.fat_100g
            ],
            backgroundColor: "#3982fb"
          },
          {
            label: "Moyennes des autres produits",
            data: [
              Math.round(this.averages.averageFat * 100) / 100
            ],
            backgroundColor: "rgba(240, 192, 110, 0.8)"
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
            text: 'Comparaison de la teneur en Matières grasses avec la moyenne des produits de la catégorie (g/100g)'
          }
        },
        scales: {
          x: {
            display: false
          }
        }
      }
    });
  }

  createSaturatedFatChart(){
    const labels = ["Graisses saturées"];
    this.saturatedFatChart = new Chart("SaturatedFatChart", {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: this.product.name,
            data: [
              this.product.saturated_fat_100g
            ],
            backgroundColor: "#3982fb"
          },
          {
            label: "Moyennes des autres produits",
            data: [
              Math.round(this.averages.averageSaturatedFat * 100) / 100
            ],
            backgroundColor: "rgba(240, 192, 110, 0.8)"
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
            text: 'Comparaison de la teneur en Graisses saturées avec la moyenne des produits de la catégorie (g/100g)'
          }
        },
        scales: {
          x: {
            display: false
          }
        }
      }
    });
  }

  createCarbohydratesChart(){
    const labels = ["Glucides"];
    this.carbohydratesChart = new Chart("CarbohydratesChart", {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: this.product.name,
            data: [
              this.product.carbohydrates_100g
            ],
            backgroundColor: "#3982fb"
          },
          {
            label: "Moyennes des autres produits",
            data: [
              Math.round(this.averages.averageCarbohydrates * 100) / 100
            ],
            backgroundColor: "rgba(240, 192, 110, 0.8)"
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
            text: 'Comparaison de la teneur en Glucides avec la moyenne des produits de la catégorie (g/100g)'
          }
        },
        scales: {
          x: {
            display: false
          }
        }
      }
    });
  }

  createSugarsChart(){
    const labels = ["Sucres"];
    this.sugarsChart = new Chart("SugarsChart", {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: this.product.name,
            data: [
              this.product.sugars_100g
            ],
            backgroundColor: "#3982fb"
          },
          {
            label: "Moyennes des autres produits",
            data: [
              Math.round(this.averages.averageSugars * 100) / 100
            ],
            backgroundColor: "rgba(240, 192, 110, 0.8)"
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
            text: 'Comparaison de la teneur en Sucres avec la moyenne des produits de la catégorie (g/100g)'
          }
        },
        scales: {
          x: {
            display: false
          }
        }
      }
    });
  }

  createProteinsChart(){
    const labels = ["Protéines"];
    this.proteinsChart = new Chart("ProteinsChart", {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: this.product.name,
            data: [
              this.product.proteins_100g
            ],
            backgroundColor: "#3982fb"
          },
          {
            label: "Moyennes des autres produits",
            data: [
              Math.round(this.averages.averageProteins * 100) / 100
            ],
            backgroundColor: "rgba(240, 192, 110, 0.8)"
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
            text: 'Comparaison de la teneur en Protéines avec la moyenne des produits de la catégorie (g/100g)'
          }
        },
        scales: {
          x: {
            display: false
          }
        }
      }
    });
  }

  createFibersChart(){
    const labels = ["Fibres"];
    this.fibersChart = new Chart("FibersChart", {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: this.product.name,
            data: [
              this.product.fiber_100g
            ],
            backgroundColor: "#3982fb"
          },
          {
            label: "Moyennes des autres produits",
            data: [
              Math.round(this.averages.averageFiber * 100) / 100
            ],
            backgroundColor: "rgba(240, 192, 110, 0.8)"
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
            text: 'Comparaison de la teneur en Fibres avec la moyenne des produits de la catégorie (g/100g)'
          }
        },
        scales: {
          x: {
            display: false
          }
        }
      }
    });
  }

  createSaltChart(){
    const labels = ["Sel"];
    this.saltChart = new Chart("SaltChart", {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: this.product.name,
            data: [
              this.product.salt_100g
            ],
            backgroundColor: "#3982fb"
          },
          {
            label: "Moyennes des autres produits",
            data: [
              Math.round(this.averages.averageSalt * 100) / 100
            ],
            backgroundColor: "rgba(240, 192, 110, 0.8)"
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
            text: 'Comparaison de la teneur en Sel avec la moyenne des produits de la catégorie (g/100g)'
          }
        },
        scales: {
          x: {
            display: false
          }
        }
      }
    });
  }

  createSodiumChart(){
    const labels = ["Sodium"];
    this.sodiumChart = new Chart("SodiumChart", {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: this.product.name,
            data: [
              this.product.sodium_100g
            ],
            backgroundColor: "#3982fb"
          },
          {
            label: "Moyennes des autres produits",
            data: [
              Math.round(this.averages.averageSodium * 100) / 100
            ],
            backgroundColor: "rgba(240, 192, 110, 0.8)"
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
            text: 'Comparaison de la teneur en Sodium avec la moyenne des produits de la catégorie (g/100g)'
          }
        },
        scales: {
          x: {
            display: false
          }
        }
      }
    });
  }

  // createAveragesChart(){
  //   const labels = ["Matières grasses", "Graisses saturées", "Glucides", "Sucres", "Protéines", "Fibres", "Sel", "Sodium"];
  //   this.averagesChart = new Chart("AveragesChart", {
  //     type: "bar",
  //     data: {
  //       labels: labels,
  //       datasets: [
  //         {
  //           label: this.product.name,
  //           data: [
  //             this.product.fat_100g,
  //             this.product.saturated_fat_100g,
  //             this.product.carbohydrates_100g,
  //             this.product.sugars_100g,
  //             this.product.proteins_100g,
  //             this.product.fiber_100g,
  //             this.product.salt_100g,
  //             this.product.sodium_100g
  //           ],
  //           backgroundColor: "#3982fb"
  //         },
  //         {
  //           label: "Moyennes des autres produits",
  //           data: [
  //             Math.round(this.averages.averageFat * 100) / 100,
  //             Math.round(this.averages.averageSaturatedFat * 100) / 100,
  //             Math.round(this.averages.averageCarbohydrates * 100) / 100,
  //             Math.round(this.averages.averageSugars * 100) / 100,
  //             Math.round(this.averages.averageProteins * 100) / 100,
  //             Math.round(this.averages.averageFiber * 100) / 100,
  //             Math.round(this.averages.averageSalt * 100) / 100,
  //             Math.round(this.averages.averageSodium * 100) / 100
  //           ],
  //           backgroundColor: "rgba(240, 192, 110, 0.8)"
  //         }          
  //       ]
  //     },
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         title: {
  //           display: true,
  //           text: 'Comparaison des informations nutritionnelles (pour 100g) avec les moyennes des produits de la catégorie'
  //         }
  //       }
  //     }
  //   });
  // }

  onChooseChart(chartName: string) {
    if(this.availableCharts.includes(chartName)) {
      switch (chartName) {
        case "BestWorstChart":
          this.showingChart = "BestWorstChart";
          setTimeout(() => {
            this.createBestWorstChart();
          }, 0);
          break;
  
        case "ScoreChart":
          this.showingChart = "ScoreChart";
          setTimeout(() => {
            this.createScoreChart();
          }, 0);
          break;
  
        case "EcoScoreChart":
          this.showingChart = "EcoScoreChart";
          setTimeout(() => {
            this.createEcoScoreChart();
          }, 0);
          break;
  
        case "FatChart":
          this.showingChart = "FatChart";
          setTimeout(() => {
            this.createFatChart();
          }, 0);
          break;
  
        case "SaturatedFatChart":
          this.showingChart = "SaturatedFatChart";
          setTimeout(() => {
            this.createSaturatedFatChart();
          }, 0);
          break;
  
        case "CarbohydratesChart":
          this.showingChart = "CarbohydratesChart";
          setTimeout(() => {
            this.createCarbohydratesChart();
          }, 0);
          break;
      
        case "SugarsChart":
          this.showingChart = "SugarsChart";
          setTimeout(() => {
            this.createSugarsChart();
          }, 0);
          break;
  
        case "ProteinsChart":
          this.showingChart = "ProteinsChart";
          setTimeout(() => {
            this.createProteinsChart();
          }, 0);
          break;
  
        case "FibersChart":
          this.showingChart = "FibersChart";
          setTimeout(() => {
            this.createFibersChart();
          }, 0);
          break;
  
        case "SaltChart":
          this.showingChart = "SaltChart";
          setTimeout(() => {
            this.createSaltChart();
          }, 0);
          break;
  
        case "SodiumChart":
          this.showingChart = "SodiumChart";
          setTimeout(() => {
            this.createSodiumChart();
          }, 0);
          break;
  
        default:
          this.showingChart = "BestWorstChart";
          setTimeout(() => {
            this.createBestWorstChart();
          }, 0);
          break;
      }
    }    
  }

  getAvailableCharts() {
    this.availableCharts.push('BestWorstChart');

    if(this.product.calculatedScore || this.product.calculatedScore === 0) {
      this.availableCharts.push('ScoreChart');
    }
    if(this.product.ecoscoreScore || this.product.ecoscoreScore === 0) {
      this.availableCharts.push('EcoScoreChart');
    }
    if(this.product.fat_100g || this.product.fat_100g === 0) {
      this.availableCharts.push('FatChart');
    }
    if(this.product.saturated_fat_100g || this.product.saturated_fat_100g === 0) {
      this.availableCharts.push('SaturatedFatChart');
    }
    if(this.product.carbohydrates_100g || this.product.carbohydrates_100g === 0) {
      this.availableCharts.push('CarbohydratesChart');
    }
    if(this.product.sugars_100g || this.product.sugars_100g === 0) {
      this.availableCharts.push('SugarsChart');
    }
    if(this.product.proteins_100g || this.product.proteins_100g === 0) {
      this.availableCharts.push('ProteinsChart');
    }
    if(this.product.fiber_100g || this.product.fiber_100g === 0) {
      this.availableCharts.push('FibersChart');
    }
    if(this.product.salt_100g || this.product.salt_100g === 0) {
      this.availableCharts.push('SaltChart');
    }
    if(this.product.sodium_100g || this.product.sodium_100g === 0) {
      this.availableCharts.push('SodiumChart');
    }
  }

  onClickProduct(product: Product) {
    this.router.navigateByUrl('/productMain', { state: { product: product } });
  }

  onNutritionFacts() {
    this.router.navigateByUrl('/nutritionFacts', { state: { product: this.product } });
  }

  onAlternatives() {
    this.router.navigateByUrl('/productAlternatives', { state: { product: this.product } });
  }
}
