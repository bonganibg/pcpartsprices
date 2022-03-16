import { Injectable } from '@angular/core';
import axios from 'axios';
import { Store } from './model/store.model';


@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor() { }

  static currencyFormat = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  });

  static baseLocal = "http://localhost:8080";

  static baseProduction = "https://pc-parts-prices-api.herokuapp.com";

  static store: Store[] = [];

  private static categoryImages = [
    {
      categoryID: "cate_96e6fad1-792a-43f9-ae65-fbb8c8731cb6",
      imageUrl: "https://images.unsplash.com/photo-1591489237701-57358ac6d20d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      Name: "Graphics Cards"
    },
    {
      categoryID: "cate_d7f7fbd6-a812-45cf-b19e-c28396ba799c",
      imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      Name: "Processors"
    },
    {
      categoryID: "cate_532a407f-53a1-45da-8f48-0cd5b8d82ed9",
      imageUrl: "https://images.unsplash.com/photo-1592664474505-51c549ad15c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      Name: "Memory"
    },
    {
      categoryID: "cate_857412a6-6ad5-4238-9505-5db8d320066d",
      imageUrl: "https://images.unsplash.com/photo-1597138804456-e7dca7f59d54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      Name: "Solid State Drives"
    },
    {
      categoryID: "cate_f4825934-e122-4ec3-aa10-78d7dd7ddce6",
      imageUrl: "https://images.unsplash.com/photo-1609581771681-9a920ff90f26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
      Name: "MOtherboards"
    },
    {
      categoryID: "cate_8c5d001f-81d6-4a18-a97a-f36df4738853",
      imageUrl: "https://images.unsplash.com/photo-1613483187636-c2024013d54a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      Name: "Cooler"
    },
    {
      categoryID: "cate_2e5e17e6-25d8-4471-bf0f-f03e4e055645",
      imageUrl: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      Name: "Hard Drivess"
    },
    {
      categoryID: "cate_eb82602f-7802-4193-adc9-bc9d29037523",
      imageUrl: "https://images.unsplash.com/photo-1618339220157-daa2cd9ade56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
      Name: "Cases"
    },
    {
      categoryID: "cate_6f322469-0d50-4400-8bc5-82f4eb9bd95c",
      imageUrl: "https://images.unsplash.com/photo-1588382472578-8d8b337b277a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      Name: "Power Supplies"
    },
    {
      categoryID: "cate_cf76b97b-bb9f-4a88-9b82-3238cbc50258",
      imageUrl: "https://images.unsplash.com/photo-1578091879915-33ee869e2cd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1002&q=80",
      Name: "Monitors"
    },
    {
      categoryID: "cate_e963e152-9ab6-4011-9475-1708a460715a",
      imageUrl: "https://images.unsplash.com/photo-1606414760098-8b52dce26f2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      Name: "Case Fans"
    }
  ]

  // Get the list of stores
  static async getStores()
  {
    await axios({
      method: 'get',
      url: `${this.baseProduction}/api/stores`,
      headers: {'Content-Type': 'multipart/form-data'}
    })
    .then((response) => {
      this.store = response.data.stores;

      console.log(this.store);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  static getCategoryBanner(catID : string)
  {
    let image = "";
    this.categoryImages.forEach(cat =>{
      if (cat.categoryID == catID)
      {
        image = cat.imageUrl;
      }
    });

    return image;
  }

  static getCategoryName(catID : string)
  {
    let name = "";
    this.categoryImages.forEach(cat =>{
      if (cat.categoryID == catID)
      {
        name = cat.Name;
      }
    });

    return name;
  }

  static changeCurrency(price: any)
  {
    return this.currencyFormat.format(price);
  }



}
