"use client";
import ProductCard from "@/features/product/ProductCard";
import { useAppSelector } from "@/app/hooks";

export default function FavoritePage() {
  const favorites = useAppSelector((state) => state.products.favorites);

  if (favorites.length === 0)
    return <p className="p-4 text-center text-gray-500">You have no favorite products yet.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Favorite Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
