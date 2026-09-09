import { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaArrowRight,
  FaBed,
  FaBath,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { safeFetchJson } from "../utils/api";

export default function Properties() {
  const [propertiesList, setPropertiesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("All");
  const [maxBudget, setMaxBudget] = useState(50000000);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await safeFetchJson("/api/listing/get?limit=100");
        if (Array.isArray(data)) {
          setPropertiesList(data);
        } else {
          setPropertiesList([]);
        }
      } catch (err) {
        console.error("Failed to load properties:", err);
        setPropertiesList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = propertiesList
    .filter((property) => {
      const name = property.name || "";
      const address = property.address || "";
      const price = property.offer ? property.discountPrice : property.regularPrice;

      const matchesSearch =
        name.toLowerCase().includes(search.toLowerCase()) ||
        address.toLowerCase().includes(search.toLowerCase());

      const matchesCity = city.trim() === "" || address.toLowerCase().includes(city.toLowerCase());

      const matchesType =
        type === "All" ||
        (type === "Residential" && (property.type === "rent" || property.type === "sale")) ||
        property.type?.toLowerCase() === type.toLowerCase();

      const matchesBudget = !price || price <= maxBudget;

      return matchesSearch && matchesCity && matchesType && matchesBudget;
    })
    .sort((a, b) => {
      const priceA = a.offer ? a.discountPrice : a.regularPrice;
      const priceB = b.offer ? b.discountPrice : b.regularPrice;

      if (sortBy === "priceAsc") return priceA - priceB;
      if (sortBy === "priceDesc") return priceB - priceA;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <main className="min-h-screen bg-[#0E211B] text-[#EFE9DD] font-sans">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#EFE9DD]">
            Explore Properties
          </h1>
          <p className="mt-2 text-[#EFE9DD]/60 text-sm">
            Browse verified luxury homes, apartments, and prime estates.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* SIDEBAR FILTERS */}
          <aside className="h-fit rounded-2xl bg-[#132A22] p-6 shadow-xl border border-[#B8925A]/20">
            <div className="flex items-center justify-between pb-4 border-b border-[#B8925A]/20">
              <h2 className="text-lg font-bold text-[#EFE9DD]">Filters</h2>
              <button
                onClick={() => {
                  setSearch("");
                  setCity("");
                  setType("All");
                  setMaxBudget(50000000);
                }}
                className="text-xs font-semibold text-[#B8925A] hover:underline"
              >
                Clear all
              </button>
            </div>

            {/* Search Keyword */}
            <div className="mt-6">
              <label className="font-semibold text-xs uppercase tracking-wide text-[#EFE9DD]/60">
                Search Keyword
              </label>
              <input
                type="text"
                placeholder="e.g. Villa, Penthouse..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mt-2 w-full rounded-xl border border-[#B8925A]/25 bg-[#0E211B] px-4 py-2.5 text-sm text-[#EFE9DD] outline-none focus:border-[#B8925A] placeholder:text-[#EFE9DD]/30"
              />
            </div>

            {/* City */}
            <div className="mt-6">
              <label className="font-semibold text-xs uppercase tracking-wide text-[#EFE9DD]/60">
                Location / City
              </label>
              <input
                type="text"
                placeholder="e.g. Gurgaon, Delhi"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-2 w-full rounded-xl border border-[#B8925A]/25 bg-[#0E211B] px-4 py-2.5 text-sm text-[#EFE9DD] outline-none focus:border-[#B8925A] placeholder:text-[#EFE9DD]/30"
              />
            </div>

            {/* Property Type */}
            <div className="mt-6">
              <label className="font-semibold text-xs uppercase tracking-wide text-[#EFE9DD]/60">
                Property Type
              </label>
              <div className="mt-3 space-y-2.5 text-sm text-[#EFE9DD]/80">
                {["All", "rent", "sale"].map((t) => (
                  <label key={t} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="propertyType"
                      checked={type === t}
                      onChange={() => setType(t)}
                      className="accent-[#B8925A]"
                    />
                    <span className="capitalize">{t === "All" ? "All Types" : `For ${t}`}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Max Budget */}
            <div className="mt-6">
              <label className="font-semibold text-xs uppercase tracking-wide text-[#EFE9DD]/60">
                Max Budget
              </label>
              <input
                type="range"
                min="50000"
                max="50000000"
                step="50000"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="mt-3 w-full accent-[#B8925A] cursor-pointer"
              />
              <div className="mt-2 text-xs font-medium text-[#B8925A]">
                Up to ₹{maxBudget.toLocaleString('en-IN')}
              </div>
            </div>
          </aside>

          {/* MAIN RESULTS */}
          <div>
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-sm font-medium text-[#EFE9DD]/70">
                <span className="font-bold text-[#EFE9DD]">{filteredProperties.length}</span> properties found
              </p>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-[#B8925A]/30 bg-[#132A22] px-4 py-2 text-sm font-medium text-[#EFE9DD] shadow-sm outline-none focus:border-[#B8925A]"
              >
                <option value="newest">Newest First</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <p className="text-[#EFE9DD]/60 font-serif">Loading properties...</p>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="rounded-2xl border border-[#B8925A]/20 bg-[#132A22] p-12 text-center">
                <h3 className="text-lg font-bold text-[#EFE9DD]">No properties found</h3>
                <p className="mt-2 text-sm text-[#EFE9DD]/60">
                  Try adjusting your search criteria or clearing filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProperties.map((property) => {
                  const image =
                    property.imageUrls?.[0] ||
                    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80";
                  const price = property.offer ? property.discountPrice : property.regularPrice;

                  return (
                    <Link
                      to={`/listing/${property._id}`}
                      key={property._id}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-[#B8925A]/20 bg-[#132A22] shadow-lg transition duration-300 hover:-translate-y-1 hover:border-[#B8925A]/50"
                    >
                      <div className="relative h-48 w-full overflow-hidden bg-[#0E211B]">
                        <img
                          src={image}
                          alt={property.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          loading="lazy"
                        />

                        <span className="absolute left-3 top-3 rounded-md bg-[#0E211B]/90 border border-[#B8925A]/40 px-2.5 py-1 text-xs font-bold text-[#B8925A] shadow capitalize">
                          For {property.type || "Sale"}
                        </span>

                        {property.offer && (
                          <span className="absolute right-3 top-3 rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white shadow">
                            Special Offer
                          </span>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-center text-xs text-[#EFE9DD]/60">
                          <FaMapMarkerAlt className="mr-1.5 text-[#B8925A] shrink-0" />
                          <span className="truncate">{property.address}</span>
                        </div>

                        <h3 className="mt-2 text-base font-bold text-[#EFE9DD] truncate group-hover:text-[#B8925A] transition-colors">
                          {property.name}
                        </h3>

                        <div className="mt-3 flex items-center gap-4 text-xs text-[#EFE9DD]/70">
                          <span className="flex items-center gap-1.5">
                            <FaBed className="text-[#B8925A]" />
                            {property.bedrooms} Beds
                          </span>
                          <span className="flex items-center gap-1.5">
                            <FaBath className="text-[#B8925A]" />
                            {property.bathrooms} Baths
                          </span>
                        </div>

                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#B8925A]/15">
                          <div>
                            <span className="text-lg font-bold text-[#EFE9DD]">
                              ₹{price?.toLocaleString('en-IN') || 'Price on request'}
                            </span>
                            {property.type === 'rent' && (
                              <span className="text-xs text-[#EFE9DD]/50"> / month</span>
                            )}
                          </div>

                          <span className="flex items-center gap-1 text-xs font-semibold text-[#B8925A] group-hover:translate-x-0.5 transition-transform">
                            View <FaArrowRight className="text-[10px]" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}