"use client";
// Import the necessary modules
import axios from "axios";
import React, { useEffect, useState } from "react";

// Define the SingleProduct component
const SingleProduct = ({ params }: { params: { id: number } }) => {
  // Log the id from the URL params
  console.log(params.id);

  // Initialize state for the product
  const [product, setProduct] = useState<any>();

  // useEffect to fetch product details when the component mounts
  useEffect(() => {
    // Define the fetchProducts function
    const fetchProducts = async () => {
      try {
        // Make a GET request to the API endpoint with the specified product id
        const response = await axios.get(`https://fakestoreapi.com/products/${params.id}`);

        // Set the product state with the response data
        setProduct(response.data);
      } catch (error) {
        // Log any errors that occur during the fetch
        const errMsg = error as Error;
        console.log(errMsg.message);
      }
    };

    // Call the fetchProducts function
    fetchProducts();
  }, [params.id]); // Include params.id as a dependency to re-fetch when the id changes

  // Render the component
  return (
    <div className="container mx-auto p-8">
      {/* Display the product details */}
      <h1 className="text-3xl font-bold mb-4">Single Product Page</h1>
      <div className="max-w-xl mx-auto bg-white p-8 rounded-md shadow-md">
        {/* Check if product data is available before rendering */}
        {product && (
          <>
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <p className="text-lg text-gray-700 mb-2">Price: ${product.price}</p>
            <p className="text-lg text-gray-700 mb-2">Category: {product.category}</p>
            <img src={product.image} alt={product.title} className="w-full mb-4" />
            <p className="text-lg text-gray-700">{product.description}</p>
          </>
        )}
      </div>
    </div>
  );
};

// Export the component
export default SingleProduct;
