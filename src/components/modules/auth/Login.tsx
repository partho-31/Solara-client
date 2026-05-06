"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    alert("Logged in (demo)");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#faf8f4]">
      {/* LEFT - FORM */}
      <div className="flex items-center justify-center px-6 md:px-16 py-20">
        <div className="w-full max-w-md">
          {/* BRAND */}
          <h1 className="font-serif text-3xl tracking-widest mb-2">
            Quick<span className="text-[#b8975a]">Cart</span>
          </h1>

          <p className="text-sm text-gray-500 mb-10">
            Welcome back. Sign in to continue your journey.
          </p>

          {/* FORM */}
          <form
            onSubmit={handleLogin}
            className="space-y-5 bg-white border border-[#e2dbd0] p-8 rounded-sm"
          >
            {/* Email */}
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500">
                Email
              </label>
              <input
                type="email"
                className="w-full mt-2 px-4 py-3 border border-[#e2dbd0] bg-[#faf8f4] focus:outline-none focus:border-[#b8975a] transition text-sm"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500">
                Password
              </label>
              <input
                type="password"
                className="w-full mt-2 px-4 py-3 border border-[#e2dbd0] bg-[#faf8f4] focus:outline-none focus:border-[#b8975a] transition text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#b8975a]" />
                Remember me
              </label>

              <a href="#" className="hover:text-black transition">
                Forgot password?
              </a>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#0f0e0c] text-white py-3 text-xs uppercase tracking-widest hover:bg-[#b8975a] transition"
            >
              Sign In
            </button>

            <p className="text-xs text-center text-gray-500">
              Don’t have an account?{" "}
              <a
                href="/register"
                className="text-[#b8975a] hover:underline"
              >
                Create one
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* RIGHT - VISUAL PANEL */}
      <div className="hidden lg:flex items-center justify-center bg-[#1c1a16] relative overflow-hidden">
        {/* decorative pattern */}
        <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_40px,#b8975a20_40px,#b8975a20_41px)]" />

        {/* floating fashion icon */}
        <div className="text-[10rem] animate-[float_6s_ease-in-out_infinite] relative z-10">
          👗
        </div>

        {/* badge */}
        <div className="absolute bottom-10 left-10 bg-white/10 backdrop-blur-md border border-[#b8975a55] text-white px-5 py-4 rounded-sm">
          <p className="text-xs uppercase tracking-widest text-[#e8d9b8]">
            Exclusive Access
          </p>
          <p className="font-serif text-xl mt-1 font-light">
            Members Only Drops
          </p>
        </div>

        {/* top badge */}
        <div className="absolute top-10 right-10 bg-[#b8975a] text-white px-4 py-2 text-xs uppercase tracking-widest font-semibold rounded-sm">
          Luxury Fashion Hub
        </div>
      </div>
    </div>
  );
}