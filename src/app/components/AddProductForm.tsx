"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function AddProductForm() {
  interface FormData {
    productName: string;
    stockQuantity: number;
    totalSales: number;
    afterSalesQuantity: number;
  }

  interface Errors {
    productName?: string;
    stockQuantity?: string;
    totalSales?: string;
    afterSalesQuantity?: string;
  }

  const [formData, setFormData] = useState<FormData>({
    productName: "",
    stockQuantity: 0,
    totalSales: 0,
    afterSalesQuantity: 0,
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    const validationErrors: Errors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof FormData]) {
        validationErrors[key as keyof FormData] = "This field is required";
      }
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Trigger API call by updating state
      setIsSubmitting(true);
    }
  };

  useEffect(() => {
    const addProduct = async () => {
      console.log(
        "Adding product...",
        formData.productName,
        formData.stockQuantity,
        formData.totalSales,
        formData.afterSalesQuantity
      );
      try {
        const response = await fetch("/api/post_product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.productName,
            quantity: formData.stockQuantity,
            sales: formData.totalSales,
            afterSalesQuantity: formData.afterSalesQuantity,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to add product: ${errorText}`);
        }

        const data = await response.json();
        toast.success("Product added successfully!");
        console.log("Product added successfully!", data);

        // Reset form
        setFormData({
          productName: "",
          stockQuantity: 0,
          totalSales: 0,
          afterSalesQuantity: 0,
        });
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

    if (isSubmitting) {
      addProduct();
    }
  }, [
    isSubmitting,
    formData.productName,
    formData.stockQuantity,
    formData.totalSales,
    formData.afterSalesQuantity,
  ]);

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
            className={`w-full p-3 border ${
              errors.productName ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter product name"
          />
          {errors.productName && (
            <p className="text-red-500 text-sm mt-1">{errors.productName}</p>
          )}
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
            className={`w-full p-3 border ${
              errors.stockQuantity ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter stock quantity"
          />
          {errors.stockQuantity && (
            <p className="text-red-500 text-sm mt-1">{errors.stockQuantity}</p>
          )}
        </div>

        {/* Total Sales */}
        <div className="mb-4">
          <label
            htmlFor="totalSales"
            className="block text-gray-700 font-medium mb-2"
          >
            Total Sales
          </label>
          <input
            type="number"
            id="totalSales"
            name="totalSales"
            value={formData.totalSales}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.totalSales ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter total sales"
          />
          {errors.totalSales && (
            <p className="text-red-500 text-sm mt-1">{errors.totalSales}</p>
          )}
        </div>

        {/* After Sales Quantity */}
        <div className="mb-4">
          <label
            htmlFor="afterSalesQuantity"
            className="block text-gray-700 font-medium mb-2"
          >
            After Sales Quantity
          </label>
          <input
            type="number"
            id="afterSalesQuantity"
            name="afterSalesQuantity"
            value={formData.afterSalesQuantity}
            onChange={handleChange}
            className={`w-full p-3 border ${
              errors.afterSalesQuantity ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter after sales quantity"
          />
          {errors.afterSalesQuantity && (
            <p className="text-red-500 text-sm mt-1">
              {errors.afterSalesQuantity}
            </p>
          )}
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
