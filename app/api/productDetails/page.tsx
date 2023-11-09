import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <section className="max-w-[80%] mx-auto min-h-screen">
        <Image
          width={10}
          height={10}
          layout="responsive"
          src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
          alt=""
          className="w-full object-cover rounded-md"
        />
      <h2 className="text-lg font-semibold mt-2 truncate">Title</h2>
      <p className="text-white font-semibold text-lg">Category</p>
      <p className="text-white font-semibold text-lg">$123</p>
      <p className="text-white font-semibold text-lg mt-2 truncate">
        Description
      </p>
    </section>
  );
}
