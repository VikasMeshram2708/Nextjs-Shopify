"use client";

import { remove } from "@/app/store/cartSlice";
import { RootState } from "@/app/store/store";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const dispatch = useDispatch();

  const products = useSelector((state: RootState) => state.cart);

  function handleRemove(productId: number) {
    dispatch(remove(productId));
    console.log("Your Product Was Successfully Removed...");
  }

  return (
    <section className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4 text-center">
        {products.length < 1 ? (
          <Link href="/pages/products">No Products were added</Link>
        ) : (
          "Shopping Cart"
        )}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
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
              onClick={() => handleRemove(product.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default page;
