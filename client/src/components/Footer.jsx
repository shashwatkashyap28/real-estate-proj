import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0b1a14] border-t border-[#1b382d] text-gray-300">
      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company */}
          <div>
            <Link to="/">
              <h2 className="text-4xl font-black tracking-widest uppercase">
                <span className="text-[#EFE9DD]">GO</span>
                <span className="text-[#B8925A]  ml-1">REALTORS</span>
              </h2>
            </Link>
            <p className="mt-6 leading-8 text-gray-400">
              Go Realtors is a trusted real estate platform helping buyers,
              sellers and investors discover premium residential and
              commercial properties across India.
            </p>
            <p className="mt-6 text-[#B8925A]  italic font-semibold">
              "Your Dream Property, Our Commitment."
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold text-[#B8925A]  mb-6">
              Quick Links
            </h3>
            <div className="flex flex-col gap-4 text-gray-400">
              <Link
                to="/"
                className="hover:text-[#B8925A]  transition"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="hover:text-[#B8925A]  transition"
              >
                About
              </Link>
              <Link
                to="/signin"
                className="hover:text-[#B8925A]  transition"
              >
                Services
              </Link>
              <Link
                to="/signup"
                className="hover:text-[#B8925A]  transition"
              >
                Enquiry
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <Link
              to="/properties"
              className="text-2xl font-bold text-[#B8925A]  mb-6 block hover:text-[#B8925A]  transition"
            >
              Properties
            </Link>
            <div className="flex flex-col gap-4 text-gray-400">
              <p className="hover:text-[#d4af37] cursor-pointer transition">Residential Properties</p>
              <p className="hover:text-[#d4af37] cursor-pointer transition">Commercial Properties</p>
              <p className="hover:text-[#d4af37] cursor-pointer transition">Luxury Villas</p>
              <p className="hover:text-[#d4af37] cursor-pointer transition">Rental Properties</p>
              <p className="hover:text-[#d4af37] cursor-pointer transition">NRI Property Services</p>
              <p className="hover:text-[#d4af37] cursor-pointer transition">Investment Consulting</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-2xl font-bold text-[#B8925A]  mb-6">
              Contact
            </h3>
            <div className="space-y-5">
              <div className="flex gap-3">
                <FaMapMarkerAlt className="text-[#B8925A]  mt-1 flex-shrink-0" />
                <p className="text-gray-400">
                  Sector 67,
                  <br />
                  Gurugram,
                  <br />
                  Haryana, India
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <FaEnvelope className="text-[#B8925A] flex-shrink-0" />
                <p className="text-gray-400">info@gorealtors.com</p>
              </div>
              <div className="flex gap-3 items-center">
                <FaPhoneAlt className="text-[#B8925A]  flex-shrink-0" />
                <p className="text-gray-400">+91 98765 43210</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-[#1b382d] bg-[#10241c] text-gray-300 flex items-center justify-center hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-[#1b382d] bg-[#10241c] text-gray-300 flex items-center justify-center hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] transition"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-[#1b382d] bg-[#10241c] text-gray-300 flex items-center justify-center hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-[#1b382d] bg-[#10241c] text-gray-300 flex items-center justify-center hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] transition"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#1b382d] bg-[#07130e]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Go Realtors. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-[#B8925A] transition">
              Privacy Policy
            </Link>
            <Link to="/" className="hover:text-[#d4af37] transition">
              Terms & Conditions
            </Link>
            <Link to="/" className="hover:text-[#d4af37] transition">
              Disclaimer
            </Link>
          </div>
          <p>info@gorealtors.com</p>
        </div>
      </div>
    </footer>
  );
}