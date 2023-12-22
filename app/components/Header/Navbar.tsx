"use client";
import { RootState, useAppDispatch } from "@/app/store/store";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextRequest } from "next/server";
import React, { useEffect, useState } from "react";
import { IoCartSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function Navbar() {
  const router = useRouter();
  // const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleLogout = async () => {
    const response = await fetch("/api/logout");

    if (response.ok) {
      const result = await response.json();
      const { message } = result;
      Swal.fire({
        icon: "success",
        title: "Success",
        text: message,
      })
        .then((res) => res.isConfirmed)
        .then(() => router.push("/pages/login"));
    } else {
      const result = await response.json();
      const { message } = result;
      Swal.fire({
        icon: "error",
        title: "error",
        text: message,
      });
    }
  };

  useEffect(() => {
    const tokenExist = document.cookie;
    console.log(tokenExist);
  }, []);
  const totalItems = useSelector((state: RootState) => state.cart);
  return (
    <nav className="bg-slate-900 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          <Link href="/">Shopify</Link>
        </h1>
        <ul className="flex space-x-4 hidden">
          <li>
            <button
              onClick={handleLogout}
              type="button"
              className="text-white font-semibold bg-pink-500 rounded-md px-4 py-2"
            >
              Logout
            </button>
          </li>
          <>
            <li>
              <Link
                href="/pages/signup"
                className="text-white hover:text-gray-200 transition duration-300"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                href="/pages/login"
                className="text-white hover:text-gray-200 transition duration-300"
              >
                Login
              </Link>
            </li>
          </>

          <li>
            <Link
              href="/pages/products"
              className="text-white hover:text-gray-200 transition duration-300"
            >
              Products
            </Link>
          </li>
          <li className="">
            <Link
              href="/pages/cart"
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
