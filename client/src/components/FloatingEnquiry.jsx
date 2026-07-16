import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

export default function FloatingEnquiry() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/8287461949"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-xl transition-all duration-300 hover:scale-110"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="h-7 w-7"
        />
      </a>

      {/* Enquiry Button */}
      <Link
        to="/signup"
        className="group flex items-center rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-6 py-3 shadow-2xl shadow-gold-500/30 transition-all duration-300 hover:scale-105"
      >
        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/15">
          <FaEnvelope className="text-charcoal text-lg" />
        </div>

        <div>
          <p className="text-xs text-charcoal/70">
            Free Consultation
          </p>

          <h2 className="font-semibold text-charcoal">
            Enquire Now!
          </h2>
        </div>
      </Link>

    </div>
  );
}