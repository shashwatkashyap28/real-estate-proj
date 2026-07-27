import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      // Admins land on the dashboard; Dashboard.jsx itself bounces
      // non-admin users back to '/' after checking currentUser.isAdmin.
      navigate('/dashboard');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='min-h-[calc(100vh-64px)] bg-[#0E211B] flex items-center justify-center px-4 py-12'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <h1 className='font-serif text-3xl sm:text-4xl font-bold text-[#EFE9DD]'>
            Welcome back
          </h1>
          <p className='mt-2 text-[#EFE9DD]/50 text-sm'>
            Sign in to manage your listings and saved properties.
          </p>
        </div>

        <div className='bg-[#132A22] border border-[#B8925A]/20 rounded-2xl p-6 sm:p-8 shadow-xl'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div>
              <label
                htmlFor='email'
                className='block text-xs font-semibold uppercase tracking-wide text-[#EFE9DD]/50 mb-1.5'
              >
                Email
              </label>
              <input
                type='email'
                placeholder='you@example.com'
                className='w-full bg-[#0E211B] border border-[#B8925A]/25 text-[#EFE9DD] placeholder:text-[#EFE9DD]/30 p-3 rounded-lg outline-none focus:border-[#B8925A] transition-colors'
                id='email'
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-xs font-semibold uppercase tracking-wide text-[#EFE9DD]/50 mb-1.5'
              >
                Password
              </label>
              <input
                type='password'
                placeholder='••••••••'
                className='w-full bg-[#0E211B] border border-[#B8925A]/25 text-[#EFE9DD] placeholder:text-[#EFE9DD]/30 p-3 rounded-lg outline-none focus:border-[#B8925A] transition-colors'
                id='password'
                onChange={handleChange}
              />
            </div>

            <button
              disabled={loading}
              className='mt-2 bg-[#B8925A] text-[#0E211B] font-semibold p-3 rounded-lg uppercase tracking-wide hover:bg-[#D9B383] transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>

            <div className='flex items-center gap-3 my-1'>
              <span className='h-px flex-1 bg-[#B8925A]/15' />
              <span className='text-xs text-[#EFE9DD]/40'>or</span>
              <span className='h-px flex-1 bg-[#B8925A]/15' />
            </div>

            <OAuth />
          </form>

          {error && (
            <p className='text-red-400 text-sm mt-4 text-center'>{error}</p>
          )}
        </div>

        <div className='flex justify-center gap-2 mt-6 text-sm'>
          <p className='text-[#EFE9DD]/50'>Tell Us Your Query </p>
          <Link to={'/signup'}>
            <span className='text-[#B8925A] hover:text-[#D9B383] font-semibold transition-colors'>
              ENQUIRY
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}