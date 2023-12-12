"use client";

import Loader from "@/app/components/Loader/Loader";
import { Iproducts } from "@/app/components/interfaces/interfaces";
import React, { useEffect, useState } from "react";

const SingleProduct = ({ params }: { params: { id: number } }) => {
  const [product, setProduct] = useState<Iproducts | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${params.id}`
        );
        const result = await response.json();
        console.log(result);
        setProduct(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <>
      {loading && <Loader />}
      {product && (
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src={product.image}
              className={`max-w-sm rounded-lg ${
                loading ? "skeleton" : ""
              } shadow-2xl`}
            />
            <div>
              <h1 className={`${loading ? "skeleton" : ""} text-5xl font-bold`}>
                {product.title}
              </h1>
              <p className={`py-6 ${loading ? "skeleton" : ""}`}>
                {product.description}
              </p>
              <button
                className={`btn btn-primary ${loading ? "skeleton" : ""}`}
              >
                Buy {product.price}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
