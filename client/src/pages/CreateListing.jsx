import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  // Must exactly match the preset name in your Cloudinary dashboard, and
  // must be the SAME name used in UpdateListing.jsx and profile.jsx.
  const CLOUDINARY_UPLOAD_PRESET = 'Real-estate-preset';
  const CLOUDINARY_CLOUD_NAME = 'btrv3nfn';

  const storeImage = async (file) => {
    return new Promise(async (resolve, reject) => {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: data,
          }
        );

        if (!res.ok) {
          throw new Error('Failed to upload image to Cloudinary');
        }

        const responseData = await res.json();
        resolve(responseData.secure_url);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const inputCls =
    'w-full bg-[#0E211B] border border-[#B8925A]/25 text-[#EFE9DD] placeholder:text-[#EFE9DD]/30 p-3 rounded-lg outline-none focus:border-[#B8925A] transition-colors';
  const checkboxCls = 'w-4 h-4 accent-[#B8925A] cursor-pointer';
  const numberBoxCls =
    'w-24 bg-[#0E211B] border border-[#B8925A]/25 text-[#EFE9DD] p-3 rounded-lg outline-none focus:border-[#B8925A] transition-colors';

  return (
    <main className='min-h-screen bg-[#0E211B] py-10 px-4'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='font-serif text-3xl sm:text-4xl font-bold text-center text-[#EFE9DD] mb-8'>
          Create a Listing
        </h1>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col lg:flex-row gap-6'
        >
          <div className='flex flex-col gap-4 flex-1 bg-[#132A22] border border-[#B8925A]/20 rounded-2xl p-6 sm:p-8'>
            <input
              type='text'
              placeholder='Property name'
              className={inputCls}
              id='name'
              maxLength='62'
              minLength='10'
              required
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              placeholder='Description'
              className={`${inputCls} min-h-[120px] resize-y`}
              id='description'
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type='text'
              placeholder='Address'
              className={inputCls}
              id='address'
              required
              onChange={handleChange}
              value={formData.address}
            />

            <div className='flex gap-x-6 gap-y-3 flex-wrap pt-1'>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='sale'
                  className={checkboxCls}
                  onChange={handleChange}
                  checked={formData.type === 'sale'}
                />
                <span className='text-sm text-[#EFE9DD]/80'>Sell</span>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='rent'
                  className={checkboxCls}
                  onChange={handleChange}
                  checked={formData.type === 'rent'}
                />
                <span className='text-sm text-[#EFE9DD]/80'>Rent</span>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='parking'
                  className={checkboxCls}
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <span className='text-sm text-[#EFE9DD]/80'>Parking spot</span>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='furnished'
                  className={checkboxCls}
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <span className='text-sm text-[#EFE9DD]/80'>Furnished</span>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  id='offer'
                  className={checkboxCls}
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <span className='text-sm text-[#EFE9DD]/80'>Offer</span>
              </div>
            </div>

            <div className='flex flex-wrap gap-5 pt-1'>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='bedrooms'
                  min='1'
                  max='10'
                  required
                  className={numberBoxCls}
                  onChange={handleChange}
                  value={formData.bedrooms}
                />
                <p className='text-sm text-[#EFE9DD]/60'>Beds</p>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='bathrooms'
                  min='1'
                  max='10'
                  required
                  className={numberBoxCls}
                  onChange={handleChange}
                  value={formData.bathrooms}
                />
                <p className='text-sm text-[#EFE9DD]/60'>Baths</p>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='regularPrice'
                  min='50'
                  max='10000000'
                  required
                  className={numberBoxCls}
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className='flex flex-col'>
                  <p className='text-sm text-[#EFE9DD]/60'>Regular price</p>
                  {formData.type === 'rent' && (
                    <span className='text-xs text-[#EFE9DD]/40'>($ / month)</span>
                  )}
                </div>
              </div>
              {formData.offer && (
                <div className='flex items-center gap-2'>
                  <input
                    type='number'
                    id='discountPrice'
                    min='0'
                    max='10000000'
                    required
                    className={numberBoxCls}
                    onChange={handleChange}
                    value={formData.discountPrice}
                  />
                  <div className='flex flex-col'>
                    <p className='text-sm text-[#EFE9DD]/60'>Discounted price</p>
                    {formData.type === 'rent' && (
                      <span className='text-xs text-[#EFE9DD]/40'>($ / month)</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className='flex flex-col flex-1 gap-4 bg-[#132A22] border border-[#B8925A]/20 rounded-2xl p-6 sm:p-8'>
            <p className='font-semibold text-[#EFE9DD]'>
              Images
              <span className='block font-normal text-[#EFE9DD]/50 text-sm mt-1'>
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className='flex flex-col sm:flex-row gap-3'>
              <input
                onChange={(e) => setFiles(e.target.files)}
                className='flex-1 bg-[#0E211B] border border-[#B8925A]/25 text-[#EFE9DD]/70 text-sm rounded-lg p-3 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-[#B8925A]/20 file:text-[#D9B383] file:cursor-pointer'
                type='file'
                id='images'
                accept='image/*'
                multiple
              />
              <button
                type='button'
                disabled={uploading}
                onClick={handleImageSubmit}
                className='px-5 py-3 text-[#D9B383] border border-[#B8925A]/50 rounded-lg uppercase text-sm font-semibold hover:bg-[#B8925A]/10 transition-colors disabled:opacity-60'
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
            {imageUploadError && (
              <p className='text-red-400 text-sm'>{imageUploadError}</p>
            )}

            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className='flex justify-between p-3 border border-[#B8925A]/15 rounded-lg items-center bg-[#0E211B]'
                >
                  <img
                    src={url}
                    alt='listing image'
                    className='w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg'
                  />
                  <button
                    type='button'
                    onClick={() => handleRemoveImage(index)}
                    className='text-red-400 hover:text-red-300 text-sm font-semibold uppercase transition-colors'
                  >
                    Delete
                  </button>
                </div>
              ))}

            <button
              disabled={loading || uploading}
              className='mt-auto bg-[#B8925A] text-[#0E211B] font-semibold rounded-lg p-3 uppercase tracking-wide hover:bg-[#D9B383] transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
            >
              {loading ? 'Creating...' : 'Create listing'}
            </button>
            {error && <p className='text-red-400 text-sm'>{error}</p>}
          </div>
        </form>
      </div>
    </main>
  );
}