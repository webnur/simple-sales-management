"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <div className="min-h-screen flex flex-col bg-cover bg-center">
        {/* Banner */}
        <div className="flex-grow flex items-center justify-center text-white bg-[#303f9f] bg-opacity-75">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">
              Welcome to Sales Manager
            </h1>
            <p className="text-lg mb-6">
              Streamline your sales operations and manage your inventory with
              ease.
            </p>
            <div className="flex justify-center gap-4">
              {status === "loading" ? (
                <button
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-8 rounded-full font-semibold shadow-lg cursor-not-allowed opacity-50"
                  disabled
                >
                  Loading...
                </button>
              ) : (
                <Link
                  href={session ? "/dashboard" : "/sign-in"}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-8 rounded-full font-semibold shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:from-indigo-600 hover:to-blue-500"
                >
                  GET STARTED
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {/* Footer */}
        <footer className="bg-gray-800 text-white">
          <div className="container mx-auto px-4 py-6 text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} Sales Manager. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
