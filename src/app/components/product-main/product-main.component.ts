import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { InfoModalService } from 'src/app/services/infoModal.service';

@Component({
  selector: 'app-product-main',
  templateUrl: './product-main.component.html',
  styleUrls: ['./product-main.component.scss']
})
export class ProductMainComponent {
  public product!: Product;
  public nutriscoreUnknown = "nutriscore-unknown";
  public nutriscorePath = "../../../assets/nutriscores/nutriscoreUnknown.svg";
  public ecoscorePath = "../../../assets/ecoscores/Eco-score - Neutre.svg";
  public modalInfo = {};

  constructor(private router: Router, public infoModalService: InfoModalService) { }

  ngOnInit() {
    this.product = history.state.product;
    console.log(this.product);
    this.defineNutriscorePath(this.product.nutriscoreGrade);
    this.defineEcoscorePath(this.product.ecoscoreGrade);
  }

  defineNutriscorePath(nutriscoreGrade: string) {
    switch (nutriscoreGrade) {
      case 'a':
        this.nutriscorePath = "../../../assets/nutriscores/nutriscoreA.svg";
        this.nutriscoreUnknown = "";
        break;
      case 'b':
        this.nutriscorePath = "../../../assets/nutriscores/nutriscoreB.svg";
        this.nutriscoreUnknown = "";
        break;
      case 'c':
        this.nutriscorePath = "../../../assets/nutriscores/nutriscoreC.svg";
        this.nutriscoreUnknown = "";
        break;
      case 'd':
        this.nutriscorePath = "../../../assets/nutriscores/nutriscoreD.svg";
        this.nutriscoreUnknown = "";
        break;
      case 'e':
        this.nutriscorePath = "../../../assets/nutriscores/nutriscoreE.svg";
        this.nutriscoreUnknown = "";
        break;
      default:
        break;
    }
  }

  defineEcoscorePath(ecoscoreGrade: string) {
    switch (ecoscoreGrade) {
      case 'a':
        this.ecoscorePath = "../../../assets/ecoscores/Eco-score A.svg";
        break;
      case 'b':
        this.ecoscorePath = "../../../assets/ecoscores/Eco-score B.svg";
        break;
      case 'c':
        this.ecoscorePath = "../../../assets/ecoscores/Eco-score C.svg";
        break;
      case 'd':
        this.ecoscorePath = "../../../assets/ecoscores/Eco-score D.svg";
        break;
      case 'e':
        this.ecoscorePath = "../../../assets/ecoscores/Eco-score E.svg";
        break;
      default:
        break;
    }
  }

  onMoreInfo(infoName: string, values: string[]) {
    this.modalInfo = {
      infoName,
      values
    };
    this.infoModalService.openModal();
  }

  onNutrientInfo() {
    this.router.navigateByUrl('/nutritionFacts', { state: { product: this.product } });
  }
}
