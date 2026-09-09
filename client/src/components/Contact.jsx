import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { safeFetchJson } from '../utils/api';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      if (!listing?.userRef) return;
      try {
        const data = await safeFetchJson(`/api/user/${listing.userRef}`);
        if (data && data.success !== false && data.username) {
          setLandlord(data);
        } else {
          setError(data?.message || 'Could not load agent details');
        }
      } catch (err) {
        console.error('Failed to fetch landlord details:', err);
        setError('Could not connect to agent service');
      }
    };

    fetchLandlord();
  }, [listing?.userRef]);

  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-3'>
          <p className='text-sm text-[#EFE9DD]/80'>
            Contact <span className='font-semibold text-[#B8925A]'>{landlord.username}</span> for{' '}
            <span className='font-semibold text-[#EFE9DD]'>{listing.name}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='3'
            value={message}
            onChange={onChange}
            placeholder='Enter your message or inquiry here...'
            className='w-full bg-[#0E211B] border border-[#B8925A]/25 text-[#EFE9DD] placeholder:text-[#EFE9DD]/30 p-3 rounded-lg outline-none focus:border-[#B8925A] transition-colors resize-none'
          />

          <Link
            to={`mailto:${landlord.email}?subject=${encodeURIComponent(
              `Regarding ${listing.name}`
            )}&body=${encodeURIComponent(message)}`}
            className='bg-[#B8925A] text-[#0E211B] text-center p-3 uppercase rounded-lg font-semibold hover:bg-[#D9B383] transition-colors'
          >
            Send Email
          </Link>
        </div>
      )}
      {error && !landlord && (
        <p className='text-xs text-[#EFE9DD]/40 mt-1'>{error}</p>
      )}
    </>
  );
}