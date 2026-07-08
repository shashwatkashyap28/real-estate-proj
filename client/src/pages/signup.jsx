import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE */}

        <div className="relative hidden overflow-hidden lg:block">

          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
            alt="Luxury Home"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/70"></div>

          {/* Green Glow */}

          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-green-500/20 blur-3xl"></div>

          <div className="absolute bottom-16 left-16 max-w-md">

            <span className="rounded-full bg-green-500/20 px-4 py-2 text-green-400 border border-green-500/30">
              Join Go Realtors
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight">

              Find Your 
              <br />

              <span className="text-green-500">
                Dream Home
              </span>

            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-300">

              Create your account to discover premium
              properties, save favourites,
              connect with trusted agents
              and begin your real estate journey.

            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center justify-center bg-gradient-to-blue from-black via-slate-900 to-black px-6 py-12">

          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">

            <div className="text-center">

              <h2 className="text-4xl font-bold">

                Create Account

              </h2>

              <p className="mt-3 text-gray-400">

                Welcome to <span className="text-green-500 font-semibold">GO REALTORS</span>

              </p>

            </div>

            <form className="mt-10 space-y-5">

              {/* Username */}

              <div className="relative">

                <FaUser className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-3 pl-12 pr-4 outline-none transition focus:border-green-500"
                />

              </div>

              {/* Email */}

              <div className="relative">

                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-3 pl-12 pr-4 outline-none transition focus:border-green-500"
                />

              </div>

              {/* Password */}

              <div className="relative">

                <FaLock className="absolute left-4 top-4 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-3 pl-12 pr-12 outline-none transition focus:border-green-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-white"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

              </div>

              {/* Confirm Password */}

              <div className="relative">

                <FaLock className="absolute left-4 top-4 text-gray-400" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-3 pl-12 pr-12 outline-none transition focus:border-green-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-4 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>
                            {/* Terms & Conditions */}

                            <label className="flex items-start gap-3 text-sm text-gray-400">

<input
  type="checkbox"
  className="mt-1 accent-green-500"
/>

<span>
  I agree to the{" "}
  <span className="cursor-pointer text-green-500 hover:text-green-400">
    Terms & Conditions
  </span>{" "}
  and{" "}
  <span className="cursor-pointer text-green-500 hover:text-green-400">
    Privacy Policy
  </span>
</span>

</label>

{/* Create Account Button */}

<button
type="submit"
className="w-full rounded-xl bg-green-500 py-3 text-lg font-semibold text-black transition duration-300 hover:scale-[1.02] hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/30"
>
Create Account
</button>

</form>

{/* Divider */}

<div className="my-8 flex items-center">

<div className="h-px flex-1 bg-slate-700"></div>

<span className="mx-4 text-gray-400">
OR
</span>

<div className="h-px flex-1 bg-slate-700"></div>

</div>

{/* Google */}

<button
className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-white py-3 font-semibold text-black transition hover:bg-gray-100"
>

<FcGoogle size={24} />

Continue with Google

</button>

{/* Footer */}

<p className="mt-8 text-center text-gray-400">

Already have an account?{" "}

<Link
to="/signin"
className="font-semibold text-green-500 hover:text-green-400 transition"
>
Sign In
</Link>

</p>

</div>

</div>

</div>

</main>
);
}
