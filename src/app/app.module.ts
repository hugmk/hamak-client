import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageHeaderComponent } from './components/home-page-header/home-page-header.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductMainComponent } from './components/product-main/product-main.component';
import { InfoModalComponent } from './components/info-modal/info-modal.component';
import { ProductNutritionFactsComponent } from './components/product-nutrition-facts/product-nutrition-facts.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ProductAnalysisComponent } from './components/product-analysis/product-analysis.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageHeaderComponent,
    SearchResultsComponent,
    HomePageComponent,
    ProductMainComponent,
    InfoModalComponent,
    ProductNutritionFactsComponent,
    ProductAnalysisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
