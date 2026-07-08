import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-black shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="transition-transform duration-300 hover:scale-105"
        >
          <h1 className="flex items-center text-3xl sm:text-3xl font-black tracking-wider uppercase">
            <span className="text-white">GO</span>
            <span className="text-green-500 ml-2">REALTOR</span>
          </h1>
        </Link>

        {/* Search Bar */}
        <form className="bg-white px-4 py-3 rounded-full flex items-center shadow-md">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-28 sm:w-72 text-black placeholder-gray-500"
          />
          <FaSearch className="text-gray-600 text-lg cursor-pointer hover:text-green-500 transition-colors" />
        </form>

        {/* Navigation */}
        <ul className="flex items-center gap-6 font-medium">
          <Link to="/">
            <li className="hidden sm:inline text-white hover:text-green-500 transition-colors duration-300">
              HOME
            </li>
          </Link>

          <Link to="/about">
            <li className="hidden sm:inline text-white hover:text-green-500 transition-colors duration-300">
              ABOUT
            </li>
          </Link>

          <Link to="/signin">
            <li className="text-white hover:text-green-500 transition-colors duration-300">
              SIGN IN
            </li>
          </Link>
        </ul>

      </div>
    </header>
  );
}