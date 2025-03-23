// types/types.ts
export interface Product {
  productId: string;
  name: string;
  image: string;
  description: string;
  price: string;
  whereToBuy: string;
  order: number;
}

export interface Section {
  id: string;
  name: string;
  order: number;
  products: Product[];
}

export interface LocationInfo { //Add this interface
    storeName: string;
    address: string;
    contact1Name: string;
    contact1Phone: string;
    contact2Name: string;
    contact2Phone: string;
}