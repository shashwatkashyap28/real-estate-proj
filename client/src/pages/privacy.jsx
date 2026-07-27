import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaShieldAlt, FaLock, FaUserSecret, FaEnvelope } from 'react-icons/fa';

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className='min-h-screen bg-[#0E211B] text-[#EFE9DD] font-sans pb-20'>
      {/* Top Navigation Bar */}
      <div className='max-w-4xl mx-auto px-6 pt-6'>
        <Link to='/' className='inline-flex items-center gap-2 text-sm text-[#EFE9DD]/70 hover:text-[#B8925A] transition-colors'>
          <FaArrowLeft className='text-xs' /> Back to Home
        </Link>
      </div>

      {/* Header Section */}
      <section className='max-w-4xl mx-auto px-6 pt-10 pb-8 text-center'>
        <div className='inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-[#132A22] border border-[#B8925A]/30 text-[#B8925A] mb-6 shadow-lg'>
          <FaShieldAlt className='text-3xl' />
        </div>
        <h1 className='font-serif text-4xl md:text-5xl font-bold text-[#EFE9DD] leading-tight'>
          Privacy Policy
        </h1>
        <p className='text-sm text-[#EFE9DD]/50 mt-3'>
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </section>

      {/* Content Container */}
      <div className='max-w-4xl mx-auto px-6 space-y-8'>
        
        {/* Introduction */}
        <div className='bg-[#132A22] border border-[#B8925A]/15 p-8 rounded-3xl space-y-4 shadow-xl'>
          <h2 className='font-serif text-2xl font-bold text-[#D9B383]'>1. Introduction</h2>
          <p className='text-[#EFE9DD]/70 leading-relaxed text-base'>
            Welcome to our real estate platform. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
        </div>

        {/* Information We Collect */}
        <div className='bg-[#132A22] border border-[#B8925A]/15 p-8 rounded-3xl space-y-4 shadow-xl'>
          <h2 className='font-serif text-2xl font-bold text-[#D9B383]'>2. Information We Collect</h2>
          <p className='text-[#EFE9DD]/70 leading-relaxed text-base'>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className='space-y-3 pl-4 text-sm text-[#EFE9DD]/80'>
            <li className='flex items-start gap-3'>
              <span className='mt-1.5 h-1.5 w-1.5 rounded-full bg-[#B8925A] shrink-0' />
              <span><strong>Identity Data:</strong> Includes first name, last name, username or similar identifier.</span>
            </li>
            <li className='flex items-start gap-3'>
              <span className='mt-1.5 h-1.5 w-1.5 rounded-full bg-[#B8925A] shrink-0' />
              <span><strong>Contact Data:</strong> Includes billing address, delivery address, email address, and telephone numbers.</span>
            </li>
            <li className='flex items-start gap-3'>
              <span className='mt-1.5 h-1.5 w-1.5 rounded-full bg-[#B8925A] shrink-0' />
              <span><strong>Transaction Data:</strong> Includes details about payments to and from you and other details of properties you have inquired about or purchased.</span>
            </li>
            <li className='flex items-start gap-3'>
              <span className='mt-1.5 h-1.5 w-1.5 rounded-full bg-[#B8925A] shrink-0' />
              <span><strong>Technical Data:</strong> Includes internet protocol (IP) address, browser type and version, time zone setting and location, and operating system.</span>
            </li>
          </ul>
        </div>

        {/* How We Use Your Information */}
        <div className='bg-[#132A22] border border-[#B8925A]/15 p-8 rounded-3xl space-y-4 shadow-xl'>
          <h2 className='font-serif text-2xl font-bold text-[#D9B383]'>3. How We Use Your Information</h2>
          <p className='text-[#EFE9DD]/70 leading-relaxed text-base'>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-2'>
            <div className='p-4 rounded-xl border border-[#B8925A]/10 bg-[#0E211B]/50 flex items-start gap-3'>
              <FaUserSecret className='text-[#B8925A] text-xl shrink-0 mt-1' />
              <p className='text-xs text-[#EFE9DD]/80 leading-relaxed'>To register you as a new client and process property inquiries.</p>
            </div>
            <div className='p-4 rounded-xl border border-[#B8925A]/10 bg-[#0E211B]/50 flex items-start gap-3'>
              <FaLock className='text-[#B8925A] text-xl shrink-0 mt-1' />
              <p className='text-xs text-[#EFE9DD]/80 leading-relaxed'>To manage our relationship with you including notifications about updates.</p>
            </div>
          </div>
        </div>

        {/* Data Security */}
        <div className='bg-[#132A22] border border-[#B8925A]/15 p-8 rounded-3xl space-y-4 shadow-xl'>
          <h2 className='font-serif text-2xl font-bold text-[#D9B383]'>4. Data Security</h2>
          <p className='text-[#EFE9DD]/70 leading-relaxed text-base'>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
          </p>
        </div>

        {/* Contact Information */}
        <div className='bg-[#132A22] border border-[#B8925A]/15 p-8 rounded-3xl space-y-4 shadow-xl'>
          <h2 className='font-serif text-2xl font-bold text-[#D9B383]'>5. Contact Us</h2>
          <p className='text-[#EFE9DD]/70 leading-relaxed text-base'>
            If you have any questions about this privacy policy or our privacy practices, please contact us through our dedicated communication channel:
          </p>
          <div className='flex items-center gap-3 pt-2 text-[#B8925A] font-semibold'>
            <FaEnvelope />
            <a href='mailto:privacy@realestate.com' className='hover:underline'>privacy@realestate.com</a>
          </div>
        </div>

      </div>
    </main>
  );
}