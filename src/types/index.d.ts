// Product type
 export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  brand: string;
  stock: number;
  thumbnail: string;
  images: string[];
}


// API response for products
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

