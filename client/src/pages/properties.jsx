import { useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaCar,
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaFilter,
  FaPlus,
  FaTimes
} from "react-icons/fa";
import { Link } from "react-router-dom";

const initialProperties = [
  {
    id: 1,
    title: "Luxury Villa",
    city: "New Delhi",
    location: "Vasant Kunj",
    type: "Villa",
    price: 32000000,
    beds: 5,
    baths: 4,
    parking: 3,
    rating: 4.9,
    area: "5200 Sq.ft",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    ],
    amenities: ["Swimming Pool", "Gym", "Garden", "Club House"],
  },
  {
    id: 2,
    title: "Skyline Apartment",
    city: "Gurgaon",
    location: "Sector 65",
    type: "Apartment",
    price: 11800000,
    beds: 3,
    baths: 2,
    parking: 2,
    rating: 4.8,
    area: "2150 Sq.ft",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      "https://images.unsplash.com/photo-1494526585095-c41746248156",
    ],
    amenities: ["Lift", "Security", "Gym", "Power Backup"],
  },
  {
    id: 3,
    title: "Commercial Office",
    city: "Noida",
    location: "Sector 62",
    type: "Commercial",
    price: 18900000,
    beds: 0,
    baths: 2,
    parking: 6,
    rating: 4.7,
    area: "4000 Sq.ft",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
      "https://images.unsplash.com/photo-1497366412874-3415097a27e7",
    ],
    amenities: ["Reception", "Parking", "Conference", "Security"],
  },
  {
    id: 4,
    title: "Luxury Penthouse",
    city: "Mumbai",
    location: "Bandra",
    type: "Luxury",
    price: 55000000,
    beds: 4,
    baths: 5,
    parking: 3,
    rating: 5.0,
    area: "6800 Sq.ft",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
    ],
    amenities: ["Infinity Pool", "Private Lift", "Gym", "Sky Lounge"],
  },
];

export default function Properties() {
  const [propertiesList, setPropertiesList] = useState(initialProperties);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [currentImage, setCurrentImage] = useState({});
  
  // New State triggers for modal & new listing fields
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newProperty, setNewProperty] = useState({
    title: "",
    city: "",
    location: "",
    type: "Villa",
    price: "",
    beds: "",
    baths: "",
    parking: "",
    area: "",
    amenities: "",
  });

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  const handleSubmitListing = (e) => {
    e.preventDefault();
    
    const preparedListing = {
      id: propertiesList.length + 1,
      title: newProperty.title,
      city: newProperty.city,
      location: newProperty.location,
      type: newProperty.type,
      price: Number(newProperty.price) || 0,
      beds: Number(newProperty.beds) || 0,
      baths: Number(newProperty.baths) || 0,
      parking: Number(newProperty.parking) || 0,
      rating: 5.0,
      area: newProperty.area ? `${newProperty.area} Sq.ft` : "0 Sq.ft",
      featured: false,
      // Default placeholder images if none are supplied
      images: [
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
      ],
      amenities: newProperty.amenities
        ? newProperty.amenities.split(",").map((item) => item.trim())
        : ["Water Supply", "Power Backup"],
    };

    setPropertiesList([preparedListing, ...propertiesList]);
    setIsFormOpen(false); // Close modal/form view
    
    // Reset form fields
    setNewProperty({
      title: "",
      city: "",
      location: "",
      type: "Villa",
      price: "",
      beds: "",
      baths: "",
      parking: "",
      area: "",
      amenities: "",
    });
  };

  const filteredProperties = propertiesList.filter((property) => {
    return (
      property.title.toLowerCase().includes(search.toLowerCase()) &&
      property.city.toLowerCase().includes(city.toLowerCase()) &&
      (type === "All" || property.type === type)
    );
  });

  return (
    <main className="min-h-screen bg-[#0E211B] text-[#EFE9DD]">
      {/* HERO */}
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E211B]/60 via-[#0E211B]/80 to-[#0E211B]"></div>
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="max-w-3xl">
            <span className="rounded-full border border-[#B8925A] bg-[#B8925A]/10 px-5 py-2 text-[#D9B383]">
              Premium Collection
            </span>
            <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
              Find Your
              <span className="text-[#B8925A]"> Dream Property</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#EFE9DD]/70">
              Explore luxury villas, premium apartments, commercial offices and investment opportunities across India's most desirable locations.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH BAR & ADD BUTTON */}
      <section className="-mt-14 relative z-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl border border-[#B8925A]/20 bg-[#132A22]/90 backdrop-blur-xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6 items-center">
              {/* Search */}
              <div className="relative lg:col-span-2">
                <FaSearch className="absolute left-5 top-5 text-[#EFE9DD]/40" />
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-[#B8925A]/25 bg-[#0E211B] py-4 pl-14 pr-4 outline-none transition focus:border-[#B8925A]"
                />
              </div>

              {/* City */}
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="py-4 rounded-2xl border border-[#B8925A]/25 bg-[#0E211B] px-5 outline-none transition focus:border-[#B8925A]"
              />

              {/* Property Type */}
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="py-4 rounded-2xl border border-[#B8925A]/25 bg-[#0E211B] px-5 outline-none transition focus:border-[#B8925A] text-[#EFE9DD]/50"
              >
                <option>All</option>
                <option>Villa</option>
                <option>Apartment</option>
                <option>Luxury</option>
                <option>Commercial</option>
              </select>

              {/* Search Button */}
              <button className="py-4 px-5 rounded-2xl bg-[#B8925A] font-bold text-[#0E211B] transition hover:bg-[#D9B383]">
                Search
              </button>



            </div>
          </div>
        </div>
      </section>

    

      {/* MAIN CONTENT */}
      <section className="mx-auto mt-16 max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
          {/* SIDEBAR */}
          <aside className="sticky top-24 h-fit rounded-3xl border border-[#B8925A]/15 bg-[#132A22] p-8">
            <div className="flex items-center gap-3">
              <FaFilter className="text-[#B8925A]" />
              <h2 className="text-2xl font-bold">Filters</h2>
            </div>
            {/* Price */}
            <div className="mt-10">
              <label className="font-semibold">Budget</label>
              <input
                type="range"
                min="1000000"
                max="60000000"
                className="mt-5 w-full accent-green-500"
              />
              <div className="mt-4 flex justify-between text-sm text-[#EFE9DD]/50">
                <span>₹10L</span>
                <span>₹6Cr+</span>
              </div>
            </div>
            {/* Bedrooms */}
            <div className="mt-10">
              <label className="font-semibold">Bedrooms</label>
              <div className="mt-5 flex flex-wrap gap-3">
                {[1, 2, 3, 4, 5].map((bed) => (
                  <button
                    key={bed}
                    className="rounded-xl border border-[#B8925A]/25 px-5 py-2 transition hover:border-[#B8925A] hover:bg-[#B8925A] hover:text-[#0E211B]"
                  >
                    {bed}+
                  </button>
                ))}
              </div>
            </div>
            {/* Property Status */}
            <div className="mt-10">
              <label className="font-semibold">Status</label>
              <div className="mt-5 space-y-4">
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="accent-green-500" /> Ready To Move
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="accent-green-500" /> Under Construction
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="accent-green-500" /> New Launch
                </label>
              </div>
            </div>
            {/* Amenities */}
            <div className="mt-10">
              <label className="font-semibold">Amenities</label>
              <div className="mt-5 flex flex-wrap gap-3">
                {["Pool", "Gym", "Parking", "Lift", "Garden", "Security"].map((item) => (
                  <span
                    key={item}
                    className="cursor-pointer rounded-full border border-[#B8925A]/30 bg-[#B8925A]/10 px-4 py-2 text-sm text-[#D9B383] transition hover:bg-[#B8925A] hover:text-[#0E211B]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT SIDE */}
          <div>
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-bold">Featured Properties</h2>
                <p className="mt-2 text-[#EFE9DD]/50">
                  {filteredProperties.length} Premium Listings Available
                </p>
              </div>
              <select className="rounded-xl border border-[#B8925A]/25 bg-[#132A22] px-5 py-3">
                <option>Newest</option>
                <option>Price Low</option>
                <option>Price High</option>
                <option>Top Rated</option>
              </select>
            </div>

            {/* PROPERTY GRID */}
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredProperties.map((property) => (
                <div
                  key={property.id}
                  className="group overflow-hidden rounded-3xl border border-[#B8925A]/15 bg-gradient-to-b from-[#132A22] to-[#0E211B] shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#B8925A] hover:shadow-[0_20px_60px_rgba(184,146,90,0.25)]"
                >
                  {/* IMAGE */}
                  <div className="relative overflow-hidden">
                    <img
                      src={property.images[currentImage[property.id] || 0]}
                      alt={property.title}
                      className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E211B] via-transparent to-transparent"></div>
                    {/* Featured */}
                    {property.featured && (
                      <span className="absolute left-4 top-4 rounded-full bg-[#B8925A] px-4 py-2 text-xs font-bold text-[#0E211B]">
                        FEATURED
                      </span>
                    )}
                    {/* Wishlist */}
                    <button
                      onClick={() => toggleWishlist(property.id)}
                      className="absolute right-4 top-4 rounded-full bg-[#0E211B]/70 p-3 backdrop-blur-lg transition hover:scale-110"
                    >
                      <FaHeart className={`${wishlist.includes(property.id) ? "text-red-500" : "text-[#EFE9DD]"}`} />
                    </button>
                    {/* Image Slider Controls */}
                    <button
                      onClick={() =>
                        setCurrentImage({
                          ...currentImage,
                          [property.id]: currentImage[property.id] > 0 ? currentImage[property.id] - 1 : property.images.length - 1,
                        })
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-[#0E211B]/60 p-3 opacity-0 transition group-hover:opacity-100"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImage({
                          ...currentImage,
                          [property.id]: currentImage[property.id] < property.images.length - 1 ? (currentImage[property.id] || 0) + 1 : 0,
                        })
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-[#0E211B]/60 p-3 opacity-0 transition group-hover:opacity-100"
                    >
                      <FaChevronRight />
                    </button>
                  </div>

                  {/* CONTENT INFO */}
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold truncate max-w-[70%]">{property.title}</h3>
                      <div className="flex items-center gap-1 rounded-full bg-[#B8925A]/20 px-3 py-1">
                        <FaStar className="text-[#D9B383]" />
                        <span className="font-semibold">{property.rating}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center text-[#EFE9DD]/50 text-sm">
                      <FaMapMarkerAlt className="mr-2 text-[#B8925A] flex-shrink-0" />
                      <span className="truncate">{property.location}, {property.city}</span>
                    </div>
                    <h2 className="mt-5 text-4xl font-bold text-[#B8925A]">
                      ₹ {(property.price / 10000000).toFixed(2)} Cr
                    </h2>
                    <p className="mt-2 text-[#EFE9DD]/40">{property.area}</p>

                    {/* PROPERTY DETAILS */}
                    <div className="mt-8 grid grid-cols-3 gap-4 rounded-2xl bg-[#0E211B] p-5">
                      <div className="text-center">
                        <FaBed className="mx-auto text-2xl text-[#B8925A]" />
                        <p className="mt-2 text-lg">{property.beds}</p>
                        <span className="text-xs text-[#EFE9DD]/40">Bedrooms</span>
                      </div>
                      <div className="text-center">
                        <FaBath className="mx-auto text-2xl text-[#B8925A]" />
                        <p className="mt-2 text-lg">{property.baths}</p>
                        <span className="text-xs text-[#EFE9DD]/40">Bathrooms</span>
                      </div>
                      <div className="text-center">
                        <FaCar className="mx-auto text-2xl text-[#B8925A]" />
                        <p className="mt-2 text-lg">{property.parking}</p>
                        <span className="text-xs text-[#EFE9DD]/40">Parking</span>
                      </div>
                    </div>

                    {/* Amenities list */}
                    <div className="mt-7 flex flex-wrap gap-2">
                      {property.amenities.map((item) => (
                        <span key={item} className="rounded-full border border-[#B8925A]/30 bg-[#B8925A]/10 px-3 py-1 text-xs text-[#D9B383]">
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="mt-8 grid grid-cols-2 gap-3">
                      <button className="rounded-xl bg-[#B8925A] py-3 font-bold text-[#0E211B] transition hover:bg-[#D9B383]">
                        View Details
                      </button>
                      <button className="rounded-xl border border-[#B8925A] py-3 text-[#D9B383] transition hover:bg-[#B8925A] hover:text-[#0E211B]">
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="mt-16 flex justify-center gap-3">
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  className={`h-12 w-12 rounded-xl font-bold transition ${
                    page === 1 ? "bg-[#B8925A] text-[#0E211B]" : "border border-[#B8925A]/25 bg-[#132A22] hover:border-[#B8925A]"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LEAD DEVELOPERS */}
      <section className="mx-auto mt-28 max-w-7xl px-6">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[6px] text-[#B8925A]">TRUSTED BUILDERS</p>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold">India's Leading Developers</h2>
          <p className="mt-5 text-[#EFE9DD]/50">We collaborate with the country's most trusted real estate brands.</p>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {["DLF", "Godrej", "Sobha", "Prestige", "Lodha", "Brigade"].map((company) => (
            <div key={company} className="rounded-2xl border border-[#B8925A]/15 bg-[#132A22] p-8 text-center transition hover:border-[#B8925A] hover:-translate-y-1">
              <h3 className="text-xl font-bold">{company}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mx-auto mt-28 max-w-7xl px-6">
        <div className="rounded-3xl border border-[#B8925A]/20 bg-[#132A22] p-12">
          <div className="text-center">
            <p className="uppercase tracking-[6px] text-[#B8925A]">GO REALTORS</p>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold">Why Choose Us?</h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { number: "15K+", title: "Verified Properties" },
              { number: "8K+", title: "Happy Clients" },
              { number: "120+", title: "Cities Covered" },
              { number: "99%", title: "Customer Satisfaction" },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#B8925A]/15 bg-[#0E211B] p-8 text-center transition hover:border-[#B8925A]">
                <h2 className="text-5xl font-bold text-[#B8925A]">{item.number}</h2>
                <p className="mt-4 text-[#EFE9DD]/50">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="mx-auto mt-28 mb-20 max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[#0E211B]/80"></div>
          <div className="relative px-10 py-24 text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">Find Your <span className="text-[#B8925A]">Dream Property</span></h2>
            <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-[#EFE9DD]/70">
              Whether you're buying your first home, investing in commercial real estate, or looking for luxury living, GO REALTORS is here to make your journey simple, transparent, and memorable.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-5">
              <Link to="/signup" className="rounded-xl bg-[#B8925A] px-10 py-4 font-bold text-[#0E211B] transition hover:bg-[#D9B383]">
                Book Consultation
              </Link>
              <Link to="/contact" className="rounded-xl border border-[#B8925A] px-10 py-4 font-bold text-[#D9B383] transition hover:bg-[#B8925A] hover:text-[#0E211B]">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}