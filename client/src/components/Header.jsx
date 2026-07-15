import { FaSearch, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10 shadow-xl">
      <div className="max-w-7xl mx-auto px-1 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:scale-105 transition duration-300"
        >
          <h1 className="text-3xl font-black tracking-widest uppercase">
            <span className="text-white">GO</span>
            <span className="text-emerald-400 ml-2">REALTORS</span>
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">

          <Link
            to="/"
            className="text-white hover:text-emerald-400 transition font-semibold tracking-wide"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-white hover:text-emerald-400 transition font-semibold tracking-wide"
          >
            About
          </Link>

          <Link
            to="/properties"
            className="text-white hover:text-emerald-400 transition font-semibold tracking-wide"
          >
            Properties
          </Link>

          <Link
            to="/signin"
            className="text-white hover:text-emerald-400 transition font-semibold tracking-wide"
          >
            Services
          </Link>

          <Link
            to="/signup"
            className="text-white hover:text-emerald-400 transition font-semibold tracking-wide"
          >
            Contact
          </Link>

        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          {/* Search */}
          <div className="hidden md:flex items-center bg-white rounded-full px-4 py-2 shadow-lg">

            <input
              type="text"
              placeholder="Search properties..."
              className="bg-transparent outline-none text-sm w-56 placeholder-gray-500"
            />

            <FaSearch className="text-gray-600 cursor-pointer hover:text-emerald-500 transition" />

          </div>

          

          {/* CTA */}
          <Link
            to="/properties"
            className="bg-emerald-500 text-black font-semibold px-6 py-3 rounded-full hover:bg-emerald-400 transition duration-300 shadow-lg"
          >
            Explore
          </Link>

        </div>

      </div>
    </header>
  );
}