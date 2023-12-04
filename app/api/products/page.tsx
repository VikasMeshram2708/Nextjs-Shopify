"use client";

import { RootState, useAppDispatch } from "@/app/store/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { add } from "@/app/store/cartSlice";
import { useSelector } from "react-redux";
import { STATUSES, fetchProducts } from "@/app/store/productsSlice";

// single product page
import Link from "next/link";

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

  const { data: products, status }: { data: IProduct[]; status: string } =
    useSelector((state: RootState) => state.product);

  // const [products, setProducts] = useState<IProduct[]>(data);

  useEffect(() => {
    dispatch(fetchProducts());
    // async function getProducts() {
    //   try {
    //     const response = await fetch("https://fakestoreapi.com/products");
    //     if (response.ok) {
    //       const data = await response.json();
    //       setProducts(data);
    //     } else {
    //       console.error("Failed to fetch products.");
    //     }
    //   } catch (error) {
    //     console.error("Error fetching products:", error);
    //   }
    // }

    // getProducts();
  }, []);

  function handleAdd(product: IProduct) {
    dispatch(add(product));
    console.log(product);
  }

  if (status === STATUSES.LOADING) {
    return <h1 className="text-center">Loading...</h1>;
  }

  if (status === STATUSES.ERROR) {
    return <h1 className="text-center">Something Went Wrong...</h1>;
  }

  // function getCardData(productData: IProduct) {
  //   console.log("received-data", productData);
  // }

  return (
    <div className="p-4 max-w-[80%] min-h-screen mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">
        {products.length > 1 ? "Product List" : "No Producsts to Show"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            // onClick={() => getCardData(product)}
            key={product.id}
            className="bg-white p-4 b shadow-mdrounded-md transition cursor-pointer duration-300 hover:shadow-lg"
          >
            <Link href={`/api/products/${product.id}`}>
              <Image
                width={500}
                height={500}
                layout="responsive"
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md"
              />
            </Link>
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
            {/* <ProductDetails title={product.title} /> */}
          </div>
        ))}
      </div>
    </div>
  );
}
