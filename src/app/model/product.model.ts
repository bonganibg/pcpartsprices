export interface Product
{
  id: string,
  categoryId: string,
  name: string,
  currentPrice: number,
  manufacturerId: string,
  storeId: string,
  imageUri: string,
  productUrl: string,
  productHistory: {
    date: string,
    price: number
  },
  categorySpecific: {}
}
