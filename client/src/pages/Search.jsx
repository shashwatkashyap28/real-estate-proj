import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="min-h-screen bg-[#0E211B] flex flex-col lg:flex-row">

      {/* SIDEBAR */}

      <aside className="w-full lg:w-80 border-r border-[#B8925A]/20 bg-[#132A22] p-6">

        <h2 className="mb-6 text-2xl font-bold text-[#EFE9DD]">
          Filters
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="mb-2 block text-sm text-[#EFE9DD]/70">
              Search
            </label>

            <input
              id="searchTerm"
              type="text"
              value={sidebardata.searchTerm}
              onChange={handleChange}
              placeholder="Search..."
              className="w-full rounded-lg border border-[#B8925A]/20 bg-[#0E211B] p-3 text-[#EFE9DD] outline-none focus:border-[#B8925A]"
            />
          </div>
                    {/* PROPERTY TYPE */}

                    <div>
            <label className="mb-3 block text-sm text-[#EFE9DD]/70">
              Property Type
            </label>

            <div className="space-y-3">

              <label className="flex items-center gap-3 text-[#EFE9DD]">
                <input
                  type="radio"
                  id="all"
                  checked={sidebardata.type === "all"}
                  onChange={handleChange}
                  className="accent-[#B8925A]"
                />
                All
              </label>

              <label className="flex items-center gap-3 text-[#EFE9DD]">
                <input
                  type="radio"
                  id="rent"
                  checked={sidebardata.type === "rent"}
                  onChange={handleChange}
                  className="accent-[#B8925A]"
                />
                Rent
              </label>

              <label className="flex items-center gap-3 text-[#EFE9DD]">
                <input
                  type="radio"
                  id="sale"
                  checked={sidebardata.type === "sale"}
                  onChange={handleChange}
                  className="accent-[#B8925A]"
                />
                Sale
              </label>

            </div>
          </div>

          {/* FEATURES */}

          <div>

            <label className="mb-3 block text-sm text-[#EFE9DD]/70">
              Features
            </label>

            <div className="space-y-3">

              <label className="flex items-center gap-3 text-[#EFE9DD]">
                <input
                  type="checkbox"
                  id="parking"
                  checked={sidebardata.parking}
                  onChange={handleChange}
                  className="accent-[#B8925A]"
                />
                Parking
              </label>

              <label className="flex items-center gap-3 text-[#EFE9DD]">
                <input
                  type="checkbox"
                  id="furnished"
                  checked={sidebardata.furnished}
                  onChange={handleChange}
                  className="accent-[#B8925A]"
                />
                Furnished
              </label>

              <label className="flex items-center gap-3 text-[#EFE9DD]">
                <input
                  type="checkbox"
                  id="offer"
                  checked={sidebardata.offer}
                  onChange={handleChange}
                  className="accent-[#B8925A]"
                />
                Offer
              </label>

            </div>

          </div>

          {/* SORT */}

          <div>

            <label className="mb-2 block text-sm text-[#EFE9DD]/70">
              Sort By
            </label>

            <select
              id="sort_order"
              defaultValue="createdAt_desc"
              onChange={handleChange}
              className="w-full rounded-lg border border-[#B8925A]/20 bg-[#0E211B] p-3 text-[#EFE9DD] outline-none"
            >
              <option value="createdAt_desc">Newest</option>
              <option value="createdAt_asc">Oldest</option>
              <option value="regularPrice_asc">Price Low to High</option>
              <option value="regularPrice_desc">Price High to Low</option>
            </select>

          </div>

          <button
            className="w-full rounded-lg bg-[#B8925A] py-3 font-semibold text-[#0E211B] transition hover:bg-[#D9B383]"
          >
            Search
          </button>

        </form>

      </aside>

      {/* RESULTS */}

      <main className="flex-1 p-6">

        <div className="mb-8 flex items-center justify-between">

          <h1 className="text-3xl font-bold text-[#EFE9DD]">
            Property Listings
          </h1>

          <span className="text-[#EFE9DD]/60">
            {listings.length} Properties
          </span>

        </div>

        {loading ? (

          <div className="flex h-64 items-center justify-center text-xl text-[#EFE9DD]/60">
            Loading...
          </div>

        ) : listings.length === 0 ? (

          <div className="flex h-64 items-center justify-center text-xl text-[#EFE9DD]/60">
            No Listings Found
          </div>

        ) : (

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

            {listings.map((listing) => (
              <ListingItem
                key={listing._id}
                listing={listing}
              />
            ))}

          </div>

        )}

        {showMore && (

          <div className="mt-10 flex justify-center">

            <button
              onClick={onShowMoreClick}
              className="rounded-lg border border-[#B8925A] px-8 py-3 text-[#D9B383] transition hover:bg-[#B8925A] hover:text-[#0E211B]"
            >
              Show More
            </button>

          </div>

        )}

      </main>

    </div>
  );
}