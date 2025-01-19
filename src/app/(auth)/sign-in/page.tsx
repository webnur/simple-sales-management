/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Component() {
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const loginHandel = async () => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: user.email,
        password: user.password,
      });

      if (result?.error) {
        toast.error(result.error);
      } else if (result?.url) {
        toast.success("Successfully logged in.");
        router.replace("/dashboard");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[400px] p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          SIGN IN
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginHandel();
          }}
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              aria-label="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              aria-label="Enter your password"
              disabled={user.email === ""}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                user.email === ""
                  ? "border-red-500 cursor-not-allowed"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500"
              }`}
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-md text-lg font-semibold ${
              user.email === ""
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            disabled={user.email === ""}
          >
            Sign in
          </button>
        </form>
        <Link href={"/"}>
          <h1 className="text-xl font-bold text-center text-gray-800 mt-6">
            Home
          </h1>
        </Link>
      </div>
    </div>
  );
}
