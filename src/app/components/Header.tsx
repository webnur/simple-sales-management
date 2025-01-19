"use client";
import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import AddProductForm from "./AddProductForm";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-4xl font-bold flex items-center">
          <Link href="/" className="flex items-center">
            {/* Highlighted Text */}
            <span className="text-[#ef5350] font-extrabold  tracking-wide">
              SALES
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <button
            className="hover:text-gray-400 transition-colors duration-200"
            onClick={() => handleOpenModal()}
          >
            Create Product
          </button>
          <button
            className="hover:text-gray-400 transition-colors duration-200"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="bg-gray-800 md:hidden">
          <nav className="flex flex-col space-y-4 p-4">
            <Link href="/create-product">
              <span
                onClick={toggleMobileMenu}
                className="hover:text-gray-400 transition-colors duration-200 cursor-pointer"
              >
                Create Product
              </span>
            </Link>
            <Link href="/login">
              <span
                onClick={toggleMobileMenu}
                className="hover:text-gray-400 transition-colors duration-200 cursor-pointer"
              >
                Login
              </span>
            </Link>
            <Link href="/signup">
              <span
                onClick={toggleMobileMenu}
                className="hover:text-gray-400 transition-colors duration-200 cursor-pointer"
              >
                Sign Up
              </span>
            </Link>
          </nav>
        </div>
      )}

      {/* Update Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 relative rounded-lg shadow-lg w-full max-w-md">
            <span className="text-xl absolute right-2 top-2 text-bold text-black">
              <button onClick={() => setIsModalOpen(false)}>Close</button>
            </span>
            <AddProductForm />
          </div>
        </div>
      )}
    </header>
  );
}
