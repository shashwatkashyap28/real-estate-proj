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
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-gold-400/40 shadow-lg shadow-black/5">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:scale-105 transition duration-300"
        >
          <h1 className="text-3xl font-black tracking-widest uppercase">
            <span className="text-charcoal">GO</span>
            <span className="text-gold-600 ml-2">REALTORS</span>
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            to="/"
            className="text-charcoal hover:text-gold-600 transition font-semibold tracking-wide"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-charcoal hover:text-gold-600 transition font-semibold tracking-wide"
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
              className="text-charcoal group-hover:text-gold-600 transition font-semibold tracking-wide flex items-center gap-1.5"
            >
              Properties
              <FaChevronDown 
                size={12} 
                className="transition-transform duration-300 group-hover:rotate-180 text-charcoal/50 group-hover:text-gold-600" 
              />
            </Link>

            {/* Dropdown Menu Box */}
            <div
              className={`absolute top-[75px] left-1/2 -translate-x-1/2 w-56 bg-white border border-gold-200 rounded-2xl p-2 shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300 origin-top ${
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
                  className="block px-4 py-3 rounded-xl text-sm font-medium text-charcoal/70 hover:text-charcoal hover:bg-gold-100 transition duration-200"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/signin"
            className="text-charcoal hover:text-gold-600 transition font-semibold tracking-wide"
          >
            Services
          </Link>

          <Link
            to="/signup"
            className="text-charcoal hover:text-gold-600 transition font-semibold tracking-wide"
          >
            Contact
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="hidden md:flex items-center bg-white rounded-full px-4 py-2 shadow-md border border-gold-200">
            <input
              type="text"
              placeholder="Search properties..."
              className="bg-transparent outline-none text-sm w-56 placeholder-gray-500 text-black"
            />
            <FaSearch className="text-gray-600 cursor-pointer hover:text-gold-600 transition" />
          </div>

          {/* CTA */}
          <Link
            to="/properties"
            className="bg-gradient-to-r from-gold-500 to-gold-400 text-charcoal font-semibold px-6 py-3 rounded-full hover:from-gold-400 hover:to-gold-300 transition duration-300 shadow-lg shadow-gold-500/30"
          >
            Explore
          </Link>
        </div>

      </div>
    </header>
  );
}