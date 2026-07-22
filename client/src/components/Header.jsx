import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// Fallback avatar for users with no avatar set (e.g. email/password signup,
// which never assigns one) — prevents the broken-image icon.
const DEFAULT_AVATAR =
  'https://res.cloudinary.com/dz9e1lo1v/image/upload/v1690326559/default-avatar_r4jjeq.png';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='sticky top-0 z-50 bg-[#132A22] border-b border-[#B8925A]/30'>
      <div className='flex justify-between items-center gap-4 max-w-6xl mx-auto px-4 sm:px-6 py-3'>
        {/* Wordmark */}
        <Link to='/' className='shrink-0'>
          <h1 className='flex items-center gap-1.5 font-serif text-lg sm:text-2xl tracking-tight'>
            <FaMapMarkerAlt className='text-[#B8925A] text-base sm:text-lg mb-0.5' />
            <span className='text-[#EFE9DD]'>GO</span>
            <span className='text-[#B8925A]'>REALTORS</span>
          </h1>
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSubmit}
          className='flex items-center flex-1 max-w-md bg-[#0E211B] border border-[#B8925A]/25 rounded-full pl-4 pr-1.5 py-1.5 focus-within:border-[#B8925A]/70 transition-colors'
        >
          <input
            type='text'
            placeholder='Search by city, address, or zip...'
            className='bg-transparent focus:outline-none w-full text-sm text-[#EFE9DD] placeholder:text-[#EFE9DD]/40'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type='submit'
            aria-label='Search listings'
            className='shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-[#B8925A] text-[#0E211B] hover:bg-[#c9a06b] transition-colors'
          >
            <FaSearch className='text-xs' />
          </button>
        </form>

        {/* Nav */}
        <nav className='flex items-center gap-5 shrink-0'>
          <Link
            to='/'
            className='hidden sm:inline text-sm text-[#EFE9DD]/80 hover:text-[#EFE9DD] transition-colors'
          >
            Home
          </Link>
          <Link
            to='/about'
            className='hidden sm:inline text-sm text-[#EFE9DD]/80 hover:text-[#EFE9DD] transition-colors'
          >
            About
          </Link>
          <Link to='/profile' className='shrink-0'>
            {currentUser ? (
              <img
                className='rounded-full h-8 w-8 object-cover border border-[#B8925A]/50 hover:border-[#B8925A] transition-colors'
                src={currentUser.avatar || DEFAULT_AVATAR}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = DEFAULT_AVATAR;
                }}
                alt='Your profile'
              />
            ) : (
              <span className='text-sm font-medium text-[#0E211B] bg-[#B8925A] px-3.5 py-1.5 rounded-full hover:bg-[#c9a06b] transition-colors'>
                Sign in
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}