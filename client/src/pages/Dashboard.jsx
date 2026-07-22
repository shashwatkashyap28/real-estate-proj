import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FaUsers, FaHome, FaPlus, FaTrash, FaEnvelope } from 'react-icons/fa';

export default function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [tab, setTab] = useState('enquiries'); // 'enquiries' | 'listings'
  const [enquiries, setEnquiries] = useState([]);
  const [listings, setListings] = useState([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(true);
  const [loadingListings, setLoadingListings] = useState(true);
  const [error, setError] = useState('');
  const [checkingAccess, setCheckingAccess] = useState(true);

  // ---- Access guard: signed out -> sign in, signed in but not admin -> home ----
  useEffect(() => {
    if (!currentUser) {
      navigate('/sign-in');
      return;
    }
    if (!currentUser.isAdmin) {
      navigate('/');
      return;
    }
    setCheckingAccess(false);
  }, [currentUser, navigate]);

  // ---- Fetch All Enquiries ----
  const fetchEnquiries = async () => {
    try {
      setLoadingEnquiries(true);
      setError('');
      const res = await fetch('/api/enquiry/all', {
        credentials: 'include', // Sends authentication cookie to server
      });
      const data = await res.json();

      if (data.success === false) {
        setError(data.message || 'Failed to load enquiries');
        setLoadingEnquiries(false);
        return;
      }

      setEnquiries(Array.isArray(data) ? data : []);
      setLoadingEnquiries(false);
    } catch (err) {
      setError('Failed to load enquiries. Please check connection.');
      setLoadingEnquiries(false);
    }
  };

  // ---- Fetch All Listings ----
  const fetchListings = async () => {
    try {
      setLoadingListings(true);
      const res = await fetch('/api/listing/get?limit=100', {
        credentials: 'include',
      });
      const data = await res.json();

      if (data.success === false) {
        setError(data.message || 'Failed to load listings');
        setLoadingListings(false);
        return;
      }

      setListings(Array.isArray(data) ? data : []);
      setLoadingListings(false);
    } catch (err) {
      setError('Failed to load listings');
      setLoadingListings(false);
    }
  };

  useEffect(() => {
    if (checkingAccess) return;
    fetchEnquiries();
    fetchListings();
  }, [checkingAccess]);

  // ---- Delete Enquiry Handler ----
  const handleDeleteEnquiry = async (id, label) => {
    if (!window.confirm(`Remove enquiry from "${label}"? This action cannot be undone.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/enquiry/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        return;
      }
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      setError('Failed to delete enquiry');
    }
  };

  // ---- Delete Listing Handler ----
  const handleDeleteListing = async (id, label) => {
    if (!window.confirm(`Delete listing "${label}"? This action cannot be undone.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        return;
      }
      setListings((prev) => prev.filter((l) => l._id !== id));
    } catch (err) {
      setError('Failed to delete listing');
    }
  };

  if (checkingAccess) {
    return (
      <div className='min-h-screen bg-[#0E211B] flex items-center justify-center'>
        <p className='text-[#EFE9DD]/50'>Checking admin access...</p>
      </div>
    );
  }

  const tabBtnCls = (name) =>
    `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
      tab === name
        ? 'bg-[#B8925A] text-[#0E211B]'
        : 'text-[#EFE9DD]/70 hover:bg-[#B8925A]/10'
    }`;

  return (
    <div className='min-h-screen bg-[#0E211B] px-4 py-8 sm:px-6 lg:px-10'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8'>
          <div>
            <h1 className='font-serif text-3xl sm:text-4xl font-bold text-[#EFE9DD]'>
              Admin Dashboard
            </h1>
            <p className='text-[#EFE9DD]/50 text-sm mt-1'>
              Signed in as <span className='text-[#B8925A] font-medium'>{currentUser?.username}</span>
            </p>
          </div>
          <Link
            to='/create-listing'
            className='inline-flex items-center justify-center gap-2 bg-[#B8925A] text-[#0E211B] font-semibold px-5 py-3 rounded-lg hover:bg-[#D9B383] transition-colors shrink-0'
          >
            <FaPlus /> Add Listing
          </Link>
        </div>

        {/* Stat Cards */}
        <div className='grid grid-cols-2 gap-4 mb-8'>
          <div className='bg-[#132A22] border border-[#B8925A]/20 rounded-2xl p-5 flex items-center gap-4'>
            <div className='h-11 w-11 rounded-full bg-[#B8925A]/15 flex items-center justify-center shrink-0'>
              <FaEnvelope className='text-[#B8925A]' />
            </div>
            <div>
              <p className='text-2xl font-bold text-[#EFE9DD]'>
                {loadingEnquiries ? '—' : enquiries.length}
              </p>
              <p className='text-xs text-[#EFE9DD]/50 uppercase tracking-wide'>
                Enquiries
              </p>
            </div>
          </div>
          <div className='bg-[#132A22] border border-[#B8925A]/20 rounded-2xl p-5 flex items-center gap-4'>
            <div className='h-11 w-11 rounded-full bg-[#B8925A]/15 flex items-center justify-center shrink-0'>
              <FaHome className='text-[#B8925A]' />
            </div>
            <div>
              <p className='text-2xl font-bold text-[#EFE9DD]'>
                {loadingListings ? '—' : listings.length}
              </p>
              <p className='text-xs text-[#EFE9DD]/50 uppercase tracking-wide'>
                Listings
              </p>
            </div>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <p className='text-red-400 text-sm mb-4 bg-red-400/10 border border-red-400/20 rounded-lg p-3'>
            {error}
          </p>
        )}

        {/* Tabs */}
        <div className='flex gap-2 mb-6 border-b border-[#B8925A]/15 pb-2'>
          <button onClick={() => setTab('enquiries')} className={tabBtnCls('enquiries')}>
            <FaUsers /> Enquiries ({enquiries.length})
          </button>
          <button onClick={() => setTab('listings')} className={tabBtnCls('listings')}>
            <FaHome /> Listings ({listings.length})
          </button>
        </div>

        {/* ENQUIRIES TAB */}
        {tab === 'enquiries' && (
          <div className='bg-[#132A22] border border-[#B8925A]/20 rounded-2xl overflow-hidden'>
            {loadingEnquiries ? (
              <p className='text-center text-[#EFE9DD]/50 py-12'>Loading enquiries...</p>
            ) : enquiries.length === 0 ? (
              <p className='text-center text-[#EFE9DD]/50 py-12'>
                No enquiries received yet.
              </p>
            ) : (
              <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                  <thead>
                    <tr className='text-left text-[#EFE9DD]/50 uppercase text-xs tracking-wide border-b border-[#B8925A]/15'>
                      <th className='px-5 py-3 font-semibold'>Name</th>
                      <th className='px-5 py-3 font-semibold hidden sm:table-cell'>
                        Contact Info
                      </th>
                      <th className='px-5 py-3 font-semibold hidden md:table-cell'>
                        Interest
                      </th>
                      <th className='px-5 py-3 font-semibold hidden lg:table-cell'>
                        Message
                      </th>
                      <th className='px-5 py-3 font-semibold hidden md:table-cell'>
                        Date Received
                      </th>
                      <th className='px-5 py-3 font-semibold text-right'>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {enquiries.map((e) => (
                      <tr
                        key={e._id}
                        className='border-b border-[#B8925A]/10 last:border-0 hover:bg-[#0E211B]/40 transition-colors'
                      >
                        <td className='px-5 py-3'>
                          <p className='text-[#EFE9DD] font-medium'>{e.name}</p>
                          <p className='text-[#EFE9DD]/40 text-xs sm:hidden'>
                            {e.email}
                          </p>
                        </td>
                        <td className='px-5 py-3 text-[#EFE9DD]/70 hidden sm:table-cell'>
                          <p>{e.email}</p>
                          {e.phone && (
                            <p className='text-[#EFE9DD]/40 text-xs'>{e.phone}</p>
                          )}
                        </td>
                        <td className='px-5 py-3 text-[#EFE9DD]/70 hidden md:table-cell'>
                          <span className='px-2.5 py-1 rounded-full text-xs bg-[#B8925A]/20 text-[#B8925A] font-semibold'>
                            {e.interest || 'Buy'}
                          </span>
                        </td>
                        <td className='px-5 py-3 text-[#EFE9DD]/50 hidden lg:table-cell max-w-xs'>
                          <p className='line-clamp-2'>{e.message || '—'}</p>
                        </td>
                        <td className='px-5 py-3 text-[#EFE9DD]/50 hidden md:table-cell whitespace-nowrap'>
                          {e.createdAt
                            ? new Date(e.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : '—'}
                        </td>
                        <td className='px-5 py-3 text-right'>
                          <button
                            onClick={() => handleDeleteEnquiry(e._id, e.name)}
                            aria-label={`Delete enquiry from ${e.name}`}
                            className='text-red-400 hover:text-red-300 transition-colors p-2'
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* LISTINGS TAB */}
        {tab === 'listings' && (
          <div>
            {loadingListings ? (
              <p className='text-center text-[#EFE9DD]/50 py-12'>Loading listings...</p>
            ) : listings.length === 0 ? (
              <p className='text-center text-[#EFE9DD]/50 py-12'>
                No property listings found.
              </p>
            ) : (
              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {listings.map((listing) => (
                  <div
                    key={listing._id}
                    className='bg-[#132A22] border border-[#B8925A]/20 rounded-2xl overflow-hidden'
                  >
                    <Link to={`/listing/${listing._id}`}>
                      <img
                        src={listing.imageUrls?.[0] || 'https://via.placeholder.com/300'}
                        alt={listing.name}
                        className='h-40 w-full object-cover'
                      />
                    </Link>
                    <div className='p-4'>
                      <Link
                        to={`/listing/${listing._id}`}
                        className='text-[#EFE9DD] font-semibold hover:text-[#D9B383] transition-colors line-clamp-1'
                      >
                        {listing.name}
                      </Link>
                      <p className='text-[#EFE9DD]/50 text-xs mt-1 line-clamp-1'>
                        {listing.address}
                      </p>
                      <p className='text-[#B8925A] font-bold mt-2'>
                        $
                        {(listing.offer
                          ? listing.discountPrice
                          : listing.regularPrice
                        )?.toLocaleString('en-US')}
                        {listing.type === 'rent' && ' / month'}
                      </p>

                      <div className='flex gap-2 mt-4'>
                        <Link
                          to={`/update-listing/${listing._id}`}
                          className='flex-1 text-center text-xs font-semibold uppercase text-[#D9B383] border border-[#B8925A]/40 rounded-lg py-2 hover:bg-[#B8925A]/10 transition-colors'
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() =>
                            handleDeleteListing(listing._id, listing.name)
                          }
                          className='flex-1 text-xs font-semibold uppercase text-red-400 border border-red-400/30 rounded-lg py-2 hover:bg-red-400/10 transition-colors'
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}