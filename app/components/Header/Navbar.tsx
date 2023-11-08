import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Shopify</h1>
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
        </ul>
      </div>
    </nav>
  );
}
