import { Component, ComponentFactoryResolver, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterSection } from '../model/filter.model';
import { Manufacturer } from '../model/manufacturer.model';
import { Product } from '../model/product.model';
import { SearchQuery } from '../model/search.model';
import { PublicService } from '../public.service';
import { CategoryInformationService } from './category-information.service';
import { ProductService } from './product.service';
import { SliderPrice } from './slider-price.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService, private categoryService: CategoryInformationService, private route: ActivatedRoute) { }

  products: Product[] = this.placeHolderProducts();
  manufacturers!: Manufacturer[];
  sideFilter = false;
  filterOptions!: FilterSection[];
  // Minimum and Maximum Price
  minMax!: SliderPrice;

  loading = true;

  p: number = 1;

  bannerImage!: string;
  categoryName!: string;

  maxForMin!: number;
  minForMax!: number;

  // Base search; Based on the category, other values will change as the user changes them
  search: SearchQuery = {
    Category: "",
    Manufacturers: [],
    Price: {min: 0, max: 10000},
    SearchTerm: "",
    PriceFilter: 1
  }

  page = 1;
  async ngOnInit()  {

    PublicService.getStores();

    let category = "";
    this.route.queryParams.subscribe(cat => {
      if (cat["cat"])
        category = cat["cat"];
    });

    this.search.Category = category;

    this.bannerImage = PublicService.getCategoryBanner(category);
    this.categoryName = PublicService.getCategoryName(category);

    await this.filterSearch();
    this.manufacturers = this.productService.getManufacturers();
    this.minMax = this.productService.getMinMax();

    // Setting up min and Max
    this.search.Price.min = this.minMax.min;
    this.search.Price.max = this.minMax.max;

    this.maxForMin = this.minMax.max - 250;
    this.minForMax = this.minMax.min + 250;

    //Find the category and get the search filter information
    this.filterOptions = this.categoryService.getCooler();

    console.log(this.manufacturers);
  }


  private async filterSearch()
  {
    this.loading = true;
    this.products = await this.productService.getProducts(this.search);
    this.p = 1; // Go to the first page when the user completes the search
    this.loading = false;
  }

  // Button clicked
  searchButtonClicked()
  {
    if (this.sideFilter)
      this.sideFilter = false
    else
      this.sideFilter = true;
  }



// Search Filtering Options --------------------------------------------------------------------------

  // Get selection information
  retreiveSearchQuery($event: any){
    this.search = $event;
    this.filterSearch();
  }

  onTextChange($event: any)
  {
    this.search.SearchTerm = $event.target.value.toString();
    this.filterSearch();
  }


  // Change the search icon between ascending and descending
  changeSorting()
  {
    if (this.search.PriceFilter == 1)
      this.search.PriceFilter = -1;
    else
    this.search.PriceFilter = 1;

    this.filterSearch();
  }



// DISPLAY FUNCTIONS -------------------------------------------------------------------------------

  // Adds some place holders when waiting for a search to load so the screen is not empty
  placeHolderProducts()
  {
    let products: Product[] = [];
    let prod: Product = {
      categoryId: "",
      categorySpecific: {},
      currentPrice: 0,
      id: "",
      imageUri: "",
      manufacturerId: "",
      name: "",
      productHistory: {date: "", price: 0},
      productUrl: "",
      storeId: ""
    }

    for(let i = 0; i < 8; i++)
    {
      products.push(prod);
    }

    return products;
  }


    // Change the store ID to a store name
    changeToStoreName(storeID: string)
    {

      let storeName = "";
      PublicService.store.forEach((store) => {
        if (store.id == storeID)
          storeName =  store.name;
      });

      return storeName;
    }


    // Format the price of the products
    formatPrice(price: any)
    {
      return PublicService.currencyFormat.format(price);
    }
}
