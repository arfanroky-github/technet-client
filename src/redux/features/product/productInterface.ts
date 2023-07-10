interface Product {
  _id: string;
  model: string;
  image: string;
  status: boolean;
  keyFeature: string[];
  price: number;
  quantity: number,
  rating: number;
  spec: {
    processor: string;
    motherboard: string;
    ram: string;
    graphics: string;
    storage: string;
    casing: string;
    psu: string;
    cooler: string;
  }[];
}

export default Product;
