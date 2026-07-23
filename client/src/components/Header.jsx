import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// Fallback avatar matching your project standard
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

  const isActive = (path) => location.pathname === path;

  return (
    <header className='sticky top-0 z-50 bg-[#132A22] border-b border-[#B8925A]/35 shadow-md'>
      <div className='flex justify-between items-center gap-4 max-w-7xl mx-auto px-4 sm:px-6 py-3'>
        
        {/* Left: Wordmark */}
        <Link to='/' className='shrink-0'>
          <h1 className='flex items-center gap-1.5 font-serif text-lg sm:text-2xl tracking-tight'>
            <FaMapMarkerAlt className='text-[#B8925A] text-base sm:text-lg mb-0.5' />
            <span className='text-[#EFE9DD]'>GO</span>
            <span className='text-[#B8925A]'>REALTORS</span>
          </h1>
        </Link>

        {/* Center: Pill Navigation Menu */}
        <nav className='hidden lg:flex items-center bg-[#0E211B] border border-[#B8925A]/30 rounded-full p-1 shadow-inner'>
          <Link
            to='/'
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              isActive('/')
                ? 'bg-[#B8925A] text-[#0E211B] shadow-md font-semibold'
                : 'text-[#EFE9DD]/80 hover:text-[#EFE9DD]'
            }`}
          >
            Home
          </Link>
          <Link
            to='/about'
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              isActive('/about')
                ? 'bg-[#B8925A] text-[#0E211B] shadow-md font-semibold'
                : 'text-[#EFE9DD]/80 hover:text-[#EFE9DD]'
            }`}
          >
            About
          </Link>
          <Link
            to='/blog'
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              isActive('/blog')
                ? 'bg-[#B8925A] text-[#0E211B] shadow-md font-semibold'
                : 'text-[#EFE9DD]/80 hover:text-[#EFE9DD]'
            }`}
          >
            Blog
          </Link>
          <Link
            to='/search'
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              isActive('/search')
                ? 'bg-[#B8925A] text-[#0E211B] shadow-md font-semibold'
                : 'text-[#EFE9DD]/80 hover:text-[#EFE9DD]'
            }`}
          >
            Properties
          </Link>
        </nav>

        {/* Right: Search Bar & Profile/Auth */}
        <div className='flex items-center gap-3'>
          <form
            onSubmit={handleSubmit}
            className='hidden sm:flex items-center max-w-xs bg-[#0E211B] border border-[#B8925A]/25 rounded-full pl-4 pr-1.5 py-1.5 focus-within:border-[#B8925A]/70 transition-colors'
          >
            <input
              type='text'
              placeholder='Search location...'
              className='bg-transparent focus:outline-none w-full text-xs sm:text-sm text-[#EFE9DD] placeholder:text-[#EFE9DD]/40'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type='submit'
              aria-label='Search listings'
              className='shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-[#B8925A] text-[#0E211B] hover:bg-[#D9B383] transition-colors'
            >
              <FaSearch className='text-[10px]' />
            </button>
          </form>

          <Link to='/profile' className='shrink-0'>
            {currentUser ? (
              <img
                className='rounded-full h-8 w-8 object-cover border border-[#B8925A]/50 hover:border-[#B8925A] transition-colors bg-[#0E211B]'
                src={currentUser.avatar || DEFAULT_AVATAR}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = DEFAULT_AVATAR;
                }}
                alt='Your profile'
              />
            ) : (
              <span className='text-sm font-semibold text-[#0E211B] bg-[#B8925A] px-4 py-2 rounded-full hover:bg-[#D9B383] transition-colors shadow'>
                Sign in
              </span>
            )}
          </Link>
        </div>

      </div>
    </header>
  );
}