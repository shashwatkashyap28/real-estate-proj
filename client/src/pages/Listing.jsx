import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
} from 'react-icons/fa';
import Contact from '../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
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

  return (
    <main className='min-h-screen bg-[#0E211B] text-[#EFE9DD]'>
      {loading && (
        <p className='text-center py-24 text-xl text-[#EFE9DD]/60'>
          Loading...
        </p>
      )}
      {error && (
        <p className='text-center py-24 text-xl text-[#EFE9DD]/60'>
          Something went wrong!
        </p>
      )}
      {listing && !loading && !error && (
        <div>
          {/* FIX: h-550px / max-w-200px are not valid Tailwind classes
              (need bracket syntax) and were being silently dropped. */}
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[300px] sm:h-[420px] md:h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='fixed top-[10%] right-[4%] sm:top-[13%] sm:right-[3%] z-10 border border-[#B8925A]/40 rounded-full w-11 h-11 sm:w-12 sm:h-12 flex justify-center items-center bg-[#132A22] cursor-pointer hover:border-[#B8925A] transition-colors'>
            <FaShare
              className='text-[#EFE9DD]/70'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[19%] right-[4%] sm:top-[23%] sm:right-[5%] z-10 rounded-md bg-[#132A22] border border-[#B8925A]/30 text-[#EFE9DD] p-2 text-sm'>
              Link copied!
            </p>
          )}

          <div className='flex flex-col max-w-4xl mx-auto p-4 sm:p-6 my-7 gap-4'>
            <p className='text-xl sm:text-2xl font-semibold break-words'>
              {listing.name} - $
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-4 gap-2 text-[#EFE9DD]/60 text-sm'>
              <FaMapMarkerAlt className='text-[#B8925A] shrink-0' />
              {listing.address}
            </p>

            <div className='flex flex-wrap gap-3'>
              <p className='bg-[#B8925A] w-full max-w-[200px] text-[#0E211B] font-semibold text-center py-1.5 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-[#132A22] border border-[#B8925A]/40 w-full max-w-[200px] text-[#D9B383] font-semibold text-center py-1.5 rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>

            <p className='text-[#EFE9DD]/80 leading-7'>
              <span className='font-semibold text-[#EFE9DD]'>Description — </span>
              {listing.description}
            </p>

            <ul className='text-[#D9B383] font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6 border-t border-[#B8925A]/15 pt-5'>
              <li className='flex items-center gap-1.5 whitespace-nowrap'>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className='flex items-center gap-1.5 whitespace-nowrap'>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </li>
              <li className='flex items-center gap-1.5 whitespace-nowrap'>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1.5 whitespace-nowrap'>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-[#B8925A] text-[#0E211B] font-semibold rounded-lg uppercase tracking-wide hover:bg-[#D9B383] transition-colors p-3'
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}