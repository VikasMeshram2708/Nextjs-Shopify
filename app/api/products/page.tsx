"use client";

import { useAppDispatch } from "@/app/store/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { add } from "@/app/store/cartSlice";

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function Products() {
  const dispatch = useAppDispatch();
  console.log(dispatch);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    getProducts();
  }, []);

  function handleAdd(product: IProduct) {
    dispatch(add(product));
    console.log(product);
  }

  function getCardData(productData: IProduct) {
    console.log("received-data", productData);
  }

  return (
    <div className="p-4 max-w-[80%] min-h-screen mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">
        {products.length > 1 ? "Product List" : "No Producsts to Show"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            onClick={() => getCardData(product)}
            key={product.id}
            className="bg-white p-4 shadow-md rounded-md transition cursor-pointer duration-300 hover:shadow-lg"
          >
            <Image
              width={500}
              height={500}
              layout="responsive"
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold mt-2 truncate">
              {product.title}
            </h2>
            <p className="text-gray-500">{product.category}</p>
            <p className="text-gray-700">${product.price}</p>
            <p className="text-gray-600 mt-2 truncate">{product.description}</p>
            <button
              type="button"
              className="bg-pink-500 font-semibold rounded-full px-4 py-2"
              onClick={() => handleAdd(product)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
