"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AddProductForm() {
  interface FormData {
    productName: string;
    stockQuantity: number;
  }

  const [formData, setFormData] = useState<FormData>({
    productName: "",
    stockQuantity: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "stockQuantity" ? parseInt(value, 10) || 0 : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  useEffect(() => {
    const addProduct = async () => {
      try {
        const requestBody = {
          name: formData.productName,
          quantity: formData.stockQuantity,
          sales: 0,
          afterSalesQuantity: formData.stockQuantity,
        };

        await fetch("/api/post_product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }).then(() => {
          toast.success("Product added successfully!");
          console.log("product added successfully!");
        });

        // Reset form
        setFormData({
          productName: "",
          stockQuantity: 0,
        });
      } catch (error) {
        console.error("An error occurred:", error);
        toast.error("Failed to add product. Please check your input.");
      } finally {
        setIsSubmitting(false);
      }
    };

    if (isSubmitting) {
      addProduct();
    }
  }, [isSubmitting, formData]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Product</h2>

        {/* Product Name */}
        <div className="mb-4">
          <label
            htmlFor="productName"
            className="block text-gray-700 font-medium mb-2"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product name"
          />
        </div>

        {/* Stock Quantity */}
        <div className="mb-4">
          <label
            htmlFor="stockQuantity"
            className="block text-gray-700 font-medium mb-2"
          >
            Stock Quantity
          </label>
          <input
            type="number"
            id="stockQuantity"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter stock quantity"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
