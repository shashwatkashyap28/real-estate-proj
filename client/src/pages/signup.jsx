import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Signup() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="relative hidden lg:block">

          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="Luxury Home"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />

          <div className="absolute bottom-16 left-16 text-white max-w-md">
            <h1 className="text-5xl font-bold leading-tight">
              Find Your
              <br />
              Dream Home.
            </h1>

            <p className="mt-6 text-lg text-gray-200">
              Join thousands of buyers and sellers discovering premium
              properties around the world.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center justify-center bg-gradient-to-brown from-slate-950 via-slate-900 to-slate-800 p-6">

          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-8 shadow-2xl">

            <h2 className="text-center text-4xl font-bold text-white">
              Create Account
            </h2>

            <p className="mt-2 text-center text-gray-400">
              Welcome to GOREALTORS
            </p>

            <form className="mt-8 space-y-5">

              {/* Username */}

              <div className="relative">

                <FaUser className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  placeholder="Username"
                  className="w-full rounded-xl border border-slate-600 bg-slate-800/60 py-3 pl-12 pr-4 text-white outline-none transition focus:border-blue-500"
                />

              </div>

              {/* Email */}

              <div className="relative">

                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-xl border border-slate-600 bg-slate-800/60 py-3 pl-12 pr-4 text-white outline-none transition focus:border-blue-500"
                />

              </div>

              {/* Password */}

              <div className="relative">

                <FaLock className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-xl border border-slate-600 bg-slate-800/60 py-3 pl-12 pr-4 text-white outline-none transition focus:border-blue-500"
                />

              </div>

              {/* Confirm Password */}

              <div className="relative">

                <FaLock className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full rounded-xl border border-slate-600 bg-slate-800/60 py-3 pl-12 pr-4 text-white outline-none transition focus:border-blue-500"
                />

              </div>

              {/* Button */}

              <button
                className="w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/40"
              >
                Create Account
              </button>

            </form>

            {/* Divider */}

            <div className="my-7 flex items-center">

              <div className="h-px flex-1 bg-gray-600"></div>

              <span className="mx-4 text-gray-400">OR</span>

              <div className="h-px flex-1 bg-gray-600"></div>

            </div>

            {/* Google */}

            <button
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-600 bg-white py-3 font-semibold text-black transition hover:bg-gray-100"
            >
              <FcGoogle size={24} />
              Continue with Google
            </button>

            {/* Footer */}

            <p className="mt-8 text-center text-gray-400">
              Already have an account?{" "}
              <span className="cursor-pointer font-semibold text-blue-400 hover:text-blue-300">
                Sign In
              </span>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}