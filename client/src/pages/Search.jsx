import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

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
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  const checkboxCls =
    'w-4 h-4 accent-[#B8925A] cursor-pointer';
  const labelCls = 'text-sm text-[#EFE9DD]/80 cursor-pointer';

  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-[#0E211B]'>
      {/* FILTER SIDEBAR */}
      <div className='w-full md:w-80 md:shrink-0 p-6 sm:p-7 border-b md:border-b-0 md:border-r border-[#B8925A]/15 bg-[#132A22]/40'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <div>
            <label className='block text-xs font-semibold uppercase tracking-wide text-[#EFE9DD]/50 mb-1.5'>
              Search Term
            </label>
            <input
              type='text'
              id='searchTerm'
              placeholder='City, address, or zip...'
              className='w-full bg-[#0E211B] border border-[#B8925A]/25 text-[#EFE9DD] placeholder:text-[#EFE9DD]/30 rounded-lg p-3 outline-none focus:border-[#B8925A] transition-colors'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className='block text-xs font-semibold uppercase tracking-wide text-[#EFE9DD]/50 mb-2'>
              Type
            </label>
            <div className='flex flex-wrap gap-x-5 gap-y-2'>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='all'
                  className={checkboxCls}
                  onChange={handleChange}
                  checked={sidebardata.type === 'all'}
                />
                <span className={labelCls}>Rent &amp; Sale</span>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='rent'
                  className={checkboxCls}
                  onChange={handleChange}
                  checked={sidebardata.type === 'rent'}
                />
                <span className={labelCls}>Rent</span>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='sale'
                  className={checkboxCls}
                  onChange={handleChange}
                  checked={sidebardata.type === 'sale'}
                />
                <span className={labelCls}>Sale</span>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='offer'
                  className={checkboxCls}
                  onChange={handleChange}
                  checked={sidebardata.offer}
                />
                <span className={labelCls}>Offer</span>
              </div>
            </div>
          </div>

          <div>
            <label className='block text-xs font-semibold uppercase tracking-wide text-[#EFE9DD]/50 mb-2'>
              Amenities
            </label>
            <div className='flex flex-wrap gap-x-5 gap-y-2'>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='parking'
                  className={checkboxCls}
                  onChange={handleChange}
                  checked={sidebardata.parking}
                />
                <span className={labelCls}>Parking</span>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='furnished'
                  className={checkboxCls}
                  onChange={handleChange}
                  checked={sidebardata.furnished}
                />
                <span className={labelCls}>Furnished</span>
              </div>
            </div>
          </div>

          <div>
            <label className='block text-xs font-semibold uppercase tracking-wide text-[#EFE9DD]/50 mb-1.5'>
              Sort
            </label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='w-full bg-[#0E211B] border border-[#B8925A]/25 text-[#EFE9DD] rounded-lg p-3 outline-none focus:border-[#B8925A] transition-colors'
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to high</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>

          <button className='bg-[#B8925A] text-[#0E211B] font-semibold p-3 rounded-lg uppercase tracking-wide hover:bg-[#D9B383] transition-colors'>
            Search
          </button>
        </form>
      </div>

      {/* RESULTS */}
      <div className='flex-1 min-w-0'>
        <h1 className='font-serif text-2xl sm:text-3xl font-semibold border-b border-[#B8925A]/15 p-4 sm:p-5 text-[#EFE9DD]'>
          Listing results
        </h1>
        <div className='p-4 sm:p-7 flex flex-wrap gap-4 sm:gap-6'>
          {!loading && listings.length === 0 && (
            <p className='text-lg text-[#EFE9DD]/50'>No listing found!</p>
          )}
          {loading && (
            <p className='text-lg text-[#EFE9DD]/50 text-center w-full py-10'>
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-[#D9B383] hover:text-[#EFE9DD] transition-colors p-6 text-center w-full font-semibold'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}