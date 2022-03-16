import { Injectable } from '@angular/core';
import { SearchQuery } from '../model/search.model';
import axios, { Axios } from 'axios';
import { Product } from '../model/product.model';
import { Manufacturer } from '../model/manufacturer.model';
import { PublicService } from '../public.service';
import { SliderPrice } from './slider-price.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  private products: Product[] = [];
  private manufacturers: Manufacturer[] = [];
  minMax: SliderPrice = {min: 10000, max: 0};


  // get the list of products based on the users search query
  async getProducts(query: SearchQuery)
  {
    // Send query to database
    let data = {
      Category: "cate_96e6fad1-792a-43f9-ae65-fbb8c8731cb6"
    };

    await axios({
      method: 'get',
      url: `${PublicService.baseProduction}/api/prods`,
      params: this.queryBuilder(query),
      headers: {'Content-Type': 'multipart/form-data'}
    })
    .then(async (response) => {

      let prods: Product[] = response.data.product;
      this.products = prods;

      await this.loadManufacturers();
    })
    .catch((error) => {
      console.log(error);
      this.products = [];
    });


    return [...this.products];
  }


  // Check which values the user has entered and add them to the final search quer
  private queryBuilder(query: SearchQuery)
  {
    let finalQuery: any = {};

    if (query.Category !== undefined)
        finalQuery["category"] = query.Category;

    if (query.Manufacturers !== undefined){
      finalQuery["manufacturers"] = query.Manufacturers;
    }

    if (query.Price !== undefined)
    {
      finalQuery["min"] = query.Price.min;
      finalQuery["max"] = query.Price.max
    }

    if (query.SearchTerm !== "")
      finalQuery["search"] = query.SearchTerm;


    if (query.PriceFilter !== undefined)
      finalQuery["order"] = query.PriceFilter;

    return finalQuery;

  }

  // Return the list of manufacturers who have a certain product in their list
  getManufacturers()
  {
    return this.manufacturers;
  }

  // Get minmax
  getMinMax()
  {
    return this.minMax;
  }



  // User fitering options
  private async loadManufacturers()
  {
    let manus: string[] = [];

    // get the manufacturer IDs that are stored in the product
    this.products.forEach(prod => {

      // Check if the min and max prices should change
      this.findLowestAndHighestPrice(prod.currentPrice);

      // Check if the ID has already been found
      if (!manus.includes(prod.manufacturerId)){
        manus.push(prod.manufacturerId);
      }
    });


    let data = {
      manufacturerIds: manus
    };

    // Get the manufacturer information from the database
    await axios({
      method: 'get',
      url: 'http://localhost:8080/api/manu',
      params: data,
      headers: {'Content-Type': 'multipart/form-data'}
    })
    .then((response) => {
      this.manufacturers = response.data.manufacturers;
    })
    .catch((error) => {
      console.log(error)
    });
  }

  private findLowestAndHighestPrice(price: number)
  {
    if (price > this.minMax.max)
      this.minMax.max = price;

    if (price < this.minMax.min)
      this.minMax.min = price;

  }
}
