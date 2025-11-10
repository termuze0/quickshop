import axios from "axios";
import { Product, ProductsResponse } from "@/types";

// axios instance
const apiClient = axios.create({
  baseURL: "https://dummyjson.com", 
  headers: { "Content-Type": "application/json" },
});

// PRODUCTS 
export const fetchProducts = async (limit = 10, skip = 0): Promise<Product[]> => {
  const res = await apiClient.get<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`);
  return res.data.products;
};
export const getProductById = async (id: number) => {
  const res = await apiClient.get(`/products/${id}`);
  return res.data;
};
