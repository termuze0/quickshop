// Product type
export interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
}

// API response for products
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

