import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* ================= LEFT SIDE ================= */}

        <div className="relative hidden lg:block overflow-hidden">

          <img
            loading="lazy"
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80"
            alt="Luxury Home"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/70"></div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-green-900/20"></div>

          <div className="absolute bottom-16 left-16 max-w-lg">

            <span className="inline-block rounded-full bg-green-600/20 px-5 py-2 text-green-400 font-semibold border border-green-600/30">
              Welcome Back
            </span>

            <h1 className="mt-8 text-6xl font-extrabold leading-tight">

              Your Dream Home
              <br />

              Starts Here.

            </h1>

            <p className="mt-8 text-lg leading-8 text-gray-300">

              Sign in to discover premium homes, connect with trusted
              real estate experts, manage your saved properties,
              and experience a smarter way to buy your dream home.

            </p>

            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-3">

                <FaCheckCircle className="text-green-500" />

                <span className="text-gray-300">
                  Verified Property Listings
                </span>

              </div>

              <div className="flex items-center gap-3">

                <FaCheckCircle className="text-green-500" />

                <span className="text-gray-300">
                  Trusted Real Estate Advisors
                </span>

              </div>

              <div className="flex items-center gap-3">

                <FaCheckCircle className="text-green-500" />

                <span className="text-gray-300">
                  Secure & Transparent Transactions
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="flex items-center justify-center bg-black px-6 py-12">

          <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-xl p-8 shadow-[0_20px_60px_rgba(34,197,94,0.15)]">

            <div className="text-center">

              <h2 className="text-4xl font-bold">
                Sign In
              </h2>

              <p className="mt-3 text-gray-400">
                Welcome back to <span className="text-green-500 font-semibold">Go Realtors</span>
              </p>

            </div>

            <form className="mt-10 space-y-6">

              {/* Email */}

              <div className="relative">

                <FaEnvelope className="absolute left-4 top-4 text-gray-500" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-zinc-700 bg-black py-3 pl-12 pr-4 outline-none transition focus:border-green-500"
                />

              </div>

              {/* Password */}

              <div className="relative">

                <FaLock className="absolute left-4 top-4 text-gray-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-zinc-700 bg-black py-3 pl-12 pr-12 outline-none transition focus:border-green-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-500 hover:text-white"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

              </div>
                            {/* Remember Me & Forgot Password */}

                            <div className="flex items-center justify-between">

<label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">

  <input
    type="checkbox"
    className="accent-green-600"
  />

  Remember Me

</label>

<button
  type="button"
  className="text-sm text-green-500 transition hover:text-green-400"
>
  Forgot Password?
</button>

</div>

{/* Sign In Button */}

<button
type="submit"
className="w-full rounded-xl bg-green-600 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/30"
>
Sign In
</button>

</form>

{/* Divider */}

<div className="my-8 flex items-center">

<div className="h-px flex-1 bg-zinc-700"></div>

<span className="mx-4 text-gray-500 font-medium">
OR
</span>

<div className="h-px flex-1 bg-zinc-700"></div>

</div>

{/* Google Sign In */}

<button className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-700 bg-white py-3 font-semibold text-black transition hover:bg-gray-100">

<FcGoogle size={24} />

Continue with Google

</button>

{/* Footer */}

<p className="mt-8 text-center text-gray-400">

Don't have an account?{" "}

<Link
to="/signup"
className="font-semibold text-green-500 hover:text-green-400 transition"
>
Create Account
</Link>

</p>

</div>

</div>

</div>

</main>
);
}