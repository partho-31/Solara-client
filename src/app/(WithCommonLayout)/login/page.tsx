"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Email login (demo)");
  };

  const handleGoogleLogin = () => {
    // Replace with NextAuth / Firebase signIn("google")
    alert("Google login triggered");
  };

  return (
    <div className="min-h-screen grid grid-cols-1  bg-[#faf8f4] py-10">
      {/* LEFT - FORM */}
      <div className="flex items-center justify-center px-6 md:px-16 py-20">
        <div className="w-full max-w-md">

          {/* BRAND */}
          <h1 className="font-serif text-3xl tracking-widest mb-2">
            SOL<span className="text-[#b8975a]">ARA</span>
          </h1>

          <p className="text-sm text-gray-500 mb-8">
            Welcome back. Sign in to continue your journey.
          </p>

          {/* FORM CARD */}
          <form
            onSubmit={handleLogin}
            className="space-y-5 bg-white border border-[#e2dbd0] p-8 rounded-sm"
          >
            {/* EMAIL */}
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500">
                Email
              </label>
              <input
                type="email"
                className="w-full mt-2 px-4 py-3 border border-[#e2dbd0] bg-[#faf8f4] focus:outline-none focus:border-[#b8975a] text-sm transition"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500">
                Password
              </label>
              <input
                type="password"
                className="w-full mt-2 px-4 py-3 border border-[#e2dbd0] bg-[#faf8f4] focus:outline-none focus:border-[#b8975a] text-sm transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* OPTIONS */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#b8975a]" />
                Remember me
              </label>

              <a href="#" className="hover:text-black transition">
                Forgot password?
              </a>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#0f0e0c] text-white py-3 text-xs uppercase tracking-widest hover:bg-[#b8975a] transition"
            >
              Sign In
            </button>

            {/* DIVIDER */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-[#e2dbd0]" />
              <span className="text-xs text-gray-400 uppercase tracking-widest">
                or continue with
              </span>
              <div className="h-px flex-1 bg-[#e2dbd0]" />
            </div>

            {/* GOOGLE LOGIN */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 border border-[#e2dbd0] bg-white py-3 text-sm hover:border-[#b8975a] hover:shadow-sm transition"
            >
              <span className="text-sm">Continue with Google</span>
            </button>

            {/* SIGNUP LINK */}
            <p className="text-xs text-center text-gray-500">
              Don’t have an account?{" "}
              <a href="/register" className="text-[#b8975a] hover:underline">
                Create one
              </a>
            </p>
          </form>
        </div>
      </div>

    
    </div>
  );
}