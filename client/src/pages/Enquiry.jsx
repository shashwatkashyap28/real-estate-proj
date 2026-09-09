import { useState } from 'react';
import { safeFetchJson } from '../utils/api';

const PROPERTY_TYPES = ['Buy', 'Rent', 'Sell', 'Just browsing'];

export default function Enquiry() {
  const [formData, setFormData] = useState({ interest: 'Buy' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleInterestSelect = (value) => {
    setFormData({ ...formData, interest: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError('Please provide your name and email address');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await safeFetchJson('/api/enquiry/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!data || data.success === false) {
        setLoading(false);
        setError(data?.message || 'Failed to submit enquiry. Please try again.');
        return;
      }

      setLoading(false);
      setSuccess(true);
      setFormData({ interest: 'Buy' });
    } catch (err) {
      setLoading(false);
      setError(err.message || 'An error occurred while sending your enquiry');
    }
  };

  return (
    <div className='min-h-[calc(100vh-64px)] bg-[#0E211B] flex items-center justify-center px-4 py-12'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
          <h1 className='font-serif text-3xl sm:text-4xl font-bold text-[#EFE9DD]'>
            Talk to Us
          </h1>
          <p className='mt-2 text-[#EFE9DD]/50 text-sm'>
            Tell us what you're looking for and our property experts will get back to you within 24 hours.
          </p>
        </div>

        <div className='bg-[#132A22] border border-[#B8925A]/20 rounded-2xl p-6 sm:p-8 shadow-xl'>
          {success ? (
            <div className='text-center py-8'>
              <div className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mb-4'>
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7' />
                </svg>
              </div>
              <p className='text-[#EFE9DD] font-semibold text-lg'>
                Thanks — we've received your enquiry!
              </p>
              <p className='text-[#EFE9DD]/50 text-sm mt-2'>
                A personal property advisor will reach out to you shortly.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className='mt-6 text-[#B8925A] hover:text-[#D9B383] font-semibold text-sm transition-colors'
              >
                Submit another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-xs font-semibold uppercase tracking-wide text-[#EFE9DD]/50 mb-1.5'
                >
                  Full name
                </label>
                <input
                  type='text'
                  placeholder='Jane Doe'
                  className='w-full bg-[#0E211B] border border-[#B8925A]/25 text-[#EFE9DD] placeholder:text-[#EFE9DD]/30 p-3 rounded-lg outline-none focus:border-[#B8925A] transition-colors'
                  id='name'
                  required
                  onChange={handleChange}
                />
              </div>

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
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor='phone'
                  className='block text-xs font-semibold uppercase tracking-wide text-[#EFE9DD]/50 mb-1.5'
                >
                  Phone
                </label>
                <input
                  type='tel'
                  placeholder='+91 98765 43210'
                  className='w-full bg-[#0E211B] border border-[#B8925A]/25 text-[#EFE9DD] placeholder:text-[#EFE9DD]/30 p-3 rounded-lg outline-none focus:border-[#B8925A] transition-colors'
                  id='phone'
                  onChange={handleChange}
                />
              </div>

              <div>
                <span className='block text-xs font-semibold uppercase tracking-wide text-[#EFE9DD]/50 mb-1.5'>
                  I'm looking to
                </span>
                <div className='grid grid-cols-2 gap-2'>
                  {PROPERTY_TYPES.map((option) => (
                    <button
                      type='button'
                      key={option}
                      onClick={() => handleInterestSelect(option)}
                      className={`p-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                        formData.interest === option
                          ? 'bg-[#B8925A] text-[#0E211B] border-[#B8925A]'
                          : 'bg-[#0E211B] text-[#EFE9DD]/70 border-[#B8925A]/25 hover:border-[#B8925A]/50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='block text-xs font-semibold uppercase tracking-wide text-[#EFE9DD]/50 mb-1.5'
                >
                  Message
                </label>
                <textarea
                  placeholder='Budget, preferred location, timeline...'
                  rows={4}
                  className='w-full bg-[#0E211B] border border-[#B8925A]/25 text-[#EFE9DD] placeholder:text-[#EFE9DD]/30 p-3 rounded-lg outline-none focus:border-[#B8925A] transition-colors resize-none'
                  id='message'
                  onChange={handleChange}
                />
              </div>

              <button
                disabled={loading}
                className='mt-2 bg-[#B8925A] text-[#0E211B] font-semibold p-3 rounded-lg uppercase tracking-wide hover:bg-[#D9B383] transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
              >
                {loading ? 'Sending...' : 'Send Enquiry'}
              </button>
            </form>
          )}

          {error && (
            <p className='text-red-400 text-sm mt-4 text-center'>{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}