import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaSlidersH,
  FaTimes,
  FaParking,
  FaChair,
  FaTag,
} from "react-icons/fa";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const navigate = useNavigate();

  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true",
        furnished: furnishedFromUrl === "true",
        offer: offerFromUrl === "true",
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      try {
        setLoading(true);

        const searchQuery = urlParams.toString();

        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();

        setListings(data);

        if (data.length > 8) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [window.location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({
        ...sidebardata,
        type: e.target.id,
      });
    }

    if (e.target.id === "searchTerm") {
      setSidebardata({
        ...sidebardata,
        searchTerm: e.target.value,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]: e.target.checked,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0];
      const order = e.target.value.split("_")[1];

      setSidebardata({
        ...sidebardata,
        sort,
        order,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();

    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);

    navigate(`/search?${urlParams.toString()}`);
    setFiltersOpen(false);
  };

  const onShowMoreClick = async () => {
    const startIndex = listings.length;

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("startIndex", startIndex);

    const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
    const data = await res.json();

    if (data.length < 9) {
      setShowMore(false);
    }

    setListings([...listings, ...data]);
  };

  const typeOptions = [
    { id: "all", label: "All" },
    { id: "rent", label: "Rent" },
    { id: "sale", label: "Sale" },
  ];

  const featureOptions = [
    { id: "parking", label: "Parking", icon: FaParking },
    { id: "furnished", label: "Furnished", icon: FaChair },
    { id: "offer", label: "Offer", icon: FaTag },
  ];

  const labelCls = "mb-3 block text-xs font-semibold tracking-wide text-[#B8925A] uppercase";

  const FilterForm = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      {/* Search */}
      <div>
        <label className={labelCls}>Search</label>
        <div className="relative">
          <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B8925A]/70 text-sm" />
          <input
            id="searchTerm"
            type="text"
            value={sidebardata.searchTerm}
            onChange={handleChange}
            placeholder="Search by name or area..."
            className="w-full rounded-lg border border-[#B8925A]/20 bg-[#0E211B] py-3 pl-10 pr-3 text-sm text-[#EFE9DD] placeholder:text-[#EFE9DD]/30 outline-none transition-colors focus:border-[#B8925A]"
          />
        </div>
      </div>

      {/* Property Type — segmented pill control */}
      <div>
        <label className={labelCls}>Property Type</label>
        <div className="grid grid-cols-3 gap-2">
          {typeOptions.map((opt) => (
            <label key={opt.id} className="cursor-pointer">
              <input
                type="radio"
                id={opt.id}
                checked={sidebardata.type === opt.id}
                onChange={handleChange}
                className="peer sr-only"
              />
              <span className="flex items-center justify-center rounded-lg border border-[#B8925A]/20 py-2.5 text-sm font-semibold text-[#EFE9DD]/60 transition-colors peer-checked:border-[#B8925A] peer-checked:bg-[#B8925A] peer-checked:text-[#0E211B] hover:text-[#EFE9DD]">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Features — chip toggles */}
      <div>
        <label className={labelCls}>Features</label>
        <div className="flex flex-col gap-2">
          {featureOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <label key={opt.id} className="cursor-pointer">
                <input
                  type="checkbox"
                  id={opt.id}
                  checked={sidebardata[opt.id]}
                  onChange={handleChange}
                  className="peer sr-only"
                />
                <span className="flex items-center gap-2.5 rounded-lg border border-[#B8925A]/20 bg-[#0E211B]/40 px-3.5 py-2.5 text-sm font-medium text-[#EFE9DD]/70 transition-colors peer-checked:border-[#B8925A] peer-checked:bg-[#B8925A]/15 peer-checked:text-[#D9B383]">
                  <Icon className="text-[#B8925A] shrink-0" />
                  {opt.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className={labelCls}>Sort By</label>
        <select
          id="sort_order"
          defaultValue="createdAt_desc"
          onChange={handleChange}
          className="w-full rounded-lg border border-[#B8925A]/20 bg-[#0E211B] p-3 text-sm text-[#EFE9DD] outline-none transition-colors focus:border-[#B8925A]"
        >
          <option value="createdAt_desc">Newest</option>
          <option value="createdAt_asc">Oldest</option>
          <option value="regularPrice_asc">Price Low to High</option>
          <option value="regularPrice_desc">Price High to Low</option>
        </select>
      </div>

      <button className="w-full rounded-lg bg-[#B8925A] py-3 text-sm font-semibold uppercase tracking-wider text-[#0E211B] transition-colors hover:bg-[#D9B383]">
        Apply Filters
      </button>
    </form>
  );

  return (
    <div className="min-h-screen bg-[#0E211B]">
      {/* Mobile filter bar */}
      <div className="flex items-center justify-between border-b border-[#B8925A]/15 bg-[#132A22] px-5 py-4 lg:hidden">
        <div>
          <h1 className="text-xl font-bold text-[#EFE9DD]">Property Listings</h1>
          <p className="text-xs text-[#EFE9DD]/50">{listings.length} properties</p>
        </div>
        <button
          onClick={() => setFiltersOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-[#B8925A]/30 px-4 py-2 text-sm font-semibold text-[#D9B383]"
        >
          <FaSlidersH /> Filters
        </button>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col lg:flex-row">
        {/* Desktop sidebar */}
        <aside className="hidden w-80 shrink-0 border-r border-[#B8925A]/15 bg-[#132A22] p-7 lg:block">
          <div className="sticky top-24">
            <h2 className="mb-6 font-serif text-2xl font-bold text-[#EFE9DD]">Filters</h2>
            {FilterForm}
          </div>
        </aside>

        {/* Mobile filter drawer */}
        {filtersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setFiltersOpen(false)}
            />
            <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-[#132A22] p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold text-[#EFE9DD]">Filters</h2>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#B8925A]/30 text-[#EFE9DD]/70"
                >
                  <FaTimes />
                </button>
              </div>
              {FilterForm}
            </div>
          </div>
        )}

        {/* RESULTS */}
        <main className="flex-1 p-6 sm:p-8">
          <div className="mb-8 hidden items-center justify-between lg:flex">
            <h1 className="font-serif text-3xl font-bold text-[#EFE9DD]">Property Listings</h1>
            <span className="text-sm text-[#EFE9DD]/50">{listings.length} Properties</span>
          </div>

          {loading ? (
            <div className="flex h-64 flex-col items-center justify-center gap-3 text-[#EFE9DD]/50">
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#B8925A]/25 border-t-[#B8925A]" />
              <span className="text-sm">Loading properties...</span>
            </div>
          ) : listings.length === 0 ? (
            <div className="flex h-64 items-center justify-center text-lg font-serif text-[#EFE9DD]/40">
              No listings found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {listings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          )}

          {showMore && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={onShowMoreClick}
                className="rounded-lg border border-[#B8925A] px-8 py-3 text-sm font-semibold text-[#D9B383] transition-colors hover:bg-[#B8925A] hover:text-[#0E211B]"
              >
                Show More
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}