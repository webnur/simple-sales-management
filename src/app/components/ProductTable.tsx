"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Table() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("/api/get_product")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  interface Product {
    _id: string;
    name: string;
    quantity: number;
    sales: number;
    afterSalesQuantity: number;
  }

  const handleOpenModal = (product: Product) => {
    setSelectedProduct({ ...product, quantity: 0, sales: 0 });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleOpenResetModal = (product: Product) => {
    setSelectedProduct(product);
    setIsResetModalOpen(true);
  };

  const handleCloseResetModal = () => {
    setSelectedProduct(null);
    setIsResetModalOpen(false);
  };

  const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedProduct) {
      try {
        const payload = {
          id: selectedProduct._id, // Include the product ID
          name: selectedProduct.name,
          quantity: selectedProduct.quantity,
          sales: selectedProduct.sales,
          afterSalesQuantity: selectedProduct.afterSalesQuantity,
        };

        const response = await axios.patch("/api/update_product", payload);

        if (response.status === 200) {
          const updatedProduct = response.data.product;

          const updatedProducts = products.map((product) =>
            product._id === updatedProduct._id ? updatedProduct : product
          );
          setProducts(updatedProducts);

          toast.success("Product updated successfully");
        } else {
          console.error("Failed to update the product:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating the product:", error);
      }
    }

    handleCloseModal();
  };

  const handleResetProduct = async () => {
    if (selectedProduct) {
      try {
        const payload = {
          id: selectedProduct._id,
          name: selectedProduct.name,
          quantity: 0,
          sales: 0,
          afterSalesQuantity: 0,
        };

        const response = await axios.patch("/api/update_product", payload);

        if (response.status === 200) {
          const updatedProduct = response.data.product;

          const updatedProducts = products.map((product) =>
            product._id === updatedProduct._id ? updatedProduct : product
          );
          setProducts(updatedProducts);

          toast.success("Product reset successfully");
        } else {
          console.error("Failed to reset the product:", response.statusText);
        }
      } catch (error) {
        console.error("Error resetting the product:", error);
      }
    }

    handleCloseResetModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (selectedProduct) {
      setSelectedProduct({ ...selectedProduct, [name]: value });
    }
  };

  return (
    <div className="p-6">
      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700 divide-y divide-gray-700 text-sm">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Product Name</th>
              <th className="px-4 py-3 text-left">Stock Quantity</th>
              <th className="px-4 py-3 text-left">Total Sales</th>
              <th className="px-4 py-3 text-left">After Sales Quantity</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 text-gray-300 divide-y divide-gray-700">
            {products.map((product, index) => (
              <tr key={product._id}>
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.quantity}</td>
                <td className="px-4 py-3">{product.sales}</td>
                <td className="px-4 py-3">{product.afterSalesQuantity}</td>
                <td className="px-4 py-3">
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => handleOpenModal(product)}
                  >
                    Update Sales
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => handleOpenResetModal(product)}
                  >
                    Reset
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Update Product</h2>
            <form onSubmit={handleUpdateProduct}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={selectedProduct?.name || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Stock Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={selectedProduct?.quantity || 0}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="sales"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Total Sales
                </label>
                <input
                  type="number"
                  id="sales"
                  name="sales"
                  value={selectedProduct?.sales || 0}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
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
                  value={selectedProduct?.afterSalesQuantity || 0}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Product Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Reset Product</h2>
            <p className="mb-4 text-gray-700">
              Are you sure you want to reset the product data?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCloseResetModal}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                No
              </button>
              <button
                type="button"
                onClick={handleResetProduct}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
