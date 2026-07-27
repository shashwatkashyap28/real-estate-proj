import { useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaStar,
  FaFilter,
  FaHeart,
  FaArrowRight
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Properties() {
  const [propertiesList, setPropertiesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [maxBudget, setMaxBudget] = useState(50000000);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("https://real-real-estate-proj-1-cz77.onrender.com/api/property/get");
        const data = await res.json();
  
        setPropertiesList(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProperties();
  }, []);

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  const filteredProperties = propertiesList.filter((property) => {
    return (
      property.title.toLowerCase().includes(search.toLowerCase()) &&
      property.city.toLowerCase().includes(city.toLowerCase()) &&
      (type === "All" || property.type === type)
    );
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      {/* TOP HEADER SPACER OR NAVBAR CONTAINER IF NEEDED */}

      {/* MAIN CONTENT CONTAINER */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          
          {/* SIDEBAR FILTERS */}
          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">Filters</h2>
              <button 
                onClick={() => { setSearch(""); setCity(""); setType("All"); }}
                className="text-xs font-semibold text-amber-600 hover:underline"
              >
                Clear all
              </button>
            </div>

            {/* Property Type */}
            <div className="mt-6">
              <label className="font-semibold text-sm text-slate-700">Property Type</label>
              <div className="mt-3 space-y-2.5 text-sm text-slate-600">
                {["All", "Residential", "Commercial", "Land"].map((t) => (
                  <label key={t} className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="radio" 
                      name="propertyType" 
                      checked={type === t} 
                      onChange={() => setType(t)}
                      className="accent-amber-600" 
                    /> 
                    {t}
                  </label>
                ))}
              </div>
            </div>

            {/* City Input */}
            <div className="mt-6">
              <label className="font-semibold text-sm text-slate-700">City</label>
              <input
                type="text"
                placeholder="e.g. Gurgaon"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-amber-600"
              />
            </div>

            {/* Max Budget Slider */}
            <div className="mt-6">
              <label className="font-semibold text-sm text-slate-700">Max Budget</label>
              <input
                type="range"
                min="1000000"
                max="50000000"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                className="mt-3 w-full accent-amber-500 cursor-pointer"
              />
              <div className="mt-2 text-xs font-medium text-slate-500">
                Up to ₹{(maxBudget / 10000000).toFixed(1)} Cr
              </div>
            </div>

            {/* Status Checkboxes */}
            <div className="mt-6">
              <label className="font-semibold text-sm text-slate-700">Status</label>
              <div className="mt-3 space-y-2.5 text-sm text-slate-600">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="accent-amber-600 rounded" /> Ready to Move
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="accent-amber-600 rounded" /> Under Construction
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="accent-amber-600 rounded" /> New Launch
                </label>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT SECTION */}
          <div>
            {/* RESULTS HEADER & SORTING */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-sm font-medium text-slate-600">
                <span className="font-bold text-slate-900">{filteredProperties.length}</span> properties found
              </p>
              
              <select className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm outline-none focus:border-amber-600">
                <option>Newest First</option>
                <option>Price Low to High</option>
                <option>Price High to Low</option>
                <option>Top Rated</option>
              </select>
            </div>

            {/* PROPERTY CARD GRID */}
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {filteredProperties.map((property) => (
                <Link
                  to={`#`}
                  key={property.id}
                  className="group flex h-100px flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  {/* CARD IMAGE & ABSOLUTE BADGES */}
                  <div className="relative h-5 w-5 overflow-hidden bg-slate-100">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="h-5 w-5 object-cover transition duration-500 group-hover:scale-105"
                    />
                    
                    {/* Top-Left Type Tag */}
                    <span className="absolute left-3 top-3 rounded-md bg-emerald-700 px-2.5 py-1 text-11px font-bold text-white shadow">
                      {property.type}
                    </span>

                    {/* Top-Right Status Tag */}
                    <span className="absolute right-3 top-3 rounded-md bg-white/90 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow">
                      {property.status}
                    </span>
                  </div>

                  {/* CARD BODY CONTENT */}
                  <div className="flex flex-col flex-row p-4">
                    {/* Location */}
                    <div className="flex items-center text-xs text-slate-500">
                      <FaMapMarkerAlt className="mr-1 text-slate-400" />
                      <span>{property.location}</span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-1.5 text-base font-bold text-slate-900 truncate">
                      {property.title}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {property.description}
                    </p>

                    {/* Footer Pricing & Enquire Button */}
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                      <span className="text-lg font-extrabold text-slate-900">
                        {property.priceText}
                      </span>
                      
                      <span className="flex items-center gap-1 text-xs font-semibold text-slate-800 transition group-hover:text-amber-600">
                        Enquire <FaArrowRight className="text-[10px]" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}