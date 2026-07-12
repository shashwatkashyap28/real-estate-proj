import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHome,
  FaBuilding,
  FaMapMarkedAlt,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signin() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
      setError(null);

      const res = await fetch("/api/auth/signin", {
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

      navigate("/");

    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <main className="bg-white">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-black">

        <div className="absolute inset-0">

          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="h-full w-full object-cover opacity-10"
          />

        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">

          <span className="rounded-full bg-yellow-400/10 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-yellow-400">

            What We Do

          </span>

          <h1 className="mt-8 max-w-5xl text-5xl font-extrabold leading-tight text-white md:text-7xl">

            End-to-End Property
            <span className="text-emerald-400">
              {" "}Consultancy{" "}
            </span>
            For Buyers.

          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">

            Whether you're buying your first apartment,
            investing in commercial real estate,
            or searching for premium villas,
            GO REALTORS helps you make confident property decisions.

          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">

            <button className="rounded-full bg-emerald-500 px-8 py-4 font-semibold text-black transition hover:bg-emerald-400">

              Residential

            </button>

            <button className="rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-black">

              Commercial

            </button>

            <button className="rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-black">

              Luxury Villas

            </button>

            <button className="rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-black">

              Land & Plots

            </button>

          </div>

        </div>

      </section>

      {/* ================= RESIDENTIAL ================= */}
      <section className="bg-black py-24">

<div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

  {/* Left Image */}

  <div className="relative">

    <img
      src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
      alt="Luxury Residence"
      className="rounded-3xl shadow-2xl"
    />

    <div className="absolute -bottom-8 -right-8 rounded-2xl bg-emerald-500 p-6 text-black shadow-2xl">

      <p className="text-4xl font-bold">

        1500+

      </p>

      <p className="font-semibold">

        Homes Sold

      </p>

    </div>

  </div>

  {/* Right Content */}

  <div>

    <span className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-500">

      Residential

    </span>

    <h2 className="mt-5 text-5xl font-bold text-white">

      Find The Perfect
      <span className="text-emerald-500">
        {" "}Home{" "}
      </span>
      For Your Family

    </h2>

    <p className="mt-8 text-lg leading-8 text-white/80">

      Our residential property experts simplify every step
      of your home-buying journey. From apartment selection
      to legal documentation, home loans, negotiations,
      and final registration—we're with you throughout
      the process.

    </p>

    <div className="mt-10 grid gap-5">

      <div className="flex items-start gap-4">

        <FaCheckCircle className="mt-1 text-xl text-emerald-500" />

        <div>

          <h3 className="font-semibold text-emerald-500">

            Verified Properties

          </h3>

          <p className="text-white/80">

            Every listing is carefully verified before recommendation.

          </p>

        </div>

      </div>

      <div className="flex items-start gap-4">

        <FaCheckCircle className="mt-1 text-xl text-emerald-500" />

        <div>

          <h3 className="font-semibold text-emerald-500">

            Home Loan Assistance

          </h3>

          <p className="text-white/80">

            Compare multiple banks and receive the best interest rates.

          </p>

        </div>

      </div>

      <div className="flex items-start gap-4">

        <FaCheckCircle className="mt-1 text-xl text-emerald-500" />

        <div>

          <h3 className="font-semibold text-emerald-500">

            Legal Verification

          </h3>

          <p className="text-white/80">

            We verify ownership, approvals and documentation before purchase.

          </p>

        </div>

      </div>

      <div className="flex items-start gap-4">

        <FaCheckCircle className="mt-1 text-xl text-emerald-500" />

        <div>

          <h3 className="font-semibold text-emerald-500">

            Free Site Visits

          </h3>

          <p className="text-white/80">

            Schedule property visits with our dedicated advisors.

          </p>

        </div>

      </div>

    </div>

    <button className="mt-10 flex items-center gap-3 rounded-full bg-[#06143A] px-8 py-4 font-semibold text-white transition hover:bg-[#0B225A]">

      Explore Residential

      <FaArrowRight />

    </button>

  </div>

</div>

</section>

{/* ================= COMMERCIAL ================= */}
<section className="bg-black py-24">

  <div className="mx-auto max-w-7xl px-6">

    <div className="text-center">

      <span className="rounded-full bg-emerald-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-emerald-400">

        Why Choose Us

      </span>

      <h2 className="mt-8 text-5xl font-bold text-white">

        The GO REALTORS
        <span className="text-emerald-400">
          {" "}Difference
        </span>

      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">

        We don't just help you buy a property.
        We guide you through every stage of the journey,
        ensuring transparency, trust, and long-term value.

      </p>

    </div>

    {/* Feature Cards */}

    <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

      <div className="rounded-3xl bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:bg-white/10">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500">

          <FaHome className="text-3xl text-black" />

        </div>

        <h3 className="mt-6 text-2xl font-bold text-white">

          Premium Homes

        </h3>

        <p className="mt-4 leading-7 text-gray-300">

          Carefully selected apartments,
          villas and luxury residences
          across India's fastest-growing cities.

        </p>

      </div>

      <div className="rounded-3xl bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:bg-white/10">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500">

          <FaBuilding className="text-3xl text-black" />

        </div>

        <h3 className="mt-6 text-2xl font-bold text-white">

          Commercial Assets

        </h3>

        <p className="mt-4 leading-7 text-gray-300">

          Offices, retail spaces,
          warehouses and investment
          opportunities with high ROI.

        </p>

      </div>

      <div className="rounded-3xl bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:bg-white/10">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500">

          <FaMapMarkedAlt className="text-3xl text-black" />

        </div>

        <h3 className="mt-6 text-2xl font-bold text-white">

          Prime Locations

        </h3>

        <p className="mt-4 leading-7 text-gray-300">

          Discover projects in
          rapidly developing areas
          with excellent appreciation potential.

        </p>

      </div>

      <div className="rounded-3xl bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:bg-white/10">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500">

          <FaCheckCircle className="text-3xl text-black" />

        </div>

        <h3 className="mt-6 text-2xl font-bold text-white">

          Complete Assistance

        </h3>

        <p className="mt-4 leading-7 text-gray-300">

          Home loans, legal checks,
          registration, negotiations
          and post-sale support.

        </p>

      </div>

    </div>

    {/* Statistics */}

    <div className="mt-24 grid gap-8 rounded-3xl bg-white/5 p-10 md:grid-cols-4">

      <div className="text-center">

        <h2 className="text-5xl font-extrabold text-emerald-400">

          10K+

        </h2>

        <p className="mt-3 text-gray-300">

          Happy Clients

        </p>

      </div>

      <div className="text-center">

        <h2 className="text-5xl font-extrabold text-emerald-400">

          2500+

        </h2>

        <p className="mt-3 text-gray-300">

          Properties Sold

        </p>

      </div>

      <div className="text-center">

        <h2 className="text-5xl font-extrabold text-emerald-400">

          50+

        </h2>

        <p className="mt-3 text-gray-300">

          Cities Covered

        </p>

      </div>

      <div className="text-center">

        <h2 className="text-5xl font-extrabold text-emerald-400">

          99%

        </h2>

        <p className="mt-3 text-gray-300">

          Client Satisfaction

        </p>

      </div>

    </div>

  </div>

</section>

{/* ================= CTA ================= */}

<section className="bg-gradient-to-red bg-black py-24">

  <div className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center">

    <span className="rounded-full bg-white/10 px-5 py-2 font-semibold text-white">

      FREE PROPERTY CONSULTATION

    </span>

    <h2 className="mt-8 max-w-4xl text-5xl font-black leading-tight text-emerald-400">

      Ready To Find Your
      Dream Property?

    </h2>

    <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-200">

      Our certified property consultants are ready
      to help you shortlist the perfect home,
      commercial property or investment opportunity.

    </p>

    <button className="mt-10 rounded-full bg-white px-10 py-4 text-lg font-semibold text-black transition hover:scale-110">

      Talk To An Expert

    </button>

  </div>

</section>

{/* ================= ADVISOR LOGIN ================= */}
<section className="bg-black py-24">

  <div className="mx-auto max-w-7xl px-6">

    <div className="grid items-center gap-16 lg:grid-cols-2">

      {/* Left Side */}

      <div>

        <span className="rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-white">

          Secure Access

        </span>

        <h2 className="mt-8 text-5xl font-bold text-white">

          Advisor &
          <span className="text-emerald-500">
            {" "}Client Portal
          </span>

        </h2>

        <p className="mt-8 text-lg leading-8 text-emerald-600">

          Sign in to manage your enquiries,
          save favourite properties,
          schedule site visits,
          and communicate directly with our property consultants.

        </p>

        <div className="mt-10 space-y-5">

          <div className="flex items-center gap-4">

            <FaCheckCircle className="text-emerald-500 text-xl" />

            <span className="text-white">

              Track all your enquiries

            </span>

          </div>

          <div className="flex items-center gap-4">

            <FaCheckCircle className="text-emerald-500 text-xl" />

            <span className="text-white">

              Book property site visits

            </span>

          </div>

          <div className="flex items-center gap-4">

            <FaCheckCircle className="text-emerald-500 text-xl" />

            <span className="text-white">

              Save favourite properties

            </span>

          </div>

          <div className="flex items-center gap-4">

            <FaCheckCircle className="text-emerald-500 text-xl" />

            <span className="text-white">

              Connect directly with advisors

            </span>

          </div>

        </div>

      </div>

      {/* Login Card */}

      <div>

        <div className="rounded-3xl bg-white p-10 shadow-2xl">

          <h3 className="text-3xl font-bold text-slate-900">

            Portal Login

          </h3>

          <p className="mt-2 text-gray-500">

            Welcome back to GO REALTORS

          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >

            {/* Email */}

            <div className="relative">

              <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

              <input
                type="email"
                id="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-emerald-500"
              />

            </div>

            {/* Password */}

            <div className="relative">

              <FaLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-12 outline-none transition focus:border-emerald-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-500 py-4 font-semibold text-black transition hover:bg-emerald-400"
            >

              {loading ? "Signing In..." : "Sign In"}

            </button>

            {error && (

              <div className="rounded-xl bg-red-100 p-4 text-red-600">

                {error}

              </div>

            )}

          </form>

          <div className="mt-8 text-center">

            <p className="text-gray-500">

              New to GO REALTORS?

            </p>

            <Link
              to="/signup"
              className="mt-3 inline-block font-semibold text-emerald-600 hover:text-emerald-500"
            >

              Create an Account →

            </Link>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>

{/* ================= TESTIMONIALS ================= */}
<section className="bg-white py-24">

  <div className="mx-auto max-w-7xl px-6">

    <div className="text-center">

      <span className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-emerald-700">
        Testimonials
      </span>

      <h2 className="mt-8 text-5xl font-bold text-slate-900">
        What Our
        <span className="text-emerald-500"> Clients Say</span>
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
        Thousands of families and investors trust GO REALTORS to
        help them make the right property decisions.
      </p>

    </div>

    <div className="mt-20 grid gap-8 md:grid-cols-3">

      {/* Card 1 */}

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2">

        <div className="mb-6 flex text-yellow-400 text-xl">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="leading-8 text-gray-600">
          GO REALTORS helped us purchase our first home.
          The entire process was transparent and stress-free.
        </p>

        <div className="mt-8">

          <h3 className="font-bold text-slate-900">
            Rahul Sharma
          </h3>

          <p className="text-sm text-gray-500">
            Home Buyer
          </p>

        </div>

      </div>

      {/* Card 2 */}

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2">

        <div className="mb-6 flex text-yellow-400 text-xl">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="leading-8 text-gray-600">
          Excellent guidance while investing in commercial property.
          Highly professional advisors.
        </p>

        <div className="mt-8">

          <h3 className="font-bold text-slate-900">
            Priya Kapoor
          </h3>

          <p className="text-sm text-gray-500">
            Investor
          </p>

        </div>

      </div>

      {/* Card 3 */}

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2">

        <div className="mb-6 flex text-yellow-400 text-xl">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="leading-8 text-gray-600">
          They found us a premium apartment within our budget.
          Couldn't have asked for a better experience.
        </p>

        <div className="mt-8">

          <h3 className="font-bold text-slate-900">
            Aman Verma
          </h3>

          <p className="text-sm text-gray-500">
            Property Buyer
          </p>

        </div>

      </div>

    </div>

  </div>

</section>

{/* ================= FINAL CTA ================= */}

<section className="bg-[#06143A] py-24">

  <div className="mx-auto max-w-5xl px-6 text-center">

    <h2 className="text-5xl font-bold text-white">

      Ready To Find
      <span className="text-emerald-400"> Your Dream Property?</span>

    </h2>

    <p className="mt-8 text-lg leading-8 text-gray-300">

      Whether you're buying your first home,
      investing in commercial real estate,
      or searching for luxury properties,
      our experts are ready to help.

    </p>

    <div className="mt-12 flex flex-wrap justify-center gap-6">

      <Link
        to="/signup"
        className="rounded-full bg-emerald-500 px-10 py-4 font-semibold text-black transition hover:scale-105 hover:bg-emerald-400"
      >
        Enquire Now
      </Link>

      <Link
        to="/"
        className="rounded-full border border-white/30 px-10 py-4 font-semibold text-white transition hover:bg-white hover:text-black"
      >
        Browse Properties
      </Link>

    </div>

  </div>

</section>

{/* Footer */}

<footer className="bg-black py-10">

  <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-center md:flex-row">

    <div>

      <h2 className="text-2xl font-bold text-white">
        GO REALTORS
      </h2>

      <p className="mt-2 text-gray-400">
        Your Trusted Real Estate Partner
      </p>

    </div>

    <div className="flex gap-8 text-gray-400">

      <Link to="/" className="hover:text-emerald-400">
        Home
      </Link>

      <Link to="/about" className="hover:text-emerald-400">
        About
      </Link>

      <Link to="/search" className="hover:text-emerald-400">
        Properties
      </Link>

      <Link to="/signup" className="hover:text-emerald-400">
        Enquiry
      </Link>

    </div>

  </div>

</footer>

</main>
);
}