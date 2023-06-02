import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductMainComponent } from './components/product-main/product-main.component';
import { ProductNutritionFactsComponent } from './components/product-nutrition-facts/product-nutrition-facts.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'searchResults', component: SearchResultsComponent },
  { path: 'productMain', component: ProductMainComponent },
  { path: 'nutritionFacts', component: ProductNutritionFactsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
