"use client";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "./ProductSlice";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.products.favorites);
  const isFav = favorites.some((p: Product) => p.id === product.id);

  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="font-bold mt-2">{product.title}</h2>
      <p className="text-sm text-gray-600">{product.category}</p>
      <p className="text-green-600 font-semibold">${product.price}</p>
      <p className="text-yellow-500">⭐ {product.rating}</p>
      <Button className="mt-2" onClick={() => dispatch(toggleFavorite(product))}>
        {isFav ? "Remove Favorite" : "Add to Favorite"}
      </Button>
    </div>
  );
}
