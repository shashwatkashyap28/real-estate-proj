import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
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
    propertyType: 'High Rise',
    status: 'Ready to Move',
    possessionYear: '',
    paymentPlan: '',
    masterPlanImage: '',
    sitePlanImage: '',
    nearby: [],
    specifications: [],
    builder: { name: '', logo: '', description: '' },
    faqs: [],
    location: null,
    galleryImages: [],
    youtubeLink: '',
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Additional-details input state
  const [nearbyInput, setNearbyInput] = useState('');
  const [specInput, setSpecInput] = useState('');
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const [masterPlanFile, setMasterPlanFile] = useState(null);
  const [sitePlanFile, setSitePlanFile] = useState(null);
  const [builderLogoFile, setBuilderLogoFile] = useState(null);
  const [uploadingMasterPlan, setUploadingMasterPlan] = useState(false);
  const [uploadingSitePlan, setUploadingSitePlan] = useState(false);
  const [uploadingBuilderLogo, setUploadingBuilderLogo] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      // Merge in defaults for any fields older listings may not have yet
      setFormData({
        ...data,
        propertyType: data.propertyType || 'High Rise',
        status: data.status || 'Ready to Move',
        possessionYear: data.possessionYear || '',
        paymentPlan: data.paymentPlan || '',
        masterPlanImage: data.masterPlanImage || '',
        sitePlanImage: data.sitePlanImage || '',
        nearby: data.nearby || [],
        specifications: data.specifications || [],
        builder: data.builder || { name: '', logo: '', description: '' },
        faqs: data.faqs || [],
        location: data.location || null,
        galleryImages: data.galleryImages || [],
        youtubeLink: data.youtubeLink || '',
      });
    };

    fetchListing();
  }, []);

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

  // Must exactly match the preset name used in CreateListing.jsx and
  // profile.jsx.
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

  // Single-image upload used for master plan / site plan / builder logo
  const uploadSingleImage = async (file, setUploadingFn, fieldName, isBuilderLogo = false) => {
    if (!file) return;
    setUploadingFn(true);
    setImageUploadError(false);
    try {
      const url = await storeImage(file);
      if (isBuilderLogo) {
        setFormData((prev) => ({ ...prev, builder: { ...prev.builder, logo: url } }));
      } else {
        setFormData((prev) => ({ ...prev, [fieldName]: url }));
      }
    } catch (err) {
      setImageUploadError('Image upload failed (2 mb max)');
    }
    setUploadingFn(false);
  };

  const addNearby = () => {
    if (!nearbyInput.trim()) return;
    setFormData({ ...formData, nearby: [...formData.nearby, nearbyInput.trim()] });
    setNearbyInput('');
  };
  const removeNearby = (index) => {
    setFormData({ ...formData, nearby: formData.nearby.filter((_, i) => i !== index) });
  };

  const addSpec = () => {
    if (!specInput.trim()) return;
    setFormData({ ...formData, specifications: [...formData.specifications, specInput.trim()] });
    setSpecInput('');
  };
  const removeSpec = (index) => {
    setFormData({ ...formData, specifications: formData.specifications.filter((_, i) => i !== index) });
  };

  const addFaq = () => {
    if (!faqQuestion.trim() || !faqAnswer.trim()) return;
    setFormData({
      ...formData,
      faqs: [...formData.faqs, { question: faqQuestion.trim(), answer: faqAnswer.trim() }],
    });
    setFaqQuestion('');
    setFaqAnswer('');
  };
  const removeFaq = (index) => {
    setFormData({ ...formData, faqs: formData.faqs.filter((_, i) => i !== index) });
  };

  const handleBuilderChange = (e) => {
    setFormData({
      ...formData,
      builder: { ...formData.builder, [e.target.name]: e.target.value },
    });
  };

  const [geocoding, setGeocoding] = useState(false);
  const [previewLocation, setPreviewLocation] = useState(null);
  const [previewingLocation, setPreviewingLocation] = useState(false);
  const [previewAttempted, setPreviewAttempted] = useState(false);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [galleryUploadError, setGalleryUploadError] = useState(false);

  // Turns the typed address into a lat/lng pin using OpenStreetMap's free
  // Nominatim geocoder (no API key required). Falls back to null if it
  // can't resolve the address; the map will still work off the address text.
  const geocodeAddress = async (address) => {
    if (!address) return null;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      }
    } catch (err) {
      console.error('Geocoding failed:', err);
    }
    return null;
  };

  const handlePreviewLocation = async () => {
    if (!formData.address) return;
    setPreviewingLocation(true);
    const loc = await geocodeAddress(formData.address);
    setPreviewLocation(loc);
    setPreviewAttempted(true);
    setPreviewingLocation(false);
  };

  const handleGalleryImageSubmit = () => {
    if (galleryFiles.length > 0 && galleryFiles.length + formData.galleryImages.length < 13) {
      setUploadingGallery(true);
      setGalleryUploadError(false);
      const promises = [];
      for (let i = 0; i < galleryFiles.length; i++) {
        promises.push(storeImage(galleryFiles[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData((prev) => ({
            ...prev,
            galleryImages: prev.galleryImages.concat(urls),
          }));
          setGalleryUploadError(false);
          setUploadingGallery(false);
        })
        .catch(() => {
          setGalleryUploadError('Image upload failed (2 mb max per image)');
          setUploadingGallery(false);
        });
    } else {
      setGalleryUploadError('You can only upload up to 12 gallery images');
      setUploadingGallery(false);
    }
  };

  const handleRemoveGalleryImage = (index) => {
    setFormData({
      ...formData,
      galleryImages: formData.galleryImages.filter((_, i) => i !== index),
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
      setGeocoding(true);
      const location = await geocodeAddress(formData.address);
      setGeocoding(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          location,
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
          Update a Listing
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
              {geocoding ? 'Locating address...' : loading ? 'Updating...' : 'Update listing'}
            </button>
            {error && <p className='text-red-400 text-sm'>{error}</p>}
          </div>
        </form>

        {/* ADDITIONAL DETAILS (detail-page content) */}
        <div>
          <div className='flex flex-col gap-8 bg-[#132A22] border border-[#B8925A]/20 rounded-2xl p-6 sm:p-8 mt-6'>
            <h2 className='font-serif text-xl font-bold text-[#EFE9DD]'>Additional Details</h2>

            {/* Gallery Images (separate from the main listing photos above) */}
            <div className='flex flex-col gap-3'>
              <label className='text-sm text-[#EFE9DD]/60'>
                Gallery Images
                <span className='block font-normal text-[#EFE9DD]/40 text-xs mt-0.5'>
                  Upload separate photos for the "In Pictures" gallery on the detail page — these don't have to be the same as your listing photos above (max 12).
                </span>
              </label>
              <div className='flex flex-col sm:flex-row gap-3'>
                <input
                  onChange={(e) => setGalleryFiles(e.target.files)}
                  className='flex-1 bg-[#0E211B] border border-[#B8925A]/25 text-[#EFE9DD]/70 text-sm rounded-lg p-3 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-[#B8925A]/20 file:text-[#D9B383] file:cursor-pointer'
                  type='file'
                  accept='image/*'
                  multiple
                />
                <button
                  type='button'
                  disabled={uploadingGallery}
                  onClick={handleGalleryImageSubmit}
                  className='px-5 py-3 text-[#D9B383] border border-[#B8925A]/50 rounded-lg uppercase text-sm font-semibold hover:bg-[#B8925A]/10 transition-colors disabled:opacity-60'
                >
                  {uploadingGallery ? 'Uploading...' : 'Upload'}
                </button>
              </div>
              {galleryUploadError && <p className='text-red-400 text-sm'>{galleryUploadError}</p>}
              {formData.galleryImages.length > 0 && (
                <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3'>
                  {formData.galleryImages.map((url, i) => (
                    <div key={url} className='relative rounded-lg overflow-hidden border border-[#B8925A]/15 h-20 group'>
                      <img src={url} alt={`Gallery ${i + 1}`} className='w-full h-full object-cover' />
                      <span className='absolute top-1 left-1 h-5 w-5 flex items-center justify-center rounded-full bg-[#0E211B]/70 text-[10px] font-semibold text-[#D9B383]'>
                        {i + 1}
                      </span>
                      <button
                        type='button'
                        onClick={() => handleRemoveGalleryImage(i)}
                        className='absolute inset-0 flex items-center justify-center bg-[#0E211B]/0 group-hover:bg-[#0E211B]/70 text-transparent group-hover:text-red-400 text-xs font-semibold uppercase transition-colors'
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* YouTube Video Link */}
            <div className='flex flex-col gap-2'>
              <label className='text-sm text-[#EFE9DD]/60'>
                YouTube Video Link
                <span className='block font-normal text-[#EFE9DD]/40 text-xs mt-0.5'>
                  Paste a YouTube URL — a "Watch Video" card will appear on the detail page and open this link when clicked.
                </span>
              </label>
              <input
                type='text'
                placeholder='https://www.youtube.com/watch?v=...'
                className={inputCls}
                value={formData.youtubeLink}
                onChange={(e) => setFormData({ ...formData, youtubeLink: e.target.value })}
              />
            </div>

            {/* Type / Status / Possession / Payment plan */}
            <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
              <div className='flex flex-col gap-1.5'>
                <label className='text-sm text-[#EFE9DD]/60'>Property Type</label>
                <select
                  className={inputCls}
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                >
                  <option>High Rise</option>
                  <option>Low Rise</option>
                  <option>Villa</option>
                  <option>Plot</option>
                  <option>Independent House</option>
                  <option>Commercial</option>
                </select>
              </div>
              <div className='flex flex-col gap-1.5'>
                <label className='text-sm text-[#EFE9DD]/60'>Status</label>
                <select
                  className={inputCls}
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option>Ready to Move</option>
                  <option>Under Construction</option>
                  <option>New Launch</option>
                </select>
              </div>
              <div className='flex flex-col gap-1.5'>
                <label className='text-sm text-[#EFE9DD]/60'>Possession Year</label>
                <input
                  type='text'
                  placeholder='e.g. 2026'
                  className={inputCls}
                  value={formData.possessionYear}
                  onChange={(e) => setFormData({ ...formData, possessionYear: e.target.value })}
                />
              </div>
              <div className='flex flex-col gap-1.5'>
                <label className='text-sm text-[#EFE9DD]/60'>Payment Plan</label>
                <input
                  type='text'
                  placeholder='e.g. 20:20:20:20:20'
                  className={inputCls}
                  value={formData.paymentPlan}
                  onChange={(e) => setFormData({ ...formData, paymentPlan: e.target.value })}
                />
              </div>
            </div>

            {/* Master Plan & Site Plan images */}
            <div className='grid sm:grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label className='text-sm text-[#EFE9DD]/60'>Master Plan Image</label>
                <div className='flex gap-3'>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => setMasterPlanFile(e.target.files[0])}
                    className='flex-1 bg-[#0E211B] border border-[#B8925A]/25 text-[#EFE9DD]/70 text-sm rounded-lg p-3 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-[#B8925A]/20 file:text-[#D9B383] file:cursor-pointer'
                  />
                  <button
                    type='button'
                    disabled={uploadingMasterPlan}
                    onClick={() => uploadSingleImage(masterPlanFile, setUploadingMasterPlan, 'masterPlanImage')}
                    className='px-4 py-3 text-[#D9B383] border border-[#B8925A]/50 rounded-lg text-sm font-semibold hover:bg-[#B8925A]/10 transition-colors disabled:opacity-60'
                  >
                    {uploadingMasterPlan ? '...' : 'Upload'}
                  </button>
                </div>
                {formData.masterPlanImage && (
                  <img src={formData.masterPlanImage} alt='master plan' className='w-full h-32 object-cover rounded-lg mt-1' />
                )}
              </div>
              <div className='flex flex-col gap-2'>
                <label className='text-sm text-[#EFE9DD]/60'>Site Plan Image</label>
                <div className='flex gap-3'>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => setSitePlanFile(e.target.files[0])}
                    className='flex-1 bg-[#0E211B] border border-[#B8925A]/25 text-[#EFE9DD]/70 text-sm rounded-lg p-3 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-[#B8925A]/20 file:text-[#D9B383] file:cursor-pointer'
                  />
                  <button
                    type='button'
                    disabled={uploadingSitePlan}
                    onClick={() => uploadSingleImage(sitePlanFile, setUploadingSitePlan, 'sitePlanImage')}
                    className='px-4 py-3 text-[#D9B383] border border-[#B8925A]/50 rounded-lg text-sm font-semibold hover:bg-[#B8925A]/10 transition-colors disabled:opacity-60'
                  >
                    {uploadingSitePlan ? '...' : 'Upload'}
                  </button>
                </div>
                {formData.sitePlanImage && (
                  <img src={formData.sitePlanImage} alt='site plan' className='w-full h-32 object-cover rounded-lg mt-1' />
                )}
              </div>
            </div>

            {/* Location Preview */}
            <div className='flex flex-col gap-3'>
              <label className='text-sm text-[#EFE9DD]/60'>
                Location Preview
                <span className='block font-normal text-[#EFE9DD]/40 text-xs mt-0.5'>
                  We'll auto-pin the Address field above when you save — check it here first if you like.
                </span>
              </label>
              <button
                type='button'
                onClick={handlePreviewLocation}
                disabled={previewingLocation || !formData.address}
                className='self-start px-5 py-2.5 text-[#D9B383] border border-[#B8925A]/50 rounded-lg text-sm font-semibold hover:bg-[#B8925A]/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {previewingLocation ? 'Locating...' : 'Preview on Map'}
              </button>
              {previewLocation && (
                <>
                  <p className='text-xs text-[#EFE9DD]/50'>
                    Pinned at {previewLocation.lat.toFixed(5)}, {previewLocation.lng.toFixed(5)}
                  </p>
                  <iframe
                    title='Location preview'
                    src={`https://www.google.com/maps?q=${previewLocation.lat},${previewLocation.lng}&output=embed`}
                    className='w-full h-56 rounded-xl border border-[#B8925A]/15'
                    loading='lazy'
                  />
                </>
              )}
              {previewAttempted && !previewLocation && (
                <p className='text-sm text-red-400'>
                  Couldn't find that address on the map. It'll still save fine — just double-check the spelling if you want a precise pin.
                </p>
              )}
            </div>

            {/* What's Nearby */}
            <div className='flex flex-col gap-2'>
              <label className='text-sm text-[#EFE9DD]/60'>What&apos;s Nearby</label>
              <div className='flex gap-3'>
                <input
                  type='text'
                  placeholder='e.g. Golf Course Extension Road'
                  className={inputCls}
                  value={nearbyInput}
                  onChange={(e) => setNearbyInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addNearby();
                    }
                  }}
                />
                <button
                  type='button'
                  onClick={addNearby}
                  className='px-5 py-3 text-[#D9B383] border border-[#B8925A]/50 rounded-lg text-sm font-semibold hover:bg-[#B8925A]/10 transition-colors'
                >
                  Add
                </button>
              </div>
              {formData.nearby.length > 0 && (
                <div className='flex flex-wrap gap-2 mt-1'>
                  {formData.nearby.map((item, i) => (
                    <span
                      key={i}
                      className='flex items-center gap-2 rounded-full border border-[#B8925A]/30 bg-[#0E211B] px-3 py-1.5 text-xs text-[#D9B383]'
                    >
                      {item}
                      <button type='button' onClick={() => removeNearby(i)} className='text-red-400 hover:text-red-300'>
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Project Specifications */}
            <div className='flex flex-col gap-2'>
              <label className='text-sm text-[#EFE9DD]/60'>Project Specifications</label>
              <div className='flex gap-3'>
                <input
                  type='text'
                  placeholder='e.g. Total land area - 15.0025 acres'
                  className={inputCls}
                  value={specInput}
                  onChange={(e) => setSpecInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSpec();
                    }
                  }}
                />
                <button
                  type='button'
                  onClick={addSpec}
                  className='px-5 py-3 text-[#D9B383] border border-[#B8925A]/50 rounded-lg text-sm font-semibold hover:bg-[#B8925A]/10 transition-colors'
                >
                  Add
                </button>
              </div>
              {formData.specifications.length > 0 && (
                <ul className='flex flex-col gap-2 mt-1'>
                  {formData.specifications.map((item, i) => (
                    <li
                      key={i}
                      className='flex items-center justify-between rounded-lg border border-[#B8925A]/15 bg-[#0E211B] px-4 py-2 text-sm text-[#EFE9DD]/80'
                    >
                      <span>{item}</span>
                      <button type='button' onClick={() => removeSpec(i)} className='text-red-400 hover:text-red-300 text-xs font-semibold'>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* About Builder */}
            <div className='flex flex-col gap-3'>
              <label className='text-sm text-[#EFE9DD]/60'>About Builder</label>
              <div className='grid sm:grid-cols-2 gap-4'>
                <input
                  type='text'
                  name='name'
                  placeholder='Builder name'
                  className={inputCls}
                  value={formData.builder.name}
                  onChange={handleBuilderChange}
                />
                <div className='flex gap-3'>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e) => setBuilderLogoFile(e.target.files[0])}
                    className='flex-1 bg-[#0E211B] border border-[#B8925A]/25 text-[#EFE9DD]/70 text-sm rounded-lg p-3 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-[#B8925A]/20 file:text-[#D9B383] file:cursor-pointer'
                  />
                  <button
                    type='button'
                    disabled={uploadingBuilderLogo}
                    onClick={() => uploadSingleImage(builderLogoFile, setUploadingBuilderLogo, 'builder', true)}
                    className='px-4 py-3 text-[#D9B383] border border-[#B8925A]/50 rounded-lg text-sm font-semibold hover:bg-[#B8925A]/10 transition-colors disabled:opacity-60'
                  >
                    {uploadingBuilderLogo ? '...' : 'Logo'}
                  </button>
                </div>
              </div>
              {formData.builder.logo && (
                <img src={formData.builder.logo} alt='builder logo' className='h-14 object-contain' />
              )}
              <textarea
                name='description'
                placeholder='About the builder...'
                className={`${inputCls} min-h-[90px] resize-y`}
                value={formData.builder.description}
                onChange={handleBuilderChange}
              />
            </div>

            {/* FAQs */}
            <div className='flex flex-col gap-2'>
              <label className='text-sm text-[#EFE9DD]/60'>FAQs</label>
              <input
                type='text'
                placeholder='Question'
                className={inputCls}
                value={faqQuestion}
                onChange={(e) => setFaqQuestion(e.target.value)}
              />
              <textarea
                placeholder='Answer'
                className={`${inputCls} min-h-[70px] resize-y`}
                value={faqAnswer}
                onChange={(e) => setFaqAnswer(e.target.value)}
              />
              <button
                type='button'
                onClick={addFaq}
                className='self-start px-5 py-2.5 text-[#D9B383] border border-[#B8925A]/50 rounded-lg text-sm font-semibold hover:bg-[#B8925A]/10 transition-colors'
              >
                Add FAQ
              </button>
              {formData.faqs.length > 0 && (
                <div className='flex flex-col gap-2 mt-2'>
                  {formData.faqs.map((faq, i) => (
                    <div key={i} className='rounded-lg border border-[#B8925A]/15 bg-[#0E211B] p-4'>
                      <div className='flex items-start justify-between gap-3'>
                        <p className='font-semibold text-sm text-[#EFE9DD]'>{faq.question}</p>
                        <button
                          type='button'
                          onClick={() => removeFaq(i)}
                          className='text-red-400 hover:text-red-300 text-xs font-semibold flex-shrink-0'
                        >
                          Remove
                        </button>
                      </div>
                      <p className='mt-1.5 text-sm text-[#EFE9DD]/60'>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}