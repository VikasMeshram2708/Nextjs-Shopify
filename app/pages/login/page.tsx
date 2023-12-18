"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { FaEyeSlash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
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
    if (!formData?.email) {
      return Swal.fire({
        title: "error",
        text: "Email is required",
        icon: "error",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      return Swal.fire({
        title: "error",
        text: "Invalid email format",
        icon: "error",
      });
    }

    if (formData?.password?.length < 5) {
      return Swal.fire({
        title: "error",
        text: "Passwords must be at least 5 characters",
        icon: "error",
      });
    }

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response?.ok) {
      const result = await response?.json();
      console.log("rest", result);
      const { message } = result;
      Swal.fire({
        icon: "success",
        title: "Success",
        text: message,
      })
        .then(() => {
          setFormData({
            email: "",
            password: "",
          });
        })
        .then(() => {
          router.push("/pages/products");
        });
    } else {
      const errorMessage = await response.json();
      console.log("err", errorMessage);
      const { message } = errorMessage;
      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
      });
      return setFormData({
        email: "",
        password: "",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="max-w-md mx-auto p-6 shadow-white shadow-lg bg-white rounded-md mt-24">
      <h2 className="text-2xl font-bold text-center mb-4 text-black">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border text-black rounded-md focus:ring focus:ring-blue-400"
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
          className="w-full bg-blue-500 text-white p-2 mt-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Page;
