export interface Irating {
  rate: number;
  count: number;
}

export interface Iproducts {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: Irating[];
}
