import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule,  } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SearchFilterComponent } from './products/search-filter/search-filter.component'
import {MatSliderModule} from '@angular/material/slider';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgxPaginationModule } from 'ngx-pagination';
import { SelectionLoaderModule } from './components/selection-loader/selection-loader.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    ProductsComponent,
    SearchFilterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatListModule,
    MatExpansionModule,
    NgxPaginationModule,
    SelectionLoaderModule

  ],
  providers: [
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'ZAR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
