"use client";
import { RootState, useAppDispatch } from "@/app/store/store";
import Link from "next/link";
import React, { useState } from "react";
import { IoCartSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function Navbar() {
  const totalItems = useSelector((state: RootState) => state.cart);
  return (
    <nav className="bg-slate-900 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          <Link href="/">Shopify</Link>
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link
              href="/api/signup"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              href="/api/login"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              href="/api/products"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              Products
            </Link>
          </li>
          <li className="">
            <Link
              href="/api/myproducts"
              className="text-white flex items-center gap-2 hover:text-gray-200 transition duration-300"
            >
              <IoCartSharp />
              {totalItems.length}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
