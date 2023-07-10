
export type ProductCart = {
  id: string;
  image: string;
  model: string;
  price: number;
  quantity: number;
}

export interface CartType {
  products: ProductCart[];
  total: number;
}
