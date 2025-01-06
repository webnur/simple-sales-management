"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">
            <span>MyLogo</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/create-product">
            <span className="hover:text-gray-400 transition-colors duration-200">
              Create Product
            </span>
          </Link>
          <Link href="/login">
            <span className="hover:text-gray-400 transition-colors duration-200">
              Login
            </span>
          </Link>
          <Link href="/signup">
            <span className="hover:text-gray-400 transition-colors duration-200">
              Sign Up
            </span>
          </Link>
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
    </header>
  );
}
