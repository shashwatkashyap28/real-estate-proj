import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
} from 'react-icons/fa';
import Contact from '../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [openFaq, setOpenFaq] = useState(null);
  const [galleryOffset, setGalleryOffset] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  
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

  const Dossier = () => (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,450;9..144,600&family=Inter:wght@400;500;600&display=swap');
      .est-display { font-family: 'Fraunces', serif; font-feature-settings: 'ss01' 1; }
      .est-eyebrow { font-family: 'Inter', sans-serif; letter-spacing: 0.28em; }
      .est-hairline { background-image: linear-gradient(90deg, rgba(184,146,90,0.55), rgba(184,146,90,0) 70%); }
      .est-corner { position: absolute; width: 26px; height: 26px; border-color: #B8925A; }
    `}</style>
  );

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#0E211B] text-[#EFE9DD]'>
        <Dossier />
        <div className='text-center'>
          <p className='est-eyebrow text-[10px] uppercase text-[#B8925A] mb-3'>One moment</p>
          <p className='est-display text-2xl'>Preparing the property dossier…</p>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#0E211B] text-[#EFE9DD]'>
        <Dossier />
        <div className='text-center'>
          <p className='est-eyebrow text-[10px] uppercase text-red-400/80 mb-3'>Unavailable</p>
          <p className='est-display text-2xl text-red-100'>This listing could not be retrieved.</p>
        </div>
      </div>
    );
  }

  const galleryImages = listing.galleryImages || [];
  const galleryCount = galleryImages.length;
  const rotatedGallery = galleryCount > 0
    ? Array.from({ length: galleryCount }, (_, i) => galleryImages[(galleryOffset + i) % galleryCount])
    : [];
  const galleryHero = rotatedGallery[0];
  const galleryRest = rotatedGallery.slice(1);
  const galleryPanels = [];
  for (let i = 0; i < galleryRest.length; i += 4) {
    galleryPanels.push(galleryRest.slice(i, i + 4));
  }

  const hasPin = listing.location && listing.location.lat != null && listing.location.lng != null;
  const mapQuery = hasPin ? `${listing.location.lat},${listing.location.lng}` : listing.address;

  const getYoutubeId = (url) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };
  const youtubeId = getYoutubeId(listing.youtubeLink);
  const referenceNo = (listing._id || '').slice(-6).toUpperCase().padStart(6, '0');
  const displayPrice = listing.offer ? listing.discountPrice : listing.regularPrice;

  return (
    <main className='min-h-screen bg-[#0E211B] text-[#EFE9DD] font-sans pb-20 selection:bg-[#B8925A]/30 selection:text-[#EFE9DD]'>
      <Dossier />
      {listing && (
        <div>
          {/* Dossier Header Bar */}
          <div className='max-w-7xl mx-auto px-6 pt-6 flex items-center justify-between flex-wrap gap-3'>
            <Link to='/' className='group inline-flex items-center gap-2 text-sm text-[#EFE9DD]/60 hover:text-[#B8925A] transition-colors'>
              <FaArrowLeft className='text-xs transition-transform group-hover:-translate-x-1' /> Back to listings
            </Link>
            <div className='flex items-center gap-3 est-eyebrow text-[10px] uppercase text-[#EFE9DD]/40'>
              <span>Property Dossier</span>
              {referenceNo && (
                <>
                  <span className='h-1 w-1 rounded-full bg-[#B8925A]/50' />
                  <span className='text-[#D9B383]'>N&deg; {referenceNo}</span>
                </>
              )}
            </div>
          </div>

          {/* Hero Swiper Carousel with Frame */}
          <div className='relative max-w-7xl mx-auto px-4 pt-4'>
            <div className='relative rounded-2xl overflow-hidden border border-[#B8925A]/20 shadow-2xl bg-[#132A22]'>
              <Swiper navigation className='h-[400px] sm:h-[500px] md:h-[550px]'>
                {listing.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <img
                      src={url}
                      alt='Property slide'
                      className='w-full h-full object-cover'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-[#0E211B]/80 via-[#0E211B]/5 to-transparent' />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Certification corner brackets — the dossier's signature mark */}
              <div className='est-corner top-4 left-4 border-t-2 border-l-2 pointer-events-none' />
              <div className='est-corner top-4 right-20 border-t-2 border-r-2 pointer-events-none' />
              <div className='est-corner bottom-4 left-4 border-b-2 border-l-2 pointer-events-none' />
              <div className='est-corner bottom-4 right-4 border-b-2 border-r-2 pointer-events-none' />

              {/* Share Button Overlay */}
              <div
                className='absolute top-4 right-4 z-20 border border-[#B8925A]/40 rounded-full w-12 h-12 flex justify-center items-center bg-[#0E211B]/70 backdrop-blur-md cursor-pointer hover:border-[#B8925A] transition-colors shadow-lg'
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

              {/* Nameplate — price engraved onto the hero, like a brass plaque */}
              <div className='absolute left-6 bottom-6 z-10 max-w-md'>
                <div className='bg-[#0E211B]/75 backdrop-blur-md border border-[#B8925A]/30 rounded-xl px-5 py-4 shadow-2xl'>
                  <p className='est-eyebrow text-[9px] uppercase text-[#B8925A] mb-1'>
                    {listing.type === 'rent' ? 'Monthly Rent' : 'Asking Price'}
                  </p>
                  <p className='est-display text-2xl sm:text-3xl font-medium text-[#EFE9DD] leading-none'>
                    &#8377;{displayPrice ? displayPrice.toLocaleString('en-IN') : ''}
                    {listing.type === 'rent' && <span className='text-sm font-normal text-[#EFE9DD]/50'> /mo</span>}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className='max-w-7xl mx-auto px-6 pt-10 grid grid-cols-1 lg:grid-cols-3 gap-12'>
            
            {/* Left Column: Details */}
            <div className='lg:col-span-2 space-y-8'>
              
              {/* Badges & Title */}
              <div>
                <div className='flex flex-wrap items-center gap-2.5 mb-5'>
                  <span className='bg-[#B8925A] text-[#0E211B] px-4 py-1.5 rounded-full text-[11px] font-bold uppercase est-eyebrow tracking-widest'>
                    {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                  </span>
                  {listing.offer && (
                    <span className='border border-[#D9B383]/50 text-[#D9B383] px-4 py-1.5 rounded-full text-xs font-semibold'>
                      &#8377;{(+listing.regularPrice - +listing.discountPrice).toLocaleString('en-IN')} off
                    </span>
                  )}
                  {listing.propertyType && (
                    <span className='border border-[#EFE9DD]/15 text-[#EFE9DD]/70 px-4 py-1.5 rounded-full text-xs font-semibold'>
                      {listing.propertyType}
                    </span>
                  )}
                  {listing.status && (
                    <span className='border border-[#EFE9DD]/15 text-[#EFE9DD]/70 px-4 py-1.5 rounded-full text-xs font-semibold'>
                      {listing.status}
                    </span>
                  )}
                  {listing.possessionYear && (
                    <span className='flex items-center gap-1.5 border border-[#EFE9DD]/15 text-[#EFE9DD]/70 px-4 py-1.5 rounded-full text-xs font-semibold'>
                      <FaCalendarAlt className='text-[#B8925A]' /> Possession {listing.possessionYear}
                    </span>
                  )}
                </div>

                <h1 className='est-display text-3xl md:text-5xl font-medium text-[#EFE9DD] leading-[1.1] tracking-tight'>
                  {listing.name}
                </h1>

                <p className='flex items-center gap-2 mt-4 text-[#EFE9DD]/55 text-base'>
                  <FaMapMarkerAlt className='text-[#B8925A] shrink-0' />
                  {listing.address}
                </p>
              </div>

              {/* Quick Specification Ledger */}
              <div className='bg-[#132A22] border border-[#B8925A]/15 rounded-2xl shadow-md grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#B8925A]/10'>
                {[
                  { icon: FaBed, label: 'Bedrooms', value: `${listing.bedrooms} Beds` },
                  { icon: FaBath, label: 'Bathrooms', value: `${listing.bathrooms} Baths` },
                  { icon: FaParking, label: 'Parking', value: listing.parking ? 'Available' : 'None' },
                  { icon: FaChair, label: 'Furnishing', value: listing.furnished ? 'Furnished' : 'Unfurnished' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className='p-5 flex items-center gap-3'>
                    <Icon className='text-xl text-[#B8925A] shrink-0' />
                    <div>
                      <p className='est-eyebrow text-[9px] uppercase text-[#EFE9DD]/40'>{label}</p>
                      <p className='text-sm font-semibold mt-0.5'>{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description Box */}
              <div className='bg-[#132A22] border border-[#B8925A]/15 p-8 rounded-2xl space-y-4 shadow-xl'>
                <div className='flex items-center gap-3'>
                  <span className='est-display text-[#B8925A] text-sm'>01</span>
                  <div className='h-px flex-1 est-hairline' />
                  <h2 className='est-display text-2xl font-medium text-[#EFE9DD]'>Description</h2>
                </div>
                <p className='text-[#EFE9DD]/65 leading-relaxed whitespace-pre-line text-base'>
                  {listing.description}
                </p>
              </div>

              {/* Gallery */}
              {galleryCount > 0 && (
                <div className='bg-[#132A22] border border-[#B8925A]/15 p-8 rounded-2xl shadow-xl'>
                  <div className='flex items-end justify-between mb-6 flex-wrap gap-4'>
                    <div className='flex items-center gap-3'>
                      <span className='est-display text-[#B8925A] text-sm'>02</span>
                      <div>
                        <p className='est-eyebrow text-[9px] font-bold text-[#B8925A] uppercase mb-1'>In Pictures</p>
                        <h2 className='est-display text-3xl font-medium text-[#EFE9DD]'>Gallery</h2>
                      </div>
                    </div>
                    {galleryCount > 1 && (
                      <div className='flex gap-2'>
                        <button
                          type='button'
                          onClick={() => setGalleryOffset((prev) => (prev - 1 + galleryCount) % galleryCount)}
                          className='h-10 w-10 flex items-center justify-center rounded-full border border-[#B8925A]/30 text-[#EFE9DD]/70 hover:border-[#B8925A] hover:text-[#B8925A] transition-colors'
                        >
                          <FaChevronLeft className='text-sm' />
                        </button>
                        <button
                          type='button'
                          onClick={() => setGalleryOffset((prev) => (prev + 1) % galleryCount)}
                          className='h-10 w-10 flex items-center justify-center rounded-full border border-[#B8925A]/30 text-[#EFE9DD]/70 hover:border-[#B8925A] hover:text-[#B8925A] transition-colors'
                        >
                          <FaChevronRight className='text-sm' />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className='flex flex-col lg:flex-row gap-5 items-stretch'>
                    {/* Hero image */}
                    <div 
                      onClick={() => {
                        const heroOriginalIndex = galleryImages.findIndex((img) => img === galleryHero);
                        setSelectedImageIndex(heroOriginalIndex !== -1 ? heroOriginalIndex : 0);
                      }}
                      className='lg:flex-[1.15] rounded-2xl overflow-hidden relative h-72 lg:h-[440px] border-2 border-[#B8925A]/30 shadow-xl cursor-pointer'
                    >
                      <img src={galleryHero} alt='Property gallery' className='w-full h-full object-cover' />
                      <div className='absolute inset-0 bg-gradient-to-t from-[#0E211B]/85 via-[#0E211B]/10 to-transparent' />
                      <span className='absolute top-4 left-4 est-display italic text-2xl text-[#D9B383] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]'>
                        1
                      </span>
                      <div className='absolute bottom-0 left-0 right-0 p-5'>
                        <p className='est-display text-lg font-medium text-[#EFE9DD] leading-snug'>{listing.name}</p>
                        <p className='text-xs text-[#EFE9DD]/60 mt-1 line-clamp-1'>{listing.address}</p>
                      </div>
                    </div>

                    {/* Collage panels — staggered masonry, framed like photographs */}
                    {galleryPanels.map((panel, pIndex) => {
                      const heightPresets = ['h-28 lg:h-36', 'h-40 lg:h-52', 'h-32 lg:h-40', 'h-44 lg:h-56'];
                      return (
                        <div key={pIndex} className='lg:flex-1 columns-2 gap-3 lg:h-[440px]'>
                          {panel.map((url, iIndex) => {
                            const number = pIndex * 4 + iIndex + 2;
                            const tilt = iIndex % 2 === 0 ? 'rotate-1' : '-rotate-1';
                            return (
                              <div 
                                key={iIndex} 
                                onClick={() => {
                                  const originalIndex = galleryImages.findIndex((img) => img === url);
                                  setSelectedImageIndex(originalIndex !== -1 ? originalIndex : number - 1);
                                }}
                                className={`relative mb-3 break-inside-avoid ${tilt} cursor-pointer`}
                              >
                                <div
                                  className={`${heightPresets[iIndex % heightPresets.length]} rounded-md overflow-hidden border-2 border-[#B8925A]/35 shadow-lg`}
                                >
                                  <img
                                    src={url}
                                    alt={`Property gallery {number}`}
                                    className='w-full h-full object-cover'
                                  />
                                </div>
                                <span className='absolute -top-2.5 -right-1.5 est-display italic text-lg text-[#D9B383] drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]'>
                                  {number}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Watch Video */}
              {listing.youtubeLink && (
                <div className='bg-[#132A22] border border-[#B8925A]/15 p-8 rounded-2xl space-y-5 shadow-xl'>
                  <div className='flex items-center gap-3'>
                    <span className='est-display text-[#B8925A] text-sm'>03</span>
                    <div className='h-px flex-1 est-hairline' />
                    <h2 className='est-display text-2xl font-medium text-[#EFE9DD]'>Watch Video</h2>
                  </div>
                  <a
                    href={listing.youtubeLink}
                    target='_blank'
                    rel='noreferrer'
                    className='group relative block h-72 lg:h-96 rounded-2xl overflow-hidden border border-[#B8925A]/15'
                  >
                    {youtubeId ? (
                      <img
                        src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                        alt='Property video thumbnail'
                        className='w-full h-full object-cover transition duration-500 group-hover:scale-105'
                      />
                    ) : (
                      <div className='w-full h-full bg-[#0E211B] flex items-center justify-center'>
                        <span className='text-sm text-[#EFE9DD]/50'>Video preview unavailable — click to watch</span>
                      </div>
                    )}
                    <div className='absolute inset-0 bg-[#0E211B]/30 group-hover:bg-[#0E211B]/50 transition-colors flex items-center justify-center'>
                      <div className='h-16 w-16 rounded-full bg-[#B8925A] flex items-center justify-center shadow-xl transition-transform group-hover:scale-110'>
                        <FaPlay className='text-[#0E211B] text-xl ml-1' />
                      </div>
                    </div>
                  </a>
                </div>
              )}

              {/* Location Map */}
              {listing.address && (
                <div className='bg-[#132A22] border border-[#B8925A]/15 p-8 rounded-2xl space-y-5 shadow-xl'>
                  <div className='flex items-center justify-between flex-wrap gap-3'>
                    <div className='flex items-center gap-3 flex-wrap'>
                      <span className='est-display text-[#B8925A] text-sm'>04</span>
                      <h2 className='est-display text-2xl font-medium text-[#EFE9DD]'>Location</h2>
                      {hasPin && (
                        <span className='flex items-center gap-1.5 text-[11px] font-semibold text-[#D9B383] bg-[#0E211B] border border-[#B8925A]/30 rounded-full px-3 py-1'>
                          <FaMapMarkerAlt className='text-[#B8925A]' /> Precise location
                        </span>
                      )}
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
                      target='_blank'
                      rel='noreferrer'
                      className='flex items-center gap-2 text-sm font-semibold text-[#D9B383] border border-[#B8925A]/40 rounded-lg px-4 py-2 hover:bg-[#B8925A]/10 transition-colors'
                    >
                      <FaMapMarkerAlt /> Open in Google Maps
                    </a>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
                    target='_blank'
                    rel='noreferrer'
                    className='block relative rounded-2xl overflow-hidden border border-[#B8925A]/15 group'
                  >
                    <iframe
                      title='Property location map'
                      src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
                      className='w-full h-80 border-0 pointer-events-none'
                      loading='lazy'
                      referrerPolicy='no-referrer-when-downgrade'
                    />
                    <div className='absolute inset-0 bg-[#0E211B]/0 group-hover:bg-[#0E211B]/10 transition-colors flex items-center justify-center'>
                      <span className='opacity-0 group-hover:opacity-100 transition-opacity bg-[#0E211B]/80 text-[#EFE9DD] text-sm font-semibold px-4 py-2 rounded-lg'>
                        Click to view on Google Maps
                      </span>
                    </div>
                  </a>
                </div>
              )}

              {/* Location Advantage / Surroundings */}
              <div className='bg-[#132A22] border border-[#B8925A]/15 p-8 rounded-2xl space-y-6 shadow-xl'>
                <div className='flex items-center gap-3'>
                  <span className='est-display text-[#B8925A] text-sm'>05</span>
                  <div className='h-px flex-1 est-hairline' />
                  <h2 className='est-display text-2xl font-medium text-[#EFE9DD]'>Location Advantage &amp; Surroundings</h2>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                  {(listing.nearby && listing.nearby.length > 0
                    ? listing.nearby
                    : ['Near City Center', 'Easy Connectivity', 'Expressway Access', 'Educational Hubs', 'Nearby Hospitals', 'Shopping Facilities']
                  ).map((advantage, index) => (
                    <div key={index} className='flex items-center gap-3 p-4 rounded-xl border border-[#B8925A]/10 bg-[#0E211B]/50'>
                      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#B8925A]/20 text-[#B8925A]'>
                        <FaCheck className='text-sm' />
                      </div>
                      <span className='text-sm font-medium text-[#EFE9DD]/80'>{advantage}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Specifications */}
              {listing.specifications && listing.specifications.length > 0 && (
                <div className='bg-[#132A22] border border-[#B8925A]/15 p-8 rounded-2xl space-y-5 shadow-xl'>
                  <div className='flex items-center gap-3'>
                    <span className='est-display text-[#B8925A] text-sm'>06</span>
                    <div className='h-px flex-1 est-hairline' />
                    <h2 className='est-display text-2xl font-medium text-[#EFE9DD]'>Project Specifications</h2>
                  </div>
                  <ul className='space-y-3'>
                    {listing.specifications.map((item, index) => (
                      <li key={index} className='flex items-start gap-3 text-sm text-[#EFE9DD]/80'>
                        <span className='mt-1.5 h-1.5 w-1.5 rounded-full bg-[#B8925A] shrink-0' />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Payment Plan */}
              {listing.paymentPlan && (
                <div className='bg-[#132A22] border border-[#B8925A]/15 p-8 rounded-2xl space-y-4 shadow-xl'>
                  <div className='flex items-center gap-3'>
                    <span className='est-display text-[#B8925A] text-sm'>07</span>
                    <div className='h-px flex-1 est-hairline' />
                    <h2 className='est-display text-2xl font-medium text-[#EFE9DD]'>Payment Plan</h2>
                  </div>
                  <div className='flex items-center gap-3 p-4 rounded-xl border border-[#B8925A]/10 bg-[#0E211B]/50 w-fit'>
                    <FaMoneyBillWave className='text-xl text-[#B8925A]' />
                    <span className='text-sm font-medium text-[#EFE9DD]/80'>{listing.paymentPlan}</span>
                  </div>
                </div>
              )}

              {/* Master Plan & Site Plan */}
              {(listing.masterPlanImage || listing.sitePlanImage) && (
                <div className='bg-[#132A22] border border-[#B8925A]/15 p-8 rounded-2xl space-y-6 shadow-xl'>
                  <div className='flex items-center gap-3'>
                    <span className='est-display text-[#B8925A] text-sm'>08</span>
                    <div className='h-px flex-1 est-hairline' />
                    <h2 className='est-display text-2xl font-medium text-[#EFE9DD]'>Master Plan &amp; Site Plan</h2>
                  </div>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    {listing.masterPlanImage && (
                      <div>
                        <p className='text-xs text-[#EFE9DD]/50 mb-2'>Master Plan</p>
                        <img
                          src={listing.masterPlanImage}
                          alt='Master Plan'
                          className='w-full h-64 object-cover rounded-2xl border border-[#B8925A]/15'
                        />
                      </div>
                    )}
                    {listing.sitePlanImage && (
                      <div>
                        <p className='text-xs text-[#EFE9DD]/50 mb-2'>Site Plan</p>
                        <img
                          src={listing.sitePlanImage}
                          alt='Site Plan'
                          className='w-full h-64 object-cover rounded-2xl border border-[#B8925A]/15'
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* About Builder */}
              {listing.builder && listing.builder.name && (
                <div className='bg-[#132A22] border border-[#B8925A]/15 p-8 rounded-2xl space-y-5 shadow-xl'>
                  <div className='flex items-center gap-3'>
                    <span className='est-display text-[#B8925A] text-sm'>09</span>
                    <div className='h-px flex-1 est-hairline' />
                    <h2 className='est-display text-2xl font-medium text-[#EFE9DD]'>About the Builder</h2>
                  </div>
                  <div className='flex flex-col sm:flex-row gap-6 items-start'>
                    {listing.builder.logo ? (
                      <img
                        src={listing.builder.logo}
                        alt={listing.builder.name}
                        className='h-16 w-16 object-contain rounded-xl bg-[#0E211B] p-2 border border-[#B8925A]/15 shrink-0'
                      />
                    ) : (
                      <div className='h-16 w-16 flex items-center justify-center rounded-xl bg-[#0E211B] border border-[#B8925A]/15 text-[#B8925A] shrink-0'>
                        <FaBuilding className='text-2xl' />
                      </div>
                    )}
                    <div>
                      <p className='est-display font-medium text-lg text-[#D9B383]'>{listing.builder.name}</p>
                      {listing.builder.description && (
                        <p className='mt-2 text-sm text-[#EFE9DD]/70 leading-relaxed'>{listing.builder.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* FAQs */}
              {listing.faqs && listing.faqs.length > 0 && (
                <div className='bg-[#132A22] border border-[#B8925A]/15 p-8 rounded-2xl space-y-4 shadow-xl'>
                  <div className='flex items-center gap-3'>
                    <span className='est-display text-[#B8925A] text-sm'>10</span>
                    <div className='h-px flex-1 est-hairline' />
                    <h2 className='est-display text-2xl font-medium text-[#EFE9DD]'>Frequently Asked Questions</h2>
                  </div>
                  <div className='space-y-3'>
                    {listing.faqs.map((faq, index) => (
                      <div key={index} className='rounded-xl border border-[#B8925A]/15 bg-[#0E211B]/50 overflow-hidden'>
                        <button
                          type='button'
                          onClick={() => setOpenFaq(openFaq === index ? null : index)}
                          className='w-full flex items-center justify-between gap-4 p-4 text-left'
                        >
                          <span className='text-sm font-semibold text-[#EFE9DD]'>{faq.question}</span>
                          <FaChevronDown
                            className={`text-[#B8925A] shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                          />
                        </button>
                        {openFaq === index && (
                          <p className='px-4 pb-4 text-sm text-[#EFE9DD]/70 leading-relaxed'>{faq.answer}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Sticky Contact / Inquiry Form Sidebar */}
            <div className='lg:col-span-1'>
              <div className='sticky top-24 bg-[#132A22] border border-[#B8925A]/25 rounded-2xl shadow-2xl overflow-hidden'>
                {/* Seal strip */}
                <div className='bg-[#0E211B] border-b border-[#B8925A]/20 px-6 py-4 flex items-center justify-between'>
                  <div>
                    <p className='est-eyebrow text-[9px] uppercase text-[#B8925A]'>
                      {listing.type === 'rent' ? 'Monthly Rent' : 'Asking Price'}
                    </p>
                    <p className='est-display text-xl font-medium text-[#EFE9DD]'>
                      &#8377;{displayPrice ? displayPrice.toLocaleString('en-IN') : ''}
                    </p>
                  </div>
                  <div className='h-10 w-10 rounded-full border border-[#B8925A]/40 flex items-center justify-center'>
                    <FaCheck className='text-[#B8925A] text-sm' />
                  </div>
                </div>

                <div className='p-6 space-y-6'>
                  <div>
                    <h3 className='est-display text-2xl font-medium text-[#EFE9DD]'>Enquire about this property</h3>
                    <p className='text-xs text-[#EFE9DD]/50 mt-1'>Our consultant will respond within 2 working hours.</p>
                  </div>

                  {currentUser && listing.userRef !== currentUser._id && !contact && (
                    <button
                      onClick={() => setContact(true)}
                      className='w-full bg-[#B8925A] text-[#0E211B] font-semibold rounded-xl est-eyebrow uppercase text-xs hover:bg-[#D9B383] transition-colors p-4 cursor-pointer text-center shadow-lg'
                    >
                      Contact Landlord
                    </button>
                  )}

                  {contact && <Contact listing={listing} />}

                  {/* Enquiry / Contact Us Button linked to /signup */}
                  <Link
                    to='/signup'
                    className='block w-full bg-transparent border border-[#B8925A] text-[#D9B383] font-semibold rounded-xl est-eyebrow uppercase text-xs hover:bg-[#B8925A] hover:text-[#0E211B] transition-colors p-4 text-center'
                  >
                    Contact us about this property
                  </Link>

                  <p className='text-[11px] text-[#EFE9DD]/40 text-center leading-relaxed pt-2'>
                    We never share your details. No spam, no unsolicited calls from developers.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div className='fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4'>
          {/* Close Button */}
          <button
            type='button'
            onClick={() => setSelectedImageIndex(null)}
            className='absolute top-6 right-6 z-50 text-[#EFE9DD] hover:text-[#B8925A] text-3xl font-bold bg-[#132A22]/80 border border-[#B8925A]/30 w-12 h-12 rounded-full flex items-center justify-center transition-colors'
          >
            &times;
          </button>

          {/* Counter Badge */}
          <div className='absolute top-6 left-6 z-50 text-sm font-semibold text-[#EFE9DD] bg-[#132A22]/80 border border-[#B8925A]/30 px-4 py-2 rounded-full'>
            {selectedImageIndex + 1} / {galleryImages.length}
          </div>

          {/* Previous Arrow */}
          {galleryImages.length > 1 && (
            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
              }}
              className='absolute left-4 sm:left-8 z-50 h-12 w-12 flex items-center justify-center rounded-full bg-[#132A22]/80 border border-[#B8925A]/30 text-[#EFE9DD] hover:border-[#B8925A] hover:text-[#B8925A] transition-colors'
            >
              <FaChevronLeft className='text-lg' />
            </button>
          )}

          {/* Current Image */}
          <div className='relative max-w-5xl max-h-[85vh] flex items-center justify-center'>
            <img
              src={galleryImages[selectedImageIndex]}
              alt={`Gallery view ${selectedImageIndex + 1}`}
              className='max-h-[85vh] max-w-full object-contain rounded-2xl border border-[#B8925A]/30 shadow-2xl'
            />
          </div>

          {/* Next Arrow */}
          {galleryImages.length > 1 && (
            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
              }}
              className='absolute right-4 sm:right-8 z-50 h-12 w-12 flex items-center justify-center rounded-full bg-[#132A22]/80 border border-[#B8925A]/30 text-[#EFE9DD] hover:border-[#B8925A] hover:text-[#B8925A] transition-colors'
            >
              <FaChevronRight className='text-lg' />
            </button>
          )}
        </div>
      )}
    </main>
  );
}