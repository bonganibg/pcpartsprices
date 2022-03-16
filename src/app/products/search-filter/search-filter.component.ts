import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { GraphicsCard } from 'src/app/model/cateogory-specific/graphics.model';
import { FilterSection } from 'src/app/model/filter.model';
import { Manufacturer } from 'src/app/model/manufacturer.model';
import { SearchQuery } from 'src/app/model/search.model';
import { SliderPrice } from '../slider-price.model';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent {
  constructor() { }

  something: string = "sinetgug";
  @Input() searchQuery!: SearchQuery;
  @Input() manufacturers!: Manufacturer[];
  @Input() minMax!: SliderPrice;
  @Input() filterOptions!: FilterSection[];
  @Output() selectedEvent = new EventEmitter<SearchQuery>()


  // Min and Max values so min can not be greater than max
  @Input() maxForMin!: number; // based on the position of the max value slider
  @Input() minForMax!: number; // based on the position of the min value slider





  additionalInfo()
  {
    let additional: any = {};
    this.filterOptions.forEach(option => {
      additional[`${option.Heading}`] = "";
    });


  }



  formatLabel(value: number){
    if (value >= 1000)
    return Math.round(value/1000) + 'k';

    return value;
  }

  showSelection(list: MatListOption[])
  {
    let selectedManu: string[] = [];
    list.forEach(item => {
      selectedManu.push(item.value.id);
    });

    this.searchQuery.Manufacturers = selectedManu;
    this.sendSearchQuery();
  }


  // Price Changes
  // Min price changed
  minPriceChange(price: number)
  {
      this.searchQuery.Price.min = price;
      this.minForMax = this.searchQuery.Price.min + 150;
      this.sendSearchQuery();
  }
  // max price changed
  maxPriceChange(price: number)
  {
    this.searchQuery.Price.max = price;
    this.maxForMin = this.searchQuery.Price.max - 150;
    this.sendSearchQuery();
  }


  sendSearchQuery()
  {
    this.selectedEvent.emit(this.searchQuery);
  }
}
