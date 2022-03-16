import { Injectable } from '@angular/core';
import axios from 'axios';
import { Category } from '../model/category.model';
import { PublicService } from '../public.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }



  categories: Category[] = [];

  getCategories()
  {
      return this.categories;
  }

  // Get a list of all of the categories
  async loadCategories()
  {
    await axios({
      method: 'get',
      url: `${PublicService.baseProduction}/api/categories`,
      headers: {'Content-Type': 'multipart/form-data'}
    })
    .then((response) => {
      this.categories = response.data.categories;
    })
    .catch((error) =>{
      console.log(error);
    });
  }
}
