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
    <footer className="bg-charcoal border-t border-gold-800/40 text-gray-300">

      {/* Top */}

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Company */}

          <div>

            <Link to="/">

              <h2 className="text-4xl font-black tracking-widest uppercase">

                <span className="text-white">GO</span>

                <span className="text-green-500 ml-1">REALTORS</span>

              </h2>

            </Link>

            <p className="mt-6 leading-8 text-gray-400">

              Go Realtors is a trusted real estate platform helping buyers,
              sellers and investors discover premium residential and
              commercial properties across India.

            </p>

            <p className="mt-6 text-green-500 italic font-semibold">

              "Your Dream Property, Our Commitment."

            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-2xl font-bold text-white mb-6">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4">

              <Link
                to="/"
                className="hover:text-green-500 transition"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="hover:text-green-500 transition"
              >
                About
              </Link>

              <Link
                to="/signin"
                className="hover:text-green-500 transition"
              >
                Services
              </Link>

              <Link
                to="/signup"
                className="hover:text-green-500 transition"
              >
                Enquiry
              </Link>

            </div>

          </div>

          {/* Services */}

          <div>

          <Link
                to="/properties"
                className="text-2xl font-bold mb-6 p-1 `  hover:text-green-500 transition"
              >
                Properties
              </Link>

            <div className="flex flex-col gap-4 text-gray-400">

              <p>Residential Properties</p>

              <p>Commercial Properties</p>

              <p>Luxury Villas</p>

              <p>Rental Properties</p>

              <p>NRI Property Services</p>

              <p>Investment Consulting</p>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-2xl font-bold text-white mb-6">
              Contact
            </h3>

            <div className="space-y-5">

              <div className="flex gap-3">

                <FaMapMarkerAlt className="text-green-500 mt-1" />

                <p className="text-gray-400">
                  Sector 67,
                  <br />
                  Gurugram,
                  <br />
                  Haryana, India
                </p>

              </div>

              <div className="flex gap-3 items-center">

                <FaEnvelope className="text-green-500" />

                <p>info@gorealtors.com</p>

              </div>

              <div className="flex gap-3 items-center">

                <FaPhoneAlt className="text-green-500" />

                <p>+91 98765 43210</p>

              </div>

            </div>

            {/* Social Icons */}

            <div className="flex gap-4 mt-8">

              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gold-700/60 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 hover:text-charcoal transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gold-700/60 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 hover:text-charcoal transition"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gold-700/60 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 hover:text-charcoal transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gold-700/60 flex items-center justify-center hover:bg-gold-500 hover:border-gold-500 hover:text-charcoal transition"
              >
                <FaWhatsapp />
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-gold-800/40">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">

          <p>

            © {new Date().getFullYear()} Go Realtors. All Rights Reserved.

          </p>

          <div className="flex gap-6">

            <Link
              to="/"
              className="hover:text-green-500 transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/"
              className="hover:text-green-500 transition"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/"
              className="hover:text-green-500 transition"
            >
              Disclaimer
            </Link>

          </div>

          <p>

            info@gorealtors.com

          </p>

        </div>

      </div>

    </footer>
  );
}