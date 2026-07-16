import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaHome,
  FaPhoneAlt,
  FaPhone,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "../components/OAuth";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }

      setLoading(false);
      setError(null);

      navigate("/signin");
    } catch (err) {
      setLoading(false);
      setError(err.message || "Something went wrong");
    }
  };

  return (
    
      <main className="min-h-screen bg-black text-white overflow-hidden">
    
        <div className="grid min-h-screen lg:grid-cols-2">
    
          {/* ================= LEFT HERO SECTION ================= */}
    
          <div className="relative hidden overflow-hidden lg:flex">
    
            {/* Background Image */}
    
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=80"
              alt="Luxury Villa"
              className="h-full w-full object-cover"
            />
    
            {/* Dark Overlay */}
    
            <div className="absolute inset-0 bg-gradient-to-red from-black/90 via-black/70 to-black/40"></div>
    
            {/* Green Glow */}
    
            <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl"></div>
    
            <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-teal from-black to-transparent"></div>
    
            {/* Content */}
    
            <div className="absolute inset-0 flex flex-col justify-center px-16">
    
              {/* Badge */}
    
              <div className="mb-8 w-fit rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-sm font-semibold text-emerald-400 backdrop-blur-md">
    
                🏡 Premium Real Estate Consultancy
    
              </div>
    
              {/* Heading */}
    
              <h1 className="max-w-xl text-6xl font-black leading-tight">
    
                Find Your
    
                <span className="block text-emerald-400">
    
                  Dream Home
    
                </span>
    
                With Experts
    
              </h1>
    
              {/* Description */}
    
              <p className="mt-8 max-w-lg text-lg leading-8 text-gray-300">
    
                Looking for the perfect apartment, villa or commercial
                property?
    
                Submit your enquiry and our property advisors
                will contact you within 24 hours with handpicked options
                that match your requirements.
    
              </p>
    
              {/* Features */}
    
              <div className="mt-10 space-y-5">
    
                <div className="flex items-center gap-4">
    
                  <FaCheckCircle className="text-emerald-400 text-xl" />
    
                  <span className="text-lg">
                    100% Verified Premium Listings
                  </span>
    
                </div>
    
                <div className="flex items-center gap-4">
    
                  <FaCheckCircle className="text-emerald-400 text-xl" />
    
                  <span className="text-lg">
                    Trusted Property Consultants
                  </span>
    
                </div>
    
                <div className="flex items-center gap-4">
    
                  <FaCheckCircle className="text-emerald-400 text-xl" />
    
                  <span className="text-lg">
                    Free Expert Consultation
                  </span>
    
                </div>
    
              </div>
    
              {/* Statistics */}
    
              <div className="mt-16 grid grid-cols-3 gap-6">
    
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
    
                  <h2 className="text-4xl font-bold text-white">
                    5000+
                  </h2>
    
                  <p className="mt-2 text-gray-300">
                    Properties Listed
                  </p>
    
                </div>
    
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
    
                  <h2 className="text-4xl font-bold text-white">
                    1200+
                  </h2>
    
                  <p className="mt-2 text-gray-300">
                    Happy Clients
                  </p>
    
                </div>
    
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
    
                  <h2 className="text-4xl font-bold text-white">
                    4.9★
                  </h2>
    
                  <p className="mt-2 text-gray-300">
                    Client Rating
                  </p>
    
                </div>
    
              </div>
    
            </div>
    
          </div>
    
          {/* ================= RIGHT SIDE STARTS HERE ================= */}
          {/* ================= RIGHT SIDE ================= */}

<div className="flex items-center justify-center bg-cream text-charcoal px-6 py-12">

<div className="w-full max-w-md rounded-3xl border border-gold-200 bg-white border border-gold-100 p-8 shadow-2xl backdrop-blur-xl">

  {/* Heading */}

  <div className="text-center">

    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">

      <FaHome className="text-3xl text-emerald-400" />

    </div>

    <h2 className="text-4xl font-bold">

      Book a

      <span className="block text-emerald-400">

        Free Consultation

      </span>

    </h2>

    <p className="mt-4 text-gray-600 leading-7">

      Fill in your details and one of our
      property experts will contact you
      within 24 hours.

    </p>

  </div>

  {/* Form */}

  <form
    onSubmit={handleSubmit}
    className="mt-10 space-y-5"
  >

    {/* Full Name */}

    <div className="relative">

      <FaUser className="absolute left-4 top-4 text-gray-600" />

      <input
        type="text"
        id="username"
        placeholder="Your Full Name"
        onChange={handleChange}
        className="w-full rounded-xl border border-gold-200 bg-cream py-3 pl-12 pr-4 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
      />

    </div>

    {/* Email */}

    <div className="relative">

      <FaEnvelope className="absolute left-4 top-4 text-gray-600" />

      <input
        type="email"
        id="email"
        placeholder="Email Address"
        onChange={handleChange}
        className="w-full rounded-xl border border-gold-200 bg-cream py-3 pl-12 pr-4 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
      />

    </div>
    {/* Contact Number */}

<div className="relative">

<FaPhone className="absolute left-4 top-4 text-gray-600" />

<input
  type="tel"
  id="phone"
  placeholder="Contact Number"
  onChange={handleChange}
  className="w-full rounded-xl border border-gold-200 bg-cream py-3 pl-12 pr-4 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
/>

</div>

    {/* Password */}

    <div className="relative">

      <FaLock className="absolute left-4 top-4 text-gray-600" />

      <input
        type={showPassword ? "text" : "password"}
        id="password"
        placeholder="Create Password"
        onChange={handleChange}
        className="w-full rounded-xl border border-gold-200 bg-cream py-3 pl-12 pr-12 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-4 text-gray-600 hover:text-charcoal"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>

    </div>

    {/* Terms */}

    <label className="flex items-start gap-3 text-sm text-gray-600">

      <input
        type="checkbox"
        required
        className="mt-1 accent-emerald-500"
      />

      <span>

        I agree to the

        <span className="mx-1 cursor-pointer font-semibold text-emerald-400 hover:text-emerald-300">

          Terms & Conditions

        </span>

        and

        <span className="ml-1 cursor-pointer font-semibold text-emerald-400 hover:text-emerald-300">

          Privacy Policy

        </span>

      </span>

    </label>

    {/* CTA */}

    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-xl bg-emerald-500 py-3 text-lg font-bold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? "Submitting..." : "Book Free Consultation"}
    </button>
    <OAuth />

    {/* Trust Text */}

    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">

      <div className="flex items-center gap-3">

        <FaPhoneAlt className="text-emerald-400" />

        <p className="text-sm text-gray-600">

          Our property advisor will personally
          contact you within <strong>24 hours</strong>
          to understand your requirements.

        </p>

      </div>

    </div>

  </form>
        {/* Trust Section */}

        <div className="mt-8 rounded-2xl border border-gold-200 bg-white border border-gold-100 p-5">

<h3 className="mb-4 text-lg font-semibold text-charcoal">

  Why Choose GO REALTORS?

</h3>

<div className="space-y-3">

  <div className="flex items-center gap-3">

    <FaCheckCircle className="text-emerald-400" />

    <span className="text-sm text-gray-600">
      100% Verified Properties
    </span>

  </div>

  <div className="flex items-center gap-3">

    <FaCheckCircle className="text-emerald-400" />

    <span className="text-sm text-gray-600">
      Professional Property Advisors
    </span>

  </div>

  <div className="flex items-center gap-3">

    <FaCheckCircle className="text-emerald-400" />

    <span className="text-sm text-gray-600">
      Free Site Visits & Consultation
    </span>

  </div>

  <div className="flex items-center gap-3">

    <FaCheckCircle className="text-emerald-400" />

    <span className="text-sm text-gray-600">
      Zero Hidden Charges
    </span>

  </div>

</div>

</div>

{/* Footer */}

<div className="mt-8 text-center">

<p className="text-gray-600">

  Already registered?

  <Link
    to="/signin"
    className="ml-2 font-semibold text-emerald-400 transition hover:text-emerald-300"
  >
    Sign In
  </Link>

</p>

</div>

</div>

</div>

</div>

{/* Error Toast */}

{error && (

<div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">

<div className="rounded-xl border border-red-500/40 bg-red-600 px-6 py-4 text-white shadow-2xl backdrop-blur-xl animate-bounce">

<p className="font-medium">

{error}

</p>

</div>

</div>

)}

{/* Bottom Blur */}

<div className="pointer-events-none fixed bottom-0 left-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"></div>

<div className="pointer-events-none fixed right-0 top-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"></div>

</main>
);
}