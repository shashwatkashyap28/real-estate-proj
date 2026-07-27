import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';

export default function ListingItem({ listing }) {
  return (
    <Link
      to={`/listing/${listing._id}`}
      className='group relative flex flex-col overflow-hidden rounded-3xl bg-[#132A22] border border-[#B8925A]/15 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#B8925A]/50'
    >
      {/* Image with overlaid title/address */}
      <div className='relative h-56 overflow-hidden'>
        <img
          src={
            listing.imageUrls?.[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt={listing.name}
          className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-[#0E211B] via-[#0E211B]/15 to-transparent' />

        <span className='absolute top-4 left-4 bg-[#B8925A] text-[#0E211B] px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-md'>
          {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
        </span>

        {listing.offer && (
          <span className='absolute top-4 right-4 bg-[#0E211B]/85 backdrop-blur-md border border-[#B8925A]/40 text-[#D9B383] px-3 py-1.5 rounded-full text-[11px] font-semibold'>
            {(+listing.regularPrice - +listing.discountPrice).toLocaleString('en-US')} OFF
          </span>
        )}

        <div className='absolute bottom-0 left-0 right-0 p-5'>
          <p className='font-serif text-lg font-semibold text-[#EFE9DD] leading-snug truncate group-hover:text-[#D9B383] transition-colors'>
            {listing.name}
          </p>
          <p className='flex items-center gap-1.5 mt-1.5 text-xs text-[#EFE9DD]/60'>
            <FaMapMarkerAlt className='text-[#B8925A] shrink-0' />
            <span className='truncate'>{listing.address}</span>
          </p>
        </div>
      </div>

      {/* Description + specs + price footer */}
      <div className='flex flex-1 flex-col gap-4 p-5'>
        <p className='text-sm text-[#EFE9DD]/55 line-clamp-2 leading-relaxed'>
          {listing.description}
        </p>

        <div className='flex items-center gap-4 text-xs text-[#EFE9DD]/60 mt-auto'>
          <span className='flex items-center gap-1.5'>
            <FaBed className='text-[#B8925A]' />
            {listing.bedrooms} {listing.bedrooms > 1 ? 'Beds' : 'Bed'}
          </span>
          <span className='flex items-center gap-1.5'>
            <FaBath className='text-[#B8925A]' />
            {listing.bathrooms} {listing.bathrooms > 1 ? 'Baths' : 'Bath'}
          </span>
        </div>

        <div className='flex items-center justify-between pt-4 border-t border-[#B8925A]/15'>
          <p className='text-lg font-bold text-[#B8925A]'>
            
            {(listing.offer ? listing.discountPrice : listing.regularPrice)?.toLocaleString(
              'en-US'
            )}
            {listing.type === 'rent' && (
              <span className='text-xs font-normal text-[#EFE9DD]/40'> /mo</span>
            )}
          </p>
          <span className='inline-flex items-center gap-1.5 text-xs font-semibold text-[#D9B383] group-hover:gap-2.5 transition-all'>
            View Details <FaChevronRight className='text-[10px]' />
          </span>
        </div>
      </div>
    </Link>
  );
}