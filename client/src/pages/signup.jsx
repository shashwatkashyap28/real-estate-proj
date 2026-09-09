import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { safeFetchJson } from '../utils/api' ;

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setError('Please fill in all fields (username, email, password)');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await safeFetchJson('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!data || data.success === false) {
        setLoading(false);
        setError(data?.message || 'Failed to create account. Please try again.');
        return;
      }

      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/signin');
      }, 1500);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'An error occurred during sign-up');
    }
  };

  return (
    <div className='min-h-[calc(100vh-64px)] bg-[#0E211B] flex items-center justify-center px-4 py-12'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <h1 className='font-serif text-3xl sm:text-4xl font-bold text-[#EFE9DD]'>
            Create an account
          </h1>
          <p className='mt-2 text-[#EFE9DD]/50 text-sm'>
            Join GO REALTORS to manage listings and save your favorite properties.
          </p>
        </div>

        <div className='bg-[#132A22] border border-[#B8925A]/20 rounded-2xl p-6 sm:p-8 shadow-xl'>
          {success ? (
            <div className='text-center py-6'>
              <div className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mb-4'>
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                </svg>
              </div>
              <h3 className='text-[#EFE9DD] font-semibold text-lg'>Account Created!</h3>
              <p className='text-[#EFE9DD]/60 text-sm mt-1'>Redirecting you to sign in...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <div>
                <label
                  htmlFor='username'
                  className='block text-xs font-semibold uppercase tracking-wide text-[#EFE9DD]/50 mb-1.5'
                >
                  Username
                </label>
                <input
                  type='text'
                  placeholder='janedoe'
                  className='w-full bg-[#0E211B] border border-[#B8925A]/25 text-[#EFE9DD] placeholder:text-[#EFE9DD]/30 p-3 rounded-lg outline-none focus:border-[#B8925A] transition-colors'
                  id='username'
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-xs font-semibold uppercase tracking-wide text-[#EFE9DD]/50 mb-1.5'
                >
                  Email Address
                </label>
                <input
                  type='email'
                  placeholder='you@example.com'
                  className='w-full bg-[#0E211B] border border-[#B8925A]/25 text-[#EFE9DD] placeholder:text-[#EFE9DD]/30 p-3 rounded-lg outline-none focus:border-[#B8925A] transition-colors'
                  id='email'
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-xs font-semibold uppercase tracking-wide text-[#EFE9DD]/50 mb-1.5'
                >
                  Password (min 6 characters)
                </label>
                <input
                  type='password'
                  placeholder='••••••••'
                  className='w-full bg-[#0E211B] border border-[#B8925A]/25 text-[#EFE9DD] placeholder:text-[#EFE9DD]/30 p-3 rounded-lg outline-none focus:border-[#B8925A] transition-colors'
                  id='password'
                  required
                  onChange={handleChange}
                />
              </div>

              <button
                disabled={loading}
                className='mt-2 bg-[#B8925A] text-[#0E211B] font-semibold p-3 rounded-lg uppercase tracking-wide hover:bg-[#D9B383] transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>

              <div className='flex items-center gap-3 my-1'>
                <span className='h-px flex-1 bg-[#B8925A]/15' />
                <span className='text-xs text-[#EFE9DD]/40'>or</span>
                <span className='h-px flex-1 bg-[#B8925A]/15' />
              </div>

              <OAuth />
            </form>
          )}

          {error && (
            <p className='text-red-400 text-sm mt-4 text-center'>{error}</p>
          )}
        </div>

        <div className='flex flex-col gap-2 mt-6 text-center text-sm'>
          <p className='text-[#EFE9DD]/50'>
            Already have an account?{' '}
            <Link to='/signin'>
              <span className='text-[#B8925A] hover:text-[#D9B383] font-semibold transition-colors'>
                Sign In
              </span>
            </Link>
          </p>
          <p className='text-[#EFE9DD]/40 text-xs'>
            Looking for a property consultation?{' '}
            <Link to='/enquiry'>
              <span className='text-[#B8925A]/80 hover:text-[#D9B383] font-medium underline transition-colors'>
                Send an Enquiry
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}