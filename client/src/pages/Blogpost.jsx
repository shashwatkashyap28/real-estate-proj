import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/blog/get/${params.blogId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [params.blogId]);

  if (loading) {
    return (
      <div className='min-h-screen bg-[#0E211B] flex items-center justify-center'>
        <p className='text-[#EFE9DD]/50 text-lg font-serif'>Loading article...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className='min-h-screen bg-[#0E211B] flex items-center justify-center'>
        <p className='text-red-400 text-lg font-serif'>Failed to load this article.</p>
      </div>
    );
  }

  return (
    <main className='min-h-screen bg-[#0E211B] text-[#EFE9DD] pb-20'>
      <div className='max-w-3xl mx-auto px-6 pt-8'>
        <Link
          to='/blog'
          className='inline-flex items-center gap-2 text-sm text-[#EFE9DD]/70 hover:text-[#B8925A] transition-colors'
        >
          <FaArrowLeft className='text-xs' /> Back to journal
        </Link>

        <div className='flex justify-center'>
          <span className='inline-block mt-8 rounded-full bg-[#B8925A]/15 border border-[#B8925A]/40 px-4 py-1.5 text-[#D9B383] text-xs font-semibold'>
            {post.category}
          </span>
        </div>

        <h1 className='mt-4 font-serif text-3xl sm:text-4xl font-bold text-[#EFE9DD] leading-tight'>
          {post.title}
        </h1>

        <div className='flex flex-wrap items-center gap-4 text-xs text-[#EFE9DD]/50 mt-4'>
          <span className='flex items-center gap-1.5'>
            <FaCalendarAlt className='text-[#B8925A]' />
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          <span>•</span>
          <span>{post.readTime}</span>
          <span>•</span>
          <span>By {post.author}</span>
        </div>

        <img
          src={post.coverImage}
          alt={post.title}
          className='w-full h-72 sm:h-96 object-cover rounded-3xl mt-8 border border-[#B8925A]/15 shadow-xl'
        />

        {/*
          Content is HTML produced by the rich-text editor in
          CreateBlog/UpdateBlog (only admins can author posts, so this is
          trusted content, not arbitrary user input).
        */}
        <div
          className='mt-8 text-[#EFE9DD]/80 leading-relaxed text-base
            [&_h2]:text-2xl [&_h2]:font-serif [&_h2]:font-bold [&_h2]:text-[#EFE9DD] [&_h2]:mt-8 [&_h2]:mb-3
            [&_p]:mb-4
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
            [&_blockquote]:border-l-4 [&_blockquote]:border-[#B8925A] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#EFE9DD]/60 [&_blockquote]:my-4
            [&_a]:text-[#B8925A] [&_a]:underline hover:[&_a]:text-[#D9B383]
            [&_img]:rounded-2xl [&_img]:my-6 [&_img]:w-full [&_img]:object-cover
            [&_strong]:text-[#EFE9DD] [&_strong]:font-semibold'
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </main>
  );
}