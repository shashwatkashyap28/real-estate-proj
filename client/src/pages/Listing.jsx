import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaCheck,
  FaArrowLeft,
} from 'react-icons/fa';
import Contact from '../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#0E211B] text-[#EFE9DD]'>
        <p className='text-2xl font-serif'>Loading property details...</p>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#0E211B] text-[#EFE9DD]'>
        <p className='text-2xl font-serif text-red-400'>Failed to load property listing.</p>
      </div>
    );
  }

  return (
    <main className='min-h-screen bg-[#0E211B] text-[#EFE9DD] font-sans pb-16'>
      {listing && (
        <div>
          {/* Back Navigation Bar */}
          <div className='max-w-7xl mx-auto px-6 pt-4'>
            <Link to='/' className='inline-flex items-center gap-2 text-sm text-[#EFE9DD]/70 hover:text-[#B8925A] transition-colors'>
              <FaArrowLeft className='text-xs' /> Back to listings
            </Link>
          </div>

          {/* Hero Swiper Carousel with Frame */}
          <div className='relative max-w-7xl mx-auto px-4 pt-4'>
            <div className='relative rounded-3xl overflow-hidden border border-[#B8925A]/20 shadow-2xl bg-[#132A22]'>
              <Swiper navigation className='h-[400px] sm:h-[500px] md:h-[550px]'>
                {listing.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <img
                      src={url}
                      alt='Property slide'
                      className='w-full h-full object-cover'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-[#0E211B]/60 via-transparent to-transparent' />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Share Button Overlay */}
              <div 
                className='absolute top-4 right-4 z-20 border border-[#B8925A]/40 rounded-full w-12 h-12 flex justify-center items-center bg-[#132A22]/80 backdrop-blur-md cursor-pointer hover:border-[#B8925A] transition-colors shadow-lg'
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                <FaShare className='text-[#EFE9DD]' />
              </div>

              {copied && (
                <div className='absolute top-20 right-4 z-20 rounded-xl bg-[#132A22] border border-[#B8925A]/30 text-[#EFE9DD] px-4 py-2 text-sm shadow-xl'>
                  Link copied!
                </div>
              )}
            </div>
          </div>

          {/* Sticky Sub-Nav Tabs */}
          <div className='sticky top-0 z-30 bg-[#0E211B]/95 backdrop-blur-md border-b border-[#B8925A]/20 my-6 py-3 shadow-md'>
            <div className='max-w-7xl mx-auto px-6 flex items-center gap-8 overflow-x-auto text-sm md:text-base text-[#EFE9DD]/70 scrollbar-none'>
              {['Overview', 'Floor Plan', 'Amenities', 'Payment', 'Gallery', 'Location', 'Surroundings', 'Reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap transition-colors pb-1 cursor-pointer ${
                    activeTab === tab
                      ? 'text-[#B8925A] font-semibold border-b-2 border-[#B8925A]'
                      : 'hover:text-[#EFE9DD]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12'>
            
            {/* Left Column: Details */}
            <div className='lg:col-span-2 space-y-8'>
              
              {/* Badges & Title */}
              <div>
                <div className='flex flex-wrap items-center gap-3 mb-4'>
                  <span className='bg-[#B8925A] text-[#0E211B] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider'>
                    {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                  </span>
                  {listing.offer && (
                    <span className='bg-[#132A22] border border-[#B8925A]/40 text-[#D9B383] px-4 py-1.5 rounded-full text-xs font-semibold'>
                      ${(+listing.regularPrice - +listing.discountPrice).toLocaleString('en-US')} OFF
                    </span>
                  )}
                </div>

                <h1 className='font-serif text-3xl md:text-5xl font-bold text-[#EFE9DD] leading-tight'>
                  {listing.name} - ${listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                  {listing.type === 'rent' && <span className='text-lg font-normal text-[#EFE9DD]/60'> / month</span>}
                </h1>

                <p className='flex items-center gap-2 mt-4 text-[#EFE9DD]/60 text-lg'>
                  <FaMapMarkerAlt className='text-[#B8925A] shrink-0' />
                  {listing.address}
                </p>
              </div>

              {/* Quick Specification Cards */}
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                <div className='bg-[#132A22] border border-[#B8925A]/15 p-4 rounded-2xl flex items-center gap-3 shadow-md'>
                  <FaBed className='text-2xl text-[#B8925A]' />
                  <div>
                    <p className='text-xs text-[#EFE9DD]/50'>Bedrooms</p>
                    <p className='text-base font-semibold'>{listing.bedrooms} Beds</p>
                  </div>
                </div>

                <div className='bg-[#132A22] border border-[#B8925A]/15 p-4 rounded-2xl flex items-center gap-3 shadow-md'>
                  <FaBath className='text-2xl text-[#B8925A]' />
                  <div>
                    <p className='text-xs text-[#EFE9DD]/50'>Bathrooms</p>
                    <p className='text-base font-semibold'>{listing.bathrooms} Baths</p>
                  </div>
                </div>

                <div className='bg-[#132A22] border border-[#B8925A]/15 p-4 rounded-2xl flex items-center gap-3 shadow-md'>
                  <FaParking className='text-2xl text-[#B8925A]' />
                  <div>
                    <p className='text-xs text-[#EFE9DD]/50'>Parking</p>
                    <p className='text-base font-semibold'>{listing.parking ? 'Available' : 'None'}</p>
                  </div>
                </div>

                <div className='bg-[#132A22] border border-[#B8925A]/15 p-4 rounded-2xl flex items-center gap-3 shadow-md'>
                  <FaChair className='text-2xl text-[#B8925A]' />
                  <div>
                    <p className='text-xs text-[#EFE9DD]/50'>Furnishing</p>
                    <p className='text-base font-semibold'>{listing.furnished ? 'Furnished' : 'Unfurnished'}</p>
                  </div>
                </div>
              </div>

              {/* Description Box */}
              <div className='bg-[#132A22] border border-[#B8925A]/15 p-8 rounded-3xl space-y-4 shadow-xl'>
                <h2 className='font-serif text-2xl font-bold text-[#EFE9DD]'>Description</h2>
                <p className='text-[#EFE9DD]/70 leading-relaxed whitespace-pre-line text-base'>
                  {listing.description}
                </p>
              </div>

              {/* Location Advantage / Features Overview */}
              <div className='bg-[#132A22] border border-[#B8925A]/15 p-8 rounded-3xl space-y-6 shadow-xl'>
                <h2 className='font-serif text-2xl font-bold text-[#EFE9DD]'>Location Advantage & Surroundings</h2>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                  {['Near City Center', 'Easy Connectivity', 'Expressway Access', 'Educational Hubs', 'Nearby Hospitals', 'Shopping Facilities'].map((advantage, index) => (
                    <div key={index} className='flex items-center gap-3 p-4 rounded-xl border border-[#B8925A]/10 bg-[#0E211B]/50'>
                      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#B8925A]/20 text-[#B8925A]'>
                        <FaCheck className='text-sm' />
                      </div>
                      <span className='text-sm font-medium text-[#EFE9DD]/80'>{advantage}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Contact / Inquiry Form Sidebar */}
            <div className='lg:col-span-1'>
              <div className='sticky top-24 bg-[#132A22] border border-[#B8925A]/25 p-6 rounded-3xl shadow-2xl space-y-6'>
                <div>
                  <h3 className='font-serif text-2xl font-bold text-[#EFE9DD]'>Enquire about this property</h3>
                  <p className='text-xs text-[#EFE9DD]/50 mt-1'>Our consultant will respond within 2 working hours.</p>
                </div>

                {currentUser && listing.userRef !== currentUser._id && !contact && (
                  <button
                    onClick={() => setContact(true)}
                    className='w-full bg-[#B8925A] text-[#0E211B] font-semibold rounded-xl uppercase tracking-wider hover:bg-[#D9B383] transition-colors p-4 cursor-pointer text-center shadow-lg'
                  >
                    Contact Landlord
                  </button>
                )}

                {contact && <Contact listing={listing} />}

                <p className='text-[11px] text-[#EFE9DD]/40 text-center leading-relaxed pt-2'>
                  We never share your details. No spam, no unsolicited calls from developers.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}