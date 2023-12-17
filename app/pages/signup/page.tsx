"use client";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios?.post("/api/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = response?.data;
      // console.log(result);
    } catch (error) {
      const errorMessge = error as Error;
      console.log(errorMessge?.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="max-w-md mx-auto mt-24">
      <div className="bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 text-black py-2 border rounded-md focus:ring focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 text-black border rounded-md focus:ring focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-black rounded-md focus:ring focus:ring-blue-400 focus:outline-none"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-8 cursor-pointer"
            >
              {showPassword ? (
                <IoEyeSharp color={"black"} />
              ) : (
                <FaEyeSlash color={"black"} />
              )}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
