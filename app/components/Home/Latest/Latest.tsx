"use client";

import React, { useEffect, useState } from "react";
import { Iproducts } from "../../interfaces/interfaces";
import Loader from "../../Loader/Loader";
import Link from "next/link";

const Latest = () => {
  const [products, setProducts] = useState<Iproducts[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const result = await response.json();
      setProducts(result);
    };

    fetchProducts();
  }, []);

  return (
    <section className="m-5">
      <h1 className="text-center text-xl md:text-3xl mb-2 md:mb-5">
        Popular Nearby Searches
      </h1>
      {products?.length <= 0 ? (
        <Loader />
      ) : (
        <div className="container mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products?.map((product) => (
            <div
              key={product.id}
              className="card bg-[#1d232a] shadow-white rounded-lg shadow-md"
            >
              <figure>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </figure>
              <div className="card-body p-4">
                <Link
                  href={{
                    pathname: `/pages/products/${product.id}`,
                  }}
                >
                  <h2 className="card-title text-lg font-semibold mb-2">
                    {product.title}
                  </h2>
                </Link>
                <p className="text-gray-600 truncate">{product.description}</p>
                <div className="flex justify-between mt-4">
                  <button className="btn btn-outline btn-warning">
                    {product.price}
                  </button>
                  <div className="badge badge-outline">{product.category}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Latest;
