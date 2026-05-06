"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }

    alert("Account created (demo)");
  };

  const handleGoogle = () => {
    alert("Google signup triggered");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 py-10 bg-[#faf8f4]">
    
      <div className="flex items-center justify-center px-6 md:px-16 py-20">
        <div className="w-full max-w-lg">
          {/* BRAND */}
          <h1 className="font-serif text-3xl tracking-widest mb-2">
            SOL<span className="text-[#b8975a]">ARA</span>
          </h1>

          <p className="text-sm text-gray-500 mb-8">
            Create your account and step into curated fashion.
          </p>

          {/* FORM */}
          <form
            onSubmit={handleRegister}
            className="space-y-4 bg-white border border-[#e2dbd0] p-8 rounded-sm"
          >
            {/* NAME ROW */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500">
                  First Name
                </label>
                <input
                  name="first"
                  value={form.first}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-3 border border-[#e2dbd0] bg-[#faf8f4] text-sm focus:outline-none focus:border-[#b8975a]"
                  placeholder="Jane"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500">
                  Last Name
                </label>
                <input
                  name="last"
                  value={form.last}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-3 border border-[#e2dbd0] bg-[#faf8f4] text-sm focus:outline-none focus:border-[#b8975a]"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 border border-[#e2dbd0] bg-[#faf8f4] text-sm focus:outline-none focus:border-[#b8975a]"
                placeholder="you@example.com"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 border border-[#e2dbd0] bg-[#faf8f4] text-sm focus:outline-none focus:border-[#b8975a]"
                placeholder="••••••••"
              />
            </div>

            {/* CONFIRM */}
            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500">
                Confirm Password
              </label>
              <input
                name="confirm"
                type="password"
                value={form.confirm}
                onChange={handleChange}
                className="w-full mt-2 px-4 py-3 border border-[#e2dbd0] bg-[#faf8f4] text-sm focus:outline-none focus:border-[#b8975a]"
                placeholder="••••••••"
              />
            </div>

            {/* TERMS */}
            <label className="flex items-center gap-2 text-xs text-gray-500">
              <input type="checkbox" className="accent-[#b8975a]" />
              I agree to the terms & conditions
            </label>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#0f0e0c] text-white py-3 text-xs uppercase tracking-widest hover:bg-[#b8975a] transition"
            >
              Create Account
            </button>

            {/* DIVIDER */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-[#e2dbd0]" />
              <span className="text-xs text-gray-400 uppercase tracking-widest">
                or continue with
              </span>
              <div className="h-px flex-1 bg-[#e2dbd0]" />
            </div>

            {/* GOOGLE */}
            <button
              type="button"
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 border border-[#e2dbd0] bg-white py-3 text-sm hover:border-[#b8975a] transition"
            >
              <span>Continue with Google</span>
            </button>

            {/* LOGIN LINK */}
            <p className="text-xs text-center text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-[#b8975a] hover:underline">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>

     
    </div>
  );
}