import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaHome,
  FaHeart,
  FaUser,
} from "react-icons/fa";
import {
  FaHandshake,
  FaGlobe,
  FaHeadset,
  FaCompass,
  FaGavel,
  FaChevronDown, 
  FaChevronUp
} from "react-icons/fa";

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
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800",
  },
  {
    id: 2,
    name: "Hyderabad",
    properties: "251",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
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
    image:
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800",
  },
  {
    id: 5,
    name: "Delhi",
    properties: "2400",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
  },
  {
    id: 6,
    name: "Mumbai",
    properties: "3200",
    image:
      "https://images.unsplash.com/photo-1562979314-bee7453e911c?w=800",
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



export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-cream text-charcoal">

      {/* ================= RIGHT SIDEBAR ================= */}

<motion.aside
  initial={{ x: 400 }}
  animate={{ x: open ? 0 : 400 }}
  transition={{ duration: 0.35 }}
  className="fixed right-0 top-0 z-50 h-screen w-360px overflow-y-auto bg-white text-charcoal shadow-2xl"
>
  <div className="p-8">

    {/* Header */}
    <div className="flex items-center justify-between">

      <h2 className="text-3xl font-bold">
        India
      </h2>

      <button
        onClick={() => setOpen(false)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-charcoal text-white text-2xl"
      >
        ✕
      </button>

    </div>

    <hr className="my-8 border-charcoal/10" />

    {/* Menu */}

    <div className="space-y-7">

    <SidebarMenu
  title="Buy Property by State"
  items={[
    { name: "Andhra Pradesh", link: "/about" },
    { name: "Arunachal Pradesh", link: "/" },
    { name: "Assam", link: "/" },
    { name: "Bihar", link: "/" },
    { name: "Chhattisgarh", link: "/" },
    { name: "Goa", link: "/" },
    { name: "Gujarat", link: "/" },
    { name: "Haryana", link: "/" },
    { name: "Himachal Pradesh", link: "/" },
    { name: "Jharkhand", link: "/" },
    { name: "Karnataka", link: "/" },
    { name: "Kerala", link: "/" },
    { name: "Madhya Pradesh", link: "/" },
    { name: "Maharashtra", link: "/" },
    { name: "Manipur", link: "/" },
    { name: "Meghalaya", link: "/" },
    { name: "Mizoram", link: "/" },
    { name: "Nagaland", link: "/" },
    { name: "Odisha", link: "/" },
    { name: "Punjab", link: "/" },
    { name: "Rajasthan", link: "/" },
    { name: "Sikkim", link: "/" },
    { name: "Tamil Nadu", link: "/" },
    { name: "Telangana", link: "/" },
    { name: "Tripura", link: "/" },
    { name: "Uttar Pradesh", link: "/" },
    { name: "Uttarakhand", link: "/" },
    { name: "West Bengal", link: "/" },
    { name: "Delhi", link: "/" },
    { name: "Jammu & Kashmir", link: "/" },
    { name: "Andaman & Nicobar", link: "/" },
    { name: "Chandigarh", link: "/" },
    { name: "Dadra & Nagar Haveli", link: "/" },
    { name: "Daman & Diu", link: "/" },
    { name: "Lakshadweep", link: "/" },
    { name: "Puducherry", link: "/" }
  ]}
/>

<SidebarMenu
  title="Buy Property by City"
  items={["Mumbai",
    "Bangalore",
    "Gurgaon",
    "Pune",
   "Noida",
    "Kolkata",
    "Goa",
    "Chennai",
    "Hyderabad",
    "Ahmedabad",
    "Faridabad",
    "Chandigarh",
    "Lucknow",
    "Jaipur"
  ]}
/>

<SidebarMenu
  title="Curated Collections"
  items={[
    "Luxury Villas",
    "Apartments",
    "Farm Houses",
    "Beach Homes",
  ]}
/>

    </div>

    <hr className="my-8 border-charcoal/10" />

    <div className="space-y-6 text-2xl">

      <p>NRI Services</p>
      <p>News</p>
      <p>Events</p>
      <p>Blogs</p>
      <p>Area Calculator</p>
      <p>Research</p>

    </div>

    <hr className="my-8 border-charcoal/10" />

    <div className="space-y-6 text-2xl">

      <p>About</p>
      <p>Awards</p>
      <p>Careers</p>
      <p>Terms</p>
      <p>Sitemap</p>
      <p>Privacy</p>
      <p>FAQs</p>
      <p>Contact</p>

    </div>

    <hr className="my-8 border-charcoal/10" />

    <div>

      <h3 className="text-3xl font-semibold">
        Need any help?
      </h3>

      <p className="mt-4 text-gray-600">
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
    className="fixed inset-0 z-40 bg-black/50"
  />
)}
      {/* ================= MAIN ================= */}
      <main className="flex-1 overflow-y-auto">
      {!open && (
  <button
    onClick={() => setOpen(true)}
    className="fixed right-8 top-3 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-transparent text-2xl text-white shadow-lg transition hover:scale-105"
  >
    ☰
  </button>
)}
        {/* ================= HERO ================= */}
        <section className="relative flex h-screen items-center justify-center">

          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-40"
            alt="house"
          />

          <div className="absolute inset-0 bg-black/80" />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center px-6 text-white"
          >
            <span className="rounded-full bg-green-500/20 px-5 py-2 text-green-300">
              Premium Real Estate Platform
            </span>

            <h1 className="mt-6 text-5xl font-bold md:text-7xl">
              Find Your
              <br />
              Perfect Place
              <span className="text-green-400"> To Live</span>
            </h1>

            <p className="mt-6 text-gray-300">
              Modern homes, villas & apartments worldwide.
            </p>

            {/* SEARCH */}
            <form className="mt-10 w-full max-w-2xl">
              <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 backdrop-blur-xl md:flex-row">

                <div className="flex flex-1 items-center gap-3 rounded-xl bg-white/10 px-4">
                  <FaMapMarkerAlt className="text-green-400" />
                  <input
                    className="w-full bg-transparent py-4 outline-none placeholder:text-gray-400"
                    placeholder="Search city..."
                  />
                </div>

                <button className="rounded-xl bg-green-500 px-8 py-4 font-semibold text-black hover:bg-green-400">
                  <FaSearch className="mr-2 inline" />
                  Search
                </button>

              </div>
            </form>
          </motion.div>
        </section>
        <section className="bg-cream py-20">

  <div className="mx-auto max-w-7xl px-6">

    <h2 className="text-center text-5xl text-charcoal font-bold">
      Featured  <span className="text-green-400">Cities</span>
    </h2>
    

    <p className="mt-4 mb-12 text-center text-gray-600 text-xl">
      Find your dream home in your favourite city
    </p>

    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{
        delay: 3000,
      }}
      spaceBetween={25}
      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
    >
      {cities.map((city) => (
        <SwiperSlide key={city.id}>

          <div className="overflow-hidden rounded-3xl bg-white shadow-lg">

            <div className="relative h-72">

              <img
                src={city.image}
                className="h-full w-full object-cover transition duration-500 hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/40" />

              <h3 className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
                {city.name}
              </h3>

            </div>

            <div className="py-6 text-center">

              <span className="text-black text-xl font-semibold">
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
        <section className="bg-ivory px-6 py-24">

          <div className="mx-auto mb-12 max-w-7xl text-center">
            <h2 className="text-4xl font-bold">
              Curated <span className="text-green-400">Collections</span>
            </h2>
            <p className="mt-2 text-gray-600">
              Explore prime properties based on your preference
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {collections.map((c, i) => (
              <div
                key={i}
                className="group relative h-64 overflow-hidden rounded-2xl"
              >
                <img
                  src={c.img}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition" />

                <h3 className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white">
                  {c.title}
                </h3>
              </div>
            ))}

          </div>
        </section>
        <section className="bg-cream py-24">

  <div className="mx-auto max-w-7xl px-6">

    <h2 className="text-center text-5xl font-bold ">
      Why Buy With Us?
    </h2>

    <p className="mt-4 text-center text-xl text-gray-600">
      Aspects that make GoRealtor India's leading Real Estate Advisory
    </p>

    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

      {services.map((service, index) => (

        <div
          key={index}
          className="rounded-3xl bg-white p-10 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >

          <div className="flex justify-center">

            <div className="text-6xl text-black">
              {service.icon}
            </div>

          </div>

          <h3 className="mt-8 text-center text-3xl font-bold">
            {service.title}
          </h3>

          <p className="mt-6 text-center leading-8 text-gray-600">
            {service.desc}
          </p>

          <div className="mt-6 text-center">

            <button className="font-semibold text-green-500 hover:text-black">
              Read More →
            </button>

          </div>

        </div>

      ))}

    </div>

  </div>

</section>
        
        {/* ================= FEATURED ================= */}
        <section className="mx-auto max-w-7xl px-6 py-24">

          <h2 className="text-center text-5xl text-charcoal font-bold">
            Featured <span className="text-green-400">Properties</span>
          </h2>

          <p className="text-center mt-2 text-gray-600">
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
                className="overflow-hidden rounded-3xl bg-white border border-gold-100 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
              >
                <img src={p.img} className="h-64 w-full object-cover" />

                <div className="p-6 space-y-3">

                  <h3 className="text-2xl font-semibold">{p.title}</h3>
                  <p className="text-gray-600">{p.location}</p>

                  <div className="flex items-center justify-between">

                    <span className="text-2xl font-bold text-green-400">
                      {p.price}
                    </span>

                    <button className="rounded-lg bg-green-500 px-5 py-2 text-black hover:bg-green-400">
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
    <div className="border-b border-white/10 pb-2">

<button
  type="button"
  onClick={() => setOpen(!open)}
  className="flex w-full items-center justify-between text-xl hover:text-green-400 transition"
>
        <span>{title}</span>

        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {open && (
        <div className="mt-4 ml-4 flex flex-col gap-3 text-lg text-gray-300">

{items.map((item, index) => (
  <Link
    key={index}
    to={item.link}
    className="cursor-pointer hover:text-green-400 transition"
  >
    {item.name}
  </Link>
))}
        </div>
      )}

    </div>
  );
}