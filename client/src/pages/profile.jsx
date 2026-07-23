import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Stable default avatar matching the header
const DEFAULT_AVATAR =
  'https://res.cloudinary.com/dz9e1lo1v/image/upload/v1690326559/default-avatar_r4jjeq.png';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const CLOUDINARY_UPLOAD_PRESET = 'Real-estate-preset';
  const CLOUDINARY_CLOUD_NAME = 'btrv3nfn';

  const handleFileUpload = async (file) => {
    setFileUploadError(false);
    setFilePerc(10);

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      setFilePerc(40);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: data,
        }
      );

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      setFilePerc(80);
      const fileData = await res.json();

      setFormData((prev) => ({ ...prev, avatar: fileData.secure_url }));
      setFilePerc(100);
    } catch (error) {
      setFileUploadError(true);
      setFilePerc(0);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='min-h-screen bg-[#0E211B] py-10 px-4'>
      <div className='max-w-lg mx-auto'>
        <h1 className='font-serif text-3xl sm:text-4xl font-bold text-center text-[#EFE9DD] mb-8'>
          Profile
        </h1>

        <div className='bg-[#132A22] border border-[#B8925A]/20 rounded-2xl p-6 sm:p-8 shadow-xl'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type='file'
              ref={fileRef}
              hidden
              accept='image/*'
            />
            <div className='flex flex-col items-center'>
              <img
                onClick={() => fileRef.current.click()}
                src={formData.avatar || currentUser?.avatar || DEFAULT_AVATAR}
                alt='profile'
                className='rounded-full h-24 w-24 object-cover cursor-pointer border-2 border-[#B8925A]/40 hover:border-[#B8925A] transition-colors bg-[#0E211B]'
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = DEFAULT_AVATAR;
                }}
              />
              <p className='text-sm mt-3 min-h-[1.25rem]'>
                {fileUploadError ? (
                  <span className='text-red-400'>
                    Error uploading image (must be less than 2 MB)
                  </span>
                ) : filePerc > 0 && filePerc < 100 ? (
                  <span className='text-[#D9B383]'>{`Uploading ${filePerc}%`}</span>
                ) : filePerc === 100 ? (
                  <span className='text-[#D9B383]'>Image uploaded successfully!</span>
                ) : (
                  <span className='text-[#EFE9DD]/40'>Tap to change photo</span>
                )}
              </p>
            </div>

            <div>
              <label
                htmlFor='username'
                className='block text-xs font-semibold uppercase tracking-wide text-[#EFE9DD]/50 mb-1.5'
              >
                Username
              </label>
              <input
                type='text'
                placeholder='username'
                defaultValue={currentUser?.username}
                id='username'
                className='w-full bg-[#0E211B] border border-[#B8925A]/25 text-[#EFE9DD] placeholder:text-[#EFE9DD]/30 p-3 rounded-lg outline-none focus:border-[#B8925A] transition-colors'
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
                placeholder='email'
                id='email'
                defaultValue={currentUser?.email}
                className='w-full bg-[#0E211B] border border-[#B8925A]/25 text-[#EFE9DD] placeholder:text-[#EFE9DD]/30 p-3 rounded-lg outline-none focus:border-[#B8925A] transition-colors'
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-xs font-semibold uppercase tracking-wide text-[#EFE9DD]/50 mb-1.5'
              >
                New password
              </label>
              <input
                type='password'
                placeholder='••••••••'
                onChange={handleChange}
                id='password'
                className='w-full bg-[#0E211B] border border-[#B8925A]/25 text-[#EFE9DD] placeholder:text-[#EFE9DD]/30 p-3 rounded-lg outline-none focus:border-[#B8925A] transition-colors'
              />
            </div>

            <button
              disabled={loading}
              className='mt-2 bg-[#B8925A] text-[#0E211B] font-semibold rounded-lg p-3 uppercase tracking-wide hover:bg-[#D9B383] transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
            >
              {loading ? 'Loading...' : 'Update'}
            </button>

            <Link
              className='bg-transparent border border-[#B8925A]/50 text-[#D9B383] p-3 rounded-lg uppercase tracking-wide text-center hover:bg-[#B8925A]/10 transition-colors'
              to={'/create-listing'}
            >
              Create Listing
            </Link>
          </form>

          <div className='flex justify-between mt-6 text-sm'>
            <button
              onClick={handleDeleteUser}
              className='text-red-400 hover:text-red-300 transition-colors'
            >
              Delete account
            </button>
            <button
              onClick={handleSignOut}
              className='text-red-400 hover:text-red-300 transition-colors'
            >
              Sign out
            </button>
          </div>

          {error && <p className='text-red-400 text-sm mt-4'>{error}</p>}
          {updateSuccess && (
            <p className='text-[#D9B383] text-sm mt-4'>
              User is updated successfully!
            </p>
          )}
        </div>

        <button
          onClick={handleShowListings}
          className='w-full mt-6 text-[#D9B383] hover:text-[#EFE9DD] font-semibold transition-colors text-sm'
        >
          Show My Listings
        </button>
        {showListingsError && (
          <p className='text-red-400 text-sm text-center mt-2'>
            Error showing listings
          </p>
        )}

        {userListings && userListings.length > 0 && (
          <div className='flex flex-col gap-4 mt-6'>
            <h2 className='text-center text-xl font-serif font-semibold text-[#EFE9DD]'>
              Your Listings
            </h2>
            {userListings.map((listing) => (
              <div
                key={listing._id}
                className='bg-[#132A22] border border-[#B8925A]/15 rounded-xl p-3 flex items-center gap-4'
              >
                <Link to={`/listing/${listing._id}`} className='shrink-0'>
                  <img
                    src={listing.imageUrls[0]}
                    alt='listing cover'
                    className='h-16 w-16 object-cover rounded-lg'
                  />
                </Link>
                <Link
                  className='text-[#EFE9DD] font-semibold hover:text-[#D9B383] truncate flex-1 transition-colors'
                  to={`/listing/${listing._id}`}
                >
                  {listing.name}
                </Link>

                <div className='flex flex-col items-end gap-1 text-xs shrink-0'>
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className='text-red-400 hover:text-red-300 uppercase font-semibold transition-colors'
                  >
                    Delete
                  </button>
                  <Link
                    to={`/update-listing/${listing._id}`}
                    className='text-[#D9B383] hover:text-[#EFE9DD] uppercase font-semibold transition-colors'
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}