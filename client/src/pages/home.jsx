import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link , useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import {
  FaHandshake,
  FaGlobe,
  FaHeadset,
  FaCompass,
  FaGavel,
  FaHome,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

// ---- palette (matches Header.jsx) ----
// ink        #0E211B   page background
// ink-panel  #132A22   header / sidebar / dark cards
// parchment  #EFE9DD   primary text on dark
// brass      #B8925A   accent, CTAs
// brass-lt   #D9B383   hover state

const properties = [
  {
    id: 1,
    title: "Luxury Villa",
    location: "Beverly Hills, California",
    price: "$2.4M",
    img: "https://picsum.photos/600/400?random=1",
  },
  {
    id: 2,
    title: "Modern Apartment",
    location: "New York City",
    price: "$1.2M",
    img: "https://picsum.photos/600/400?random=2",
  },
  {
    id: 3,
    title: "Eco House",
    location: "Portland",
    price: "$980K",
    img: "https://picsum.photos/600/400?random=3",
  },
];

const collections = [
  {
    title: "New Projects",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Ready to Move",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Luxury",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Budget Friendly",
    img: "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Condominiums",
    img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Builder Floors",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "For Bachelors",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Row Houses",
    img: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80",
  },
];

const cities = [
  {
    id: 1,
    name: "Bangalore",
    properties: "1218",
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800",
  },
  {
    id: 2,
    name: "Hyderabad",
    properties: "251",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
  },
  {
    id: 3,
    name: "Pune",
    properties: "1639",
    image:
      "https://imgs.search.brave.com/VEcMWuyDnOIFhaFa0JdwsALGFd45Wy20Mm9F-QQu0Vw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9k/L2RmL1Bhbm9yYW1h/X29mX1B1bmVfSnVu/Y3Rpb24uanBn",
  },
  {
    id: 4,
    name: "Kolkata",
    properties: "375",
    image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800",
  },
  {
    id: 5,
    name: "Delhi",
    properties: "2400",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
  },
  {
    id: 6,
    name: "Mumbai",
    properties: "3200",
    image: "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=800",
  },
];

const services = [
  {
    icon: <FaHandshake />,
    title: "Real Estate Consulting",
    desc: "Professional consultation for buying, selling and investing in premium residential and commercial properties.",
  },
  {
    icon: <FaHome />,
    title: "Home Loan Consultation",
    desc: "Get the best home loan offers from leading banks with complete guidance from our experts.",
  },
  {
    icon: <FaGlobe />,
    title: "NRI Services",
    desc: "Dedicated support for NRIs looking to invest in Indian real estate with hassle-free documentation.",
  },
  {
    icon: <FaHeadset />,
    title: "After Sales Assistance",
    desc: "We continue supporting our customers even after the purchase with documentation and maintenance.",
  },
  {
    icon: <FaCompass />,
    title: "Vastu Consultation",
    desc: "Expert vastu consultation to help you choose homes with positive energy and better living.",
  },
  {
    icon: <FaGavel />,
    title: "Legal Consultation",
    desc: "Legal verification of property documents and complete assistance for safe transactions.",
  },
];

// FIX: "Buy Property by State" already used {name, link} objects, but
// "Buy Property by City" and "Curated Collections" were plain strings.
// SidebarMenu always reads item.name / item.link, so those two sections
// rendered blank. Normalized everything to the same {name, link} shape.
const stateLinks = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Delhi", "Jammu & Kashmir", "Andaman & Nicobar",
  "Chandigarh", "Dadra & Nagar Haveli", "Daman & Diu", "Lakshadweep",
  "Puducherry",
].map((name) => ({
  name,
  link: `/search?searchTerm=${encodeURIComponent(name)}`,
}));

const cityLinks = [
  "Mumbai", "Bangalore", "Gurgaon", "Pune", "Noida", "Kolkata", "Goa",
  "Chennai", "Hyderabad", "Ahmedabad", "Faridabad", "Chandigarh",
  "Lucknow", "Jaipur",
].map((name) => ({
  name,
  link: `/search?searchTerm=${encodeURIComponent(name)}`,
}));

const collectionLinks = [
  "Luxury Villas", "Apartments", "Farm Houses", "Beach Homes",
].map((name) => ({
  name,
  link: `/search?searchTerm=${encodeURIComponent(name)}`,
}));

export default function Home() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search query
  const navigate = useNavigate(); // Initialize useNavigate
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/search?searchTerm=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="flex min-h-screen bg-[#0E211B] text-[#EFE9DD]">
      {/* ================= RIGHT SIDEBAR ================= */}
      <motion.aside
        initial={{ x: 400 }}
        animate={{ x: open ? 0 : 400 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        // FIX: w-360px is not a valid Tailwind class (needs bracket syntax).
        // It was silently ignored, so the panel had no defined width.
        className="fixed right-0 top-0 z-50 h-screen w-[360px] overflow-y-auto bg-[#132A22] shadow-2xl border-l border-[#B8925A]/20"
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-serif font-bold text-[#EFE9DD]">
              India
            </h2>

            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B8925A] text-[#0E211B] text-2xl hover:bg-[#D9B383] transition-colors"
            >
              ✕
            </button>
          </div>

          <hr className="my-8 border-[#B8925A]/20" />

          {/* Menu */}
          <div className="space-y-7">
            <SidebarMenu title="Buy Property by State" items={stateLinks} />
            <SidebarMenu title="Buy Property by City" items={cityLinks} />
            <SidebarMenu title="Curated Collections" items={collectionLinks} />
          </div>

          <hr className="my-8 border-[#B8925A]/20" />

          <div className="space-y-6 text-xl text-[#EFE9DD]/80">
            <p className="hover:text-[#B8925A] transition-colors cursor-pointer">NRI Services</p>
            <p className="hover:text-[#B8925A] transition-colors cursor-pointer">News</p>
            <p className="hover:text-[#B8925A] transition-colors cursor-pointer">Events</p>
            <p className="hover:text-[#B8925A] transition-colors cursor-pointer">Blogs</p>
            <p className="hover:text-[#B8925A] transition-colors cursor-pointer">Area Calculator</p>
            <p className="hover:text-[#B8925A] transition-colors cursor-pointer">Research</p>
          </div>

          <hr className="my-8 border-[#B8925A]/20" />

          <div className="space-y-6 text-xl text-[#EFE9DD]/80">
            <p className="hover:text-[#B8925A] transition-colors cursor-pointer">About</p>
            <p className="hover:text-[#B8925A] transition-colors cursor-pointer">Awards</p>
            <p className="hover:text-[#B8925A] transition-colors cursor-pointer">Careers</p>
            <p className="hover:text-[#B8925A] transition-colors cursor-pointer">Terms</p>
            <p className="hover:text-[#B8925A] transition-colors cursor-pointer">Sitemap</p>
            <p className="hover:text-[#B8925A] transition-colors cursor-pointer">Privacy</p>
            <p className="hover:text-[#B8925A] transition-colors cursor-pointer">FAQs</p>
            <p className="hover:text-[#B8925A] transition-colors cursor-pointer">Contact</p>
          </div>

          <hr className="my-8 border-[#B8925A]/20" />

          <div>
            <h3 className="text-2xl font-serif font-semibold text-[#EFE9DD]">
              Need any help?
            </h3>
            <p className="mt-3 text-[#EFE9DD]/60">
              Contact our property experts anytime.
            </p>
          </div>
        </div>
      </motion.aside>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-[#0E211B]/70"
        />
      )}

      {/* ================= MAIN ================= */}
      <main className="flex-1 overflow-y-auto">
        {!open && (
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="fixed right-8 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#132A22] border border-[#B8925A]/40 text-xl text-[#EFE9DD] shadow-lg transition hover:border-[#B8925A] hover:scale-105"
          >
            ☰
          </button>
        )}

        {/* ================= HERO ================= */}
        <section className="relative flex h-screen items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            alt="Modern house exterior"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E211B]/80 via-[#0E211B]/85 to-[#0E211B]" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center px-6"
          >
            <span className="rounded-full bg-[#B8925A]/15 border border-[#B8925A]/40 px-5 py-2 text-[#D9B383] text-sm tracking-wide">
              Premium Real Estate Platform
            </span>

            <h1 className="mt-6 font-serif text-5xl font-bold md:text-7xl text-[#EFE9DD]">
              Find Your
              <br />
              Perfect Place
              <span className="text-[#B8925A]"> To Live</span>
            </h1>

            <p className="mt-6 text-[#EFE9DD]/60">
              Modern homes, villas & apartments worldwide.
            </p>

            {/* MATCHED HEADER SEARCH BAR */}
            <form onSubmit={handleSearchSubmit} className="mt-10 w-full max-w-2xl">
              <div className="flex flex-col gap-4 rounded-2xl bg-[#132A22] border border-[#B8925A]/25 p-3 md:flex-row md:items-center">
                <div className="flex flex-1 items-center gap-3 rounded-xl bg-[#0E211B] px-4 py-3.5 border border-[#B8925A]/15">
                  <FaMapMarkerAlt className="text-[#B8925A]" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by city, address, or zip..."
                    className="w-full bg-transparent outline-none text-[#EFE9DD] placeholder:text-[#EFE9DD]/40"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-xl bg-[#B8925A] px-8 py-4 font-semibold text-[#0E211B] hover:bg-[#D9B383] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaSearch />
                  Search
                </button>
              </div>
            </form>
          </motion.div>
        </section>

        {/* ================= FEATURED CITIES ================= */}
        <section className="bg-[#0E211B] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-center font-serif text-5xl font-bold text-[#EFE9DD]">
              Featured <span className="text-[#B8925A]">Cities</span>
            </h2>

            <p className="mt-4 mb-12 text-center text-[#EFE9DD]/50 text-xl">
              Find your dream home in your favourite city
            </p>

            <Swiper
              modules={[Navigation, Autoplay]}
              navigation
              autoplay={{ delay: 3000 }}
              spaceBetween={25}
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
            >
              {cities.map((city) => (
                <SwiperSlide key={city.id}>
                  <div className="overflow-hidden rounded-3xl bg-[#132A22] border border-[#B8925A]/15 shadow-lg">
                    <div className="relative h-72">
                      <img
                        src={city.image}
                        alt={city.name}
                        className="h-full w-full object-cover transition duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-[#0E211B]/40" />
                      <h3 className="absolute inset-0 flex items-center justify-center font-serif text-3xl font-bold text-[#EFE9DD]">
                        {city.name}
                      </h3>
                    </div>

                    <div className="py-6 text-center">
                      <span className="text-[#D9B383] text-xl font-semibold">
                        {city.properties} Properties
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* ================= CURATED COLLECTIONS ================= */}
        <section className="bg-[#0E211B] px-6 py-24">
          <div className="mx-auto mb-12 max-w-7xl text-center">
            <h2 className="font-serif text-4xl font-bold text-[#EFE9DD]">
              Curated <span className="text-[#B8925A]">Collections</span>
            </h2>
            <p className="mt-2 text-[#EFE9DD]/50">
              Explore prime properties based on your preference
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {collections.map((c, i) => (
              <div
                key={i}
                className="group relative h-64 overflow-hidden rounded-2xl border border-[#B8925A]/15"
              >
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#0E211B]/40 group-hover:bg-[#0E211B]/60 transition" />
                <h3 className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-[#EFE9DD]">
                  {c.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* ================= WHY BUY WITH US ================= */}
        <section className="bg-[#0E211B] py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-center font-serif text-5xl font-bold text-[#EFE9DD]">
              Why Buy With Us?
            </h2>

            <p className="mt-4 text-center text-xl text-[#EFE9DD]/50">
              Aspects that make GoRealtor India's leading Real Estate Advisory
            </p>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="rounded-3xl bg-[#EFE9DD] p-10 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="flex justify-center">
                    <div className="text-6xl text-[#132A22]">{service.icon}</div>
                  </div>

                  <h3 className="mt-8 text-center font-serif text-3xl font-bold text-[#132A22]">
                    {service.title}
                  </h3>

                  <p className="mt-6 text-center leading-8 text-[#132A22]/70">
                    {service.desc}
                  </p>

                  <div className="mt-6 text-center">
                    <button className="font-semibold text-[#B8925A] hover:text-[#132A22] transition-colors">
                      Read More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FEATURED PROPERTIES ================= */}
        <section className="mx-auto max-w-7xl px-6 py-24">
          <h2 className="text-center font-serif text-5xl font-bold text-[#EFE9DD]">
            Featured <span className="text-[#B8925A]">Properties</span>
          </h2>

          <p className="text-center mt-2 text-[#EFE9DD]/50">
            Hand-picked homes for you
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="overflow-hidden rounded-3xl bg-[#132A22] border border-[#B8925A]/15 transition hover:-translate-y-2"
              >
                <img src={p.img} alt={p.title} className="h-64 w-full object-cover" />

                <div className="p-6 space-y-3">
                  <h3 className="text-2xl font-semibold text-[#EFE9DD]">{p.title}</h3>
                  <p className="text-[#EFE9DD]/50">{p.location}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#B8925A]">{p.price}</span>

                    <button className="rounded-lg bg-[#B8925A] px-5 py-2 text-[#0E211B] font-semibold hover:bg-[#D9B383] transition-colors">
                      View
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

/* ================= SIDEBAR ITEM ================= */
function SidebarMenu({ title, items }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#B8925A]/15 pb-2">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-xl text-[#EFE9DD] hover:text-[#B8925A] transition-colors"
      >
        <span>{title}</span>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {open && (
        <div className="mt-4 ml-4 flex flex-col gap-3 text-lg text-[#EFE9DD]/70 max-h-64 overflow-y-auto pr-2">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="hover:text-[#B8925A] transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}