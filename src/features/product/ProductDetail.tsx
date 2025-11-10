"use client";

import Image from "next/image";
import { Product } from "@/types";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div className="flex flex-col gap-2">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={400}
          height={400}
          className="rounded-lg object-cover"
        />
        {product.images?.length > 1 && (
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {product.images.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={`Image ${i + 1}`}
                width={80}
                height={80}
                className="rounded-md cursor-pointer border hover:border-gray-400"
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>

        <p className="text-xl font-semibold text-green-600 mb-2">${product.price}</p>
        <p className="text-sm text-gray-700 mb-2">Brand: {product.brand}</p>
        <p className="text-sm text-gray-700 mb-2">Category: {product.category}</p>
        <p className="text-sm text-gray-700 mb-2">Stock: {product.stock}</p>
        <p className="text-sm text-yellow-600 font-medium">
          ⭐ Rating: {product.rating}
        </p>
      </div>
    </div>
  );
}
