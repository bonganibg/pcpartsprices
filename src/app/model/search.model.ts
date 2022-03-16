export interface SearchQuery
{
  SearchTerm: string,
  Category: string, // Category ID
  Price: {min: number, max: number},
  Manufacturers: string[], // Manufacturer ID
  PriceFilter: number
}
