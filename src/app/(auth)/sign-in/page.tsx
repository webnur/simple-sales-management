/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Component() {
  const { data: session } = useSession();
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
        toast.error({
          description: result.error,
          variant: "destructive",
        });
      } else if (result?.url) {
        toast.success({
          title: "Welcome",
          description: "Successfully Login",
        });
        router.replace("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Opps !",
        variant: "destructive",
        description: "something went wrong",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user.email);
  };

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-[400px] p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            SIGN IN
          </h1>
          <div>
            <form action="">
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
                  disabled={user.email === ""}
                  placeholder="password"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                    user.email === ""
                      ? "border-red-500 cursor-not-allowed"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                  }`}
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
            </form>
          </div>
          <div>
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md text-lg font-semibold"
              onClick={loginHandel}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
