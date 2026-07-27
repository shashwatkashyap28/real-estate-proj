import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaBold,
  FaItalic,
  FaHeading,
  FaListUl,
  FaTasks,
  FaQuoteLeft,
  FaLink,
  FaImage,
  FaUndo,
  FaRedo,
  FaCloudUploadAlt,
  FaTimes,
} from 'react-icons/fa';

const categories = [
  'Market Trends',
  'Vastu & Design',
  'Legal & Advisory',
  'Sustainability',
  'Architecture',
  'Finance',
];

// Must exactly match the preset name used in CreateListing.jsx / UpdateListing.jsx.
const CLOUDINARY_UPLOAD_PRESET = 'Real-estate-preset';
const CLOUDINARY_CLOUD_NAME = 'btrv3nfn';

const slugify = (str) =>
  str
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export default function CreateBlog() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const coverInputRef = useRef(null);
  const contentImageInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: categories[0],
    readTime: '5 min read',
    coverImage: '',
    metaTitle: '',
    metaDescription: '',
  });
  const [slugTouched, setSlugTouched] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [coverDragOver, setCoverDragOver] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false); // 'draft' | 'publish' | false

  const storeImage = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: data }
    );

    if (!res.ok) throw new Error('Failed to upload image to Cloudinary');
    const responseData = await res.json();
    return responseData.secure_url;
  };

  // ---- Cover image: click-to-upload + drag & drop, auto-uploads on select ----
  const handleCoverFile = async (file) => {
    if (!file) return;
    setUploadingCover(true);
    setUploadError(false);
    try {
      const url = await storeImage(file);
      setFormData((prev) => ({ ...prev, coverImage: url }));
    } catch (err) {
      setUploadError('Image upload failed (2 mb max)');
    }
    setUploadingCover(false);
  };

  const handleRemoveCover = () => {
    setFormData((prev) => ({ ...prev, coverImage: '' }));
  };

  const handleCoverDrop = (e) => {
    e.preventDefault();
    setCoverDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleCoverFile(file);
  };

  // ---- Title / slug / category / read time / excerpt ----
  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: slugTouched ? prev.slug : slugify(title),
    }));
  };

  const handleSlugChange = (e) => {
    setSlugTouched(true);
    setFormData((prev) => ({ ...prev, slug: slugify(e.target.value) }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // ---- Rich text content editor (contentEditable + execCommand) ----
  const syncContent = () => {
    setFormData((prev) => ({ ...prev, content: contentRef.current.innerHTML }));
  };

  const exec = (command, value = null) => {
    contentRef.current.focus();
    document.execCommand(command, false, value);
    syncContent();
  };

  const handleInsertLink = () => {
    const url = window.prompt('Link URL');
    if (url) exec('createLink', url);
  };

  const handleInsertImageClick = () => {
    contentImageInputRef.current?.click();
  };

  const handleContentImageSelected = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const url = await storeImage(file);
      exec('insertImage', url);
    } catch (err) {
      setUploadError('Image upload failed (2 mb max)');
    }
  };

  const handleContentPaste = async (e) => {
    const file = Array.from(e.clipboardData?.files || [])[0];
    if (file && file.type.startsWith('image/')) {
      e.preventDefault();
      try {
        const url = await storeImage(file);
        exec('insertImage', url);
      } catch (err) {
        setUploadError('Image upload failed (2 mb max)');
      }
    }
  };

  // ---- Submit (Save Draft or Publish) ----
  const handleSubmit = async (status) => {
    try {
      if (!formData.coverImage) {
        setError('You must upload a cover image');
        return;
      }
      if (!formData.title.trim() || !formData.excerpt.trim() || !formData.content.trim()) {
        setError('Title, excerpt, and content are required');
        return;
      }
      setSaving(status);
      setError(false);
      const res = await fetch('/api/blog/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          author: currentUser?.username || '',
          status,
        }),
      });
      const data = await res.json();
      setSaving(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  const inputCls =
    'w-full bg-[#0E211B] border border-[#B8925A]/25 text-[#EFE9DD] placeholder:text-[#EFE9DD]/30 p-3 rounded-lg outline-none focus:border-[#B8925A] transition-colors';
  const panelCls =
    'flex flex-col gap-4 bg-[#132A22] border border-[#B8925A]/20 rounded-2xl p-6 sm:p-8';
  const labelCls = 'text-sm font-semibold text-[#D9B383]';
  const toolbarBtnCls =
    'h-9 w-9 flex items-center justify-center rounded-md text-[#EFE9DD]/70 hover:bg-[#B8925A]/15 hover:text-[#D9B383] transition-colors';

  return (
    <main className='min-h-screen bg-[#0E211B] py-10 px-4'>
      <div className='max-w-3xl mx-auto flex flex-col gap-6'>
        <div>
          <Link
            to='/dashboard'
            className='inline-flex items-center gap-2 text-sm text-[#EFE9DD]/70 hover:text-[#B8925A] transition-colors'
          >
            <FaArrowLeft className='text-xs' /> Back to posts
          </Link>
          <h1 className='mt-3 font-serif text-3xl sm:text-4xl font-bold text-[#EFE9DD]'>
            New Blog Post
          </h1>
        </div>

        {/* Details panel */}
        <div className={panelCls}>
          <div className='flex flex-col gap-1.5'>
            <label className={labelCls}>Title *</label>
            <input
              id='title'
              type='text'
              className={inputCls}
              required
              minLength='10'
              maxLength='120'
              value={formData.title}
              onChange={handleTitleChange}
            />
          </div>

          <div className='grid sm:grid-cols-2 gap-4'>
            <div className='flex flex-col gap-1.5'>
              <label className={labelCls}>URL slug</label>
              <input
                type='text'
                placeholder='your-title'
                className={inputCls}
                value={formData.slug}
                onChange={handleSlugChange}
              />
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className={labelCls}>Category</label>
              <select
                id='category'
                className={inputCls}
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='flex flex-col gap-1.5 sm:w-1/2'>
            <label className={labelCls}>Read Time</label>
            <input
              id='readTime'
              type='text'
              placeholder='5 min read'
              className={inputCls}
              value={formData.readTime}
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className={labelCls}>Excerpt (short summary shown on cards)</label>
            <textarea
              id='excerpt'
              className={`${inputCls} min-h-[90px] resize-y`}
              required
              maxLength='220'
              value={formData.excerpt}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Cover image panel */}
        <div className={panelCls}>
          <label className={labelCls}>Cover Image</label>
          <input
            ref={coverInputRef}
            type='file'
            accept='image/*'
            className='hidden'
            onChange={(e) => handleCoverFile(e.target.files?.[0])}
          />

          {formData.coverImage ? (
            <div className='relative'>
              <img
                src={formData.coverImage}
                alt='cover preview'
                className='h-56 w-full object-cover rounded-xl border border-[#B8925A]/15'
              />
              <button
                type='button'
                onClick={handleRemoveCover}
                aria-label='Remove cover image'
                className='absolute top-2 right-2 h-8 w-8 flex items-center justify-center rounded-full bg-[#0E211B]/90 border border-red-400/40 text-red-400 hover:bg-red-400/20 hover:text-red-300 transition-colors'
              >
                <FaTimes />
              </button>
            </div>
          ) : (
            <div
              onClick={() => coverInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setCoverDragOver(true);
              }}
              onDragLeave={() => setCoverDragOver(false)}
              onDrop={handleCoverDrop}
              className={`flex flex-col items-center justify-center gap-2 h-44 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
                coverDragOver
                  ? 'border-[#B8925A] bg-[#B8925A]/10'
                  : 'border-[#B8925A]/30 hover:border-[#B8925A]/60'
              }`}
            >
              <FaCloudUploadAlt className='text-2xl text-[#B8925A]' />
              <p className='text-sm text-[#D9B383] font-medium'>
                {uploadingCover ? 'Uploading...' : 'Click to upload (auto-optimized)'}
              </p>
              <p className='text-xs text-[#EFE9DD]/40'>or drag and drop an image</p>
            </div>
          )}
          {uploadError && <p className='text-red-400 text-sm'>{uploadError}</p>}
        </div>

        {/* Content panel */}
        <div className={panelCls}>
          <label className={labelCls}>Content</label>
          <input
            ref={contentImageInputRef}
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleContentImageSelected}
          />
          <div className='rounded-lg border border-[#B8925A]/25 overflow-hidden'>
            <div className='flex items-center gap-1 flex-wrap bg-[#0E211B] border-b border-[#B8925A]/20 px-2 py-1.5'>
              <button type='button' className={toolbarBtnCls} onClick={() => exec('bold')} title='Bold'>
                <FaBold size={13} />
              </button>
              <button type='button' className={toolbarBtnCls} onClick={() => exec('italic')} title='Italic'>
                <FaItalic size={13} />
              </button>
              <button
                type='button'
                className={toolbarBtnCls}
                onClick={() => exec('formatBlock', '<h2>')}
                title='Heading'
              >
                <FaHeading size={13} />
              </button>
              <button
                type='button'
                className={toolbarBtnCls}
                onClick={() => exec('insertUnorderedList')}
                title='Bullet list'
              >
                <FaListUl size={13} />
              </button>
              <button
                type='button'
                className={toolbarBtnCls}
                onClick={() => exec('insertHTML', '<div>☐ </div>')}
                title='Checklist'
              >
                <FaTasks size={13} />
              </button>
              <button
                type='button'
                className={toolbarBtnCls}
                onClick={() => exec('formatBlock', '<blockquote>')}
                title='Quote'
              >
                <FaQuoteLeft size={13} />
              </button>
              <button type='button' className={toolbarBtnCls} onClick={handleInsertLink} title='Link'>
                <FaLink size={13} />
              </button>
              <button
                type='button'
                className={toolbarBtnCls}
                onClick={handleInsertImageClick}
                title='Insert image'
              >
                <FaImage size={13} />
              </button>
              <div className='w-px h-5 bg-[#B8925A]/20 mx-1' />
              <button type='button' className={toolbarBtnCls} onClick={() => exec('undo')} title='Undo'>
                <FaUndo size={13} />
              </button>
              <button type='button' className={toolbarBtnCls} onClick={() => exec('redo')} title='Redo'>
                <FaRedo size={13} />
              </button>
            </div>
            <div
              ref={contentRef}
              contentEditable
              suppressContentEditableWarning
              onInput={syncContent}
              onPaste={handleContentPaste}
              className='min-h-[240px] max-h-[500px] overflow-y-auto bg-[#0E211B] text-[#EFE9DD] p-4 outline-none text-sm leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#D9B383] [&_h2]:mt-2 [&_blockquote]:border-l-4 [&_blockquote]:border-[#B8925A] [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-[#EFE9DD]/70 [&_a]:text-[#B8925A] [&_a]:underline [&_img]:rounded-lg [&_img]:my-2 [&_ul]:list-disc [&_ul]:pl-5'
            />
          </div>
          <p className='text-xs text-[#EFE9DD]/40'>
            Tip: paste images directly or use the toolbar — every image is auto-uploaded.
          </p>
        </div>

        {/* SEO panel */}
        <div className={panelCls}>
          <label className={labelCls}>SEO</label>
          <div className='flex flex-col gap-1.5'>
            <div className='flex items-center justify-between'>
              <label className='text-xs text-[#EFE9DD]/50'>Meta title</label>
              <span className='text-xs text-[#EFE9DD]/30'>{formData.metaTitle.length}/60</span>
            </div>
            <input
              id='metaTitle'
              type='text'
              maxLength='60'
              className={inputCls}
              value={formData.metaTitle}
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col gap-1.5'>
            <div className='flex items-center justify-between'>
              <label className='text-xs text-[#EFE9DD]/50'>Meta description</label>
              <span className='text-xs text-[#EFE9DD]/30'>{formData.metaDescription.length}/160</span>
            </div>
            <textarea
              id='metaDescription'
              maxLength='160'
              className={`${inputCls} min-h-[70px] resize-y`}
              value={formData.metaDescription}
              onChange={handleChange}
            />
          </div>
        </div>

        {error && <p className='text-red-400 text-sm'>{error}</p>}

        {/* Action bar */}
        <div className='flex justify-end gap-3 pb-4'>
          <button
            type='button'
            onClick={() => navigate('/dashboard')}
            className='px-5 py-2.5 rounded-lg text-sm font-semibold text-[#EFE9DD]/70 border border-[#B8925A]/25 hover:bg-[#B8925A]/10 transition-colors'
          >
            Cancel
          </button>
          <button
            type='button'
            disabled={saving !== false}
            onClick={() => handleSubmit('draft')}
            className='px-5 py-2.5 rounded-lg text-sm font-semibold text-[#D9B383] border border-[#B8925A]/50 hover:bg-[#B8925A]/10 transition-colors disabled:opacity-60'
          >
            {saving === 'draft' ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            type='button'
            disabled={saving !== false}
            onClick={() => handleSubmit('published')}
            className='px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#B8925A] text-[#0E211B] hover:bg-[#D9B383] transition-colors disabled:opacity-70'
          >
            {saving === 'published' ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>
    </main>
  );
}