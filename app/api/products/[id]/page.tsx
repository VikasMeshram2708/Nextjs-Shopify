"use client";
import { useRouter } from "next/navigation";
import React from "react";

const singleProduct = ({ params }: { params: { slug: number } }) => {
    console.log(params)
    // console.log(params.slug)
//   const router = useRouter();
//   console.log("product", router);
  return (
    <div>
      <h1>Single Product Page</h1>
    </div>
  );
};

export default singleProduct;
