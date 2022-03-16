import { Component, OnInit } from '@angular/core';
import { CategoryImages } from '../model/category-image.model';
import { Category } from '../model/category.model';
import { PublicService } from '../public.service';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  loading = true;

  categories: CategoryImages[] = this.loadSkeletonCategories();

  async ngOnInit() {
    this.loading = true;
    await PublicService.getStores();
    await this.categoryService.loadCategories();
    this.categories = [];
    this.categoryService.getCategories().forEach((cat) =>{
      let category: CategoryImages = {
        ID: cat.id,
        Name: cat.name,
        Image: PublicService.getCategoryBanner(cat.id)
      }

      this.categories.push(category);
    });

    this.loading = false;

  }


  loadSkeletonCategories()
  {
    let catImage: CategoryImages[] = [];
    let cat: CategoryImages = {
      ID: "",
      Image: "",
      Name: ""
    };

    for (let i = 0; i < 8; i++){
      catImage.push(cat);
    }

    return catImage;
  }

}
