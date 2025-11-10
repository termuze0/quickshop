"use client";
import { useEffect } from "react";
import { fetchProductsThunk, setSearchTerm } from "./ProductSlice";
import ProductCard from "./ProductCard";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Product } from "@/types";
export default function ProductList() {
  const dispatch = useAppDispatch();
  const { items, search, loading, hasMore, skip } = useAppSelector(
    (state) => state.products
  );

  // Initial fetch
  useEffect(() => {
    if (items.length === 0) dispatch(fetchProductsThunk({ skip }));
  }, [dispatch, items.length, skip]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 300 &&
        !loading &&
        hasMore
      ) {
        dispatch(fetchProductsThunk({ skip }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, loading, skip, hasMore]);

  
  const filteredItems: Product[] = items.filter((product: Product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Search Input */}
      <Input
        placeholder="Search products..."
        value={search}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        className="mb-4 w-full max-w-md"
      />

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {!loading && filteredItems.length === 0 && (
        <p className="text-center mt-4">No products found.</p>
      )}
    </div>
  );
}
