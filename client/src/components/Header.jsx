import { useState } from "react";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Categories for the properties dropdown menu
  const categories = [
    { name: "All Properties", path: "/properties?type=All" },
    { name: "Residential Villa", path: "/properties?type=Villa" },
    { name: "Skyline Apartment", path: "/properties?type=Apartment" },
    { name: "Luxury Penthouse", path: "/properties?type=Luxury" },
    { name: "Commercial Office", path: "/properties?type=Commercial" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
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

          {/* ================= INTERACTIVE PROPERTIES DROPDOWN ================= */}
          <div
            className="relative h-20 flex items-center cursor-pointer group"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link
              to="/properties"
              className="text-white group-hover:text-emerald-400 transition font-semibold tracking-wide flex items-center gap-1.5"
            >
              Properties
              <FaChevronDown 
                size={12} 
                className="transition-transform duration-300 group-hover:rotate-180 text-gray-400 group-hover:text-emerald-400" 
              />
            </Link>

            {/* Dropdown Menu Box */}
            <div
              className={`absolute top-[75px] left-1/2 -translate-x-1/2 w-56 bg-zinc-950 border border-zinc-800 rounded-2xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-300 origin-top ${
                isDropdownOpen
                  ? "opacity-100 visible scale-100 pointer-events-auto"
                  : "opacity-0 invisible scale-95 pointer-events-none"
              }`}
            >
              {categories.map((cat, index) => (
                <Link
                  key={index}
                  to={cat.path}
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-black hover:bg-emerald-400 transition duration-200"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

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
              className="bg-transparent outline-none text-sm w-56 placeholder-gray-500 text-black"
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