"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  const { data: session } = useSession();
  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Banner */}
        <header className="bg-blue-600 text-white">
          <div className="container mx-auto px-4 py-10 text-center">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to Sales Manager
            </h1>
            <p className="text-lg">
              Streamline your sales operations and manage your inventory with
              ease.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow bg-gray-100">
          <div className="container mx-auto px-4 py-10 text-center">
            <h2 className="text-2xl font-bold mb-6">Why Choose Us?</h2>
            <p className="text-lg mb-4">
              Our platform simplifies sales tracking and inventory management,
              saving you time and boosting productivity.
            </p>
            <Link href={session?"/dashboard":"/sign-in"} className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700">
              Get Started
            </Link>
          </div>
        </main>

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
