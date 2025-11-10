"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsThunk, setSearchTerm } from "./ProductSlice";
import ProductCard from "./ProductCard";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

export default function ProductList() {
  const dispatch = useAppDispatch();
  const { items, search, loading, hasMore, skip } = useSelector((state: any) => state.products);

  useEffect(() => {
    if (items.length === 0) dispatch(fetchProductsThunk({ skip }));
  }, [dispatch]);

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

  const filteredItems = items.filter((p: any) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <Input
        placeholder="Search products..."
        value={search}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        className="mb-4 w-full max-w-md"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {loading && <p className="text-center mt-4">Loading...</p>}
    </div>
  );
}
