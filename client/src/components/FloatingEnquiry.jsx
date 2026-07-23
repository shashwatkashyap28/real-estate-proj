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
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#10241c] border border-[#1b382d] shadow-xl transition-all duration-300 hover:scale-110 hover:border-[#d4af37]"
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
        className="group flex items-center rounded-full bg-[#0b1a14] border border-[#1b382d] px-6 py-3 shadow-2xl transition-all duration-300 hover:scale-105 hover:border-[#d4af37]"
      >
        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#10241c] border border-[#1b382d]">
          <FaEnvelope className="text-[#d4af37] text-lg" />
        </div>

        <div>
          <p className="text-xs text-gray-400">
            Free Consultation
          </p>
          <h2 className="font-semibold text-[#e6c594]">
            Enquire Now!
          </h2>
        </div>
      </Link>
    </div>
  );
}