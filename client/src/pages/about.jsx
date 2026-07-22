import {
  FaHome,
  FaUsers,
  FaAward,
  FaHandshake,
} from "react-icons/fa";

export default function About() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0E211B] text-[#EFE9DD]">

      {/* ================= HERO ================= */}

      <section className="relative">

        {/* Background Image */}

        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80"
          alt="Luxury Home"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-[#0E211B]/80"></div>

        {/* Green Glow */}

        <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#B8925A]/20 blur-3xl"></div>

        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[#B8925A]/10 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl px-6 py-32">

          <div className="grid items-center gap-20 lg:grid-cols-2">

            {/* Left */}

            <div>

              <span className="rounded-full border border-[#B8925A]/30 bg-[#B8925A]/10 px-5 py-2 text-[#D9B383] font-semibold">

                About GO REALTORS

              </span>

              <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">

                Building
                <br />

                <span className="text-[#B8925A]">

                  Trust Through
                  <br />
                  Real Estate

                </span>

              </h1>

              <p className="mt-8 max-w-xl text-lg leading-9 text-[#EFE9DD]/50">

                GO REALTORS is a premium real estate platform helping
                buyers, sellers and investors discover verified
                residential and commercial properties across India.

                <br />
                <br />

                We believe every property transaction should be simple,
                transparent and secure.

              </p>

            </div>

            {/* Right */}

            <div>

              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80"
                alt="Luxury Villa"
                className="rounded-3xl border border-[#B8925A]/15 shadow-2xl"
              />

            </div>

          </div>

        </div>

      </section>

      {/* ================= STATS ================= */}

      <section className="bg-[#0E211B] py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {/* Card */}

            <div className="rounded-3xl border border-[#B8925A]/15 bg-[#EFE9DD]/5 p-8 backdrop-blur-xl transition hover:border-[#B8925A]">

              <FaHome className="mb-5 text-5xl text-[#B8925A]" />

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">

                15K+

              </h2>

              <p className="mt-3 text-[#EFE9DD]/50">

                Verified Properties

              </p>

            </div>

            {/* Card */}

            <div className="rounded-3xl border border-[#B8925A]/15 bg-[#EFE9DD]/5 p-8 backdrop-blur-xl transition hover:border-[#B8925A]">

              <FaUsers className="mb-5 text-5xl text-[#B8925A]" />

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">

                8K+

              </h2>

              <p className="mt-3 text-[#EFE9DD]/50">

                Happy Clients

              </p>

            </div>

            {/* Card */}

            <div className="rounded-3xl border border-[#B8925A]/15 bg-[#EFE9DD]/5 p-8 backdrop-blur-xl transition hover:border-[#B8925A]">

              <FaAward className="mb-5 text-5xl text-[#B8925A]" />

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">

                120+

              </h2>

              <p className="mt-3 text-[#EFE9DD]/50">

                Cities Covered

              </p>

            </div>

            {/* Card */}

            <div className="rounded-3xl border border-[#B8925A]/15 bg-[#EFE9DD]/5 p-8 backdrop-blur-xl transition hover:border-[#B8925A]">

              <FaHandshake className="mb-5 text-5xl text-[#B8925A]" />

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">

                99%

              </h2>

              <p className="mt-3 text-[#EFE9DD]/50">

                Client Satisfaction

              </p>

            </div>

          </div>

        </div>

      </section>
            {/* ================= OUR STORY ================= */}

            <section className="bg-[#0E211B] py-28">

<div className="mx-auto max-w-7xl px-6">

  <div className="grid items-center gap-20 lg:grid-cols-2">

    {/* Left */}

    <div>

      <img
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
        alt="Office"
        className="rounded-3xl border border-[#B8925A]/15 shadow-2xl"
      />

    </div>

    {/* Right */}

    <div>

      <span className="rounded-full border border-[#B8925A]/30 bg-[#B8925A]/10 px-5 py-2 font-semibold text-[#D9B383]">

        Our Story

      </span>

      <h2 className="mt-8 text-3xl sm:text-4xl md:text-5xl font-bold">

        More Than Just
        <span className="text-[#B8925A]">

          {" "}Real Estate

        </span>

      </h2>

      <p className="mt-8 text-lg leading-9 text-[#EFE9DD]/50">

        GO REALTORS was founded with one simple vision—
        making property buying and selling transparent,
        reliable and stress-free.

      </p>

      <p className="mt-6 text-lg leading-9 text-[#EFE9DD]/50">

        Whether you're purchasing your first home,
        investing in commercial real estate or searching
        for a luxury villa, we provide verified listings,
        experienced advisors and end-to-end assistance.

      </p>

      <p className="mt-6 text-lg leading-9 text-[#EFE9DD]/50">

        Our goal is not just to sell homes—
        it's to build lifelong relationships with every client.

      </p>

    </div>

  </div>

</div>

</section>

{/* ================= COMPANY JOURNEY ================= */}

<section className="bg-[#0E211B] py-28">

<div className="mx-auto max-w-6xl px-6">

  <div className="text-center">

    <span className="rounded-full border border-[#B8925A]/30 bg-[#B8925A]/10 px-5 py-2 font-semibold text-[#D9B383]">

      Company Journey

    </span>

    <h2 className="mt-8 text-3xl sm:text-4xl md:text-5xl font-bold">

      Our Growth Story

    </h2>

    <p className="mt-6 text-lg text-[#EFE9DD]/50">

      Every milestone reflects our commitment to
      excellence and customer satisfaction.

    </p>

  </div>

  <div className="relative mt-20">

    {/* Timeline Line */}

    <div className="absolute left-5 top-0 h-full w-1 rounded-full bg-[#B8925A]"></div>

    {/* Item 1 */}

    <div className="relative mb-16 pl-20">

      <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#B8925A] font-bold text-[#0E211B]">

        1

      </div>

      <div className="rounded-3xl border border-[#B8925A]/15 bg-[#EFE9DD]/5 p-8 backdrop-blur-xl">

        <h3 className="text-2xl font-bold">

          2023 • Company Founded

        </h3>

        <p className="mt-4 leading-8 text-[#EFE9DD]/50">

          GO REALTORS started with a mission to
          simplify property buying and selling
          through transparency and technology.

        </p>

      </div>

    </div>

    {/* Item 2 */}

    <div className="relative mb-16 pl-20">

      <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#B8925A] font-bold text-[#0E211B]">

        2

      </div>

      <div className="rounded-3xl border border-[#B8925A]/15 bg-[#EFE9DD]/5 p-8 backdrop-blur-xl">

        <h3 className="text-2xl font-bold">

          2024 • Expanded Across Cities

        </h3>

        <p className="mt-4 leading-8 text-[#EFE9DD]/50">

          Successfully partnered with hundreds
          of property owners and expanded our
          listings across major Indian cities.

        </p>

      </div>

    </div>

    {/* Item 3 */}

    <div className="relative mb-16 pl-20">

      <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#B8925A] font-bold text-[#0E211B]">

        3

      </div>

      <div className="rounded-3xl border border-[#B8925A]/15 bg-[#EFE9DD]/5 p-8 backdrop-blur-xl">

        <h3 className="text-2xl font-bold">

          2025 • Premium Services

        </h3>

        <p className="mt-4 leading-8 text-[#EFE9DD]/50">

          Introduced luxury properties,
          investment consultancy,
          and dedicated NRI services.

        </p>

      </div>

    </div>

    {/* Item 4 */}

    <div className="relative pl-20">

      <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#B8925A] font-bold text-[#0E211B]">

        4

      </div>

      <div className="rounded-3xl border border-[#B8925A]/40 bg-[#B8925A]/10 p-8 backdrop-blur-xl">

        <h3 className="text-2xl font-bold text-[#D9B383]">

          Today

        </h3>

        <p className="mt-4 leading-8 text-[#EFE9DD]/70">

          GO REALTORS continues to connect
          thousands of buyers, sellers and
          investors through a trusted,
          technology-driven platform.

        </p>

      </div>

    </div>

  </div>

</div>

</section>
      {/* ================= WHY CHOOSE US ================= */}

      <section className="bg-[#0E211B] py-28">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <span className="rounded-full border border-[#B8925A]/30 bg-[#B8925A]/10 px-5 py-2 font-semibold text-[#D9B383]">

              Why Choose Us

            </span>

            <h2 className="mt-8 text-3xl sm:text-4xl md:text-5xl font-bold">

              The GO REALTORS Difference

            </h2>

            <p className="mt-6 text-lg text-[#EFE9DD]/50">

              Everything you need to make your property journey
              simple, secure and successful.

            </p>

          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {/* Card */}

            <div className="rounded-3xl border border-[#B8925A]/15 bg-[#EFE9DD]/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-[#B8925A]">

              <FaHome className="mb-6 text-5xl text-[#B8925A]" />

              <h3 className="text-2xl font-bold">

                Verified Listings

              </h3>

              <p className="mt-4 leading-8 text-[#EFE9DD]/50">

                Every property is carefully verified to
                ensure accurate details and trustworthy
                information.

              </p>

            </div>

            {/* Card */}

            <div className="rounded-3xl border border-[#B8925A]/15 bg-[#EFE9DD]/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-[#B8925A]">

              <FaUsers className="mb-6 text-5xl text-[#B8925A]" />

              <h3 className="text-2xl font-bold">

                Expert Advisors

              </h3>

              <p className="mt-4 leading-8 text-[#EFE9DD]/50">

                Our experienced consultants help you
                throughout every stage of buying,
                selling and investing.

              </p>

            </div>

            {/* Card */}

            <div className="rounded-3xl border border-[#B8925A]/15 bg-[#EFE9DD]/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-[#B8925A]">

              <FaAward className="mb-6 text-5xl text-[#B8925A]" />

              <h3 className="text-2xl font-bold">

                Trusted Brand

              </h3>

              <p className="mt-4 leading-8 text-[#EFE9DD]/50">

                Thousands of satisfied clients trust
                GO REALTORS for honest and transparent
                real estate services.

              </p>

            </div>

            {/* Card */}

            <div className="rounded-3xl border border-[#B8925A]/15 bg-[#EFE9DD]/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-[#B8925A]">

              <FaHandshake className="mb-6 text-5xl text-[#B8925A]" />

              <h3 className="text-2xl font-bold">

                Secure Deals

              </h3>

              <p className="mt-4 leading-8 text-[#EFE9DD]/50">

                We ensure safe transactions with complete
                transparency from start to finish.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CORE VALUES ================= */}

      <section className="bg-[#0E211B] py-28">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <span className="rounded-full border border-[#B8925A]/30 bg-[#B8925A]/10 px-5 py-2 font-semibold text-[#D9B383]">

              Core Values

            </span>

            <h2 className="mt-8 text-3xl sm:text-4xl md:text-5xl font-bold">

              What Drives Us

            </h2>

          </div>

          <div className="mt-20 grid gap-8 lg:grid-cols-3">

            <div className="rounded-3xl border border-[#B8925A]/15 bg-[#EFE9DD]/5 p-10 backdrop-blur-xl transition hover:border-[#B8925A]">

              <h3 className="text-3xl font-bold text-[#B8925A]">

                Transparency

              </h3>

              <p className="mt-6 leading-8 text-[#EFE9DD]/50">

                We believe every property transaction
                should be open, honest and completely
                transparent.

              </p>

            </div>

            <div className="rounded-3xl border border-[#B8925A]/15 bg-[#EFE9DD]/5 p-10 backdrop-blur-xl transition hover:border-[#B8925A]">

              <h3 className="text-3xl font-bold text-[#B8925A]">

                Innovation

              </h3>

              <p className="mt-6 leading-8 text-[#EFE9DD]/50">

                We use modern technology to simplify
                property discovery and deliver the
                best customer experience.

              </p>

            </div>

            <div className="rounded-3xl border border-[#B8925A]/15 bg-[#EFE9DD]/5 p-10 backdrop-blur-xl transition hover:border-[#B8925A]">

              <h3 className="text-3xl font-bold text-[#B8925A]">

                Commitment

              </h3>

              <p className="mt-6 leading-8 text-[#EFE9DD]/50">

                Every customer is treated like family.
                Your success is our biggest achievement.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= OUR MISSION ================= */}

      <section className="bg-[#0E211B] py-28">

        <div className="mx-auto max-w-5xl rounded-3xl border border-[#B8925A]/15 bg-[#EFE9DD]/5 p-12 text-center backdrop-blur-xl">

          <span className="rounded-full border border-[#B8925A]/30 bg-[#B8925A]/10 px-5 py-2 font-semibold text-[#D9B383]">

            Our Mission

          </span>

          <h2 className="mt-8 text-3xl sm:text-4xl md:text-5xl font-bold">

            Making Real Estate
            <span className="text-[#B8925A]">

              {" "}Simple & Trustworthy

            </span>

          </h2>

          <p className="mt-8 text-lg leading-9 text-[#EFE9DD]/50">

            Our mission is to redefine the real estate
            experience by combining technology, trust
            and expert guidance.

            We strive to help every buyer, seller and
            investor make confident decisions through
            verified listings, transparent pricing and
            personalized assistance.

          </p>

        </div>

      </section>
            {/* ================= CALL TO ACTION ================= */}

            <section className="relative overflow-hidden bg-[#0E211B] py-28">

{/* Green Glow */}

<div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#B8925A]/10 blur-3xl"></div>

<div className="relative mx-auto max-w-6xl px-6">

  <div className="rounded-[40px] border border-[#B8925A]/15 bg-[#EFE9DD]/5 p-12 backdrop-blur-xl text-center">

    <span className="rounded-full border border-[#B8925A]/30 bg-[#B8925A]/10 px-5 py-2 font-semibold text-[#D9B383]">

      Start Your Journey

    </span>

    <h2 className="mt-8 text-3xl sm:text-4xl md:text-5xl font-bold md:text-6xl">

      Find Your
      <span className="text-[#B8925A]">

        {" "}Dream Property

      </span>

    </h2>

    <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-[#EFE9DD]/50">

      Whether you're buying your first home,
      investing in commercial property or
      searching for luxury living,
      GO REALTORS is here to guide you
      every step of the way.

    </p>

    <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">

      <button className="rounded-xl bg-[#B8925A] px-10 py-4 text-lg font-semibold text-[#0E211B] transition duration-300 hover:scale-105 hover:bg-[#D9B383] hover:shadow-xl hover:shadow-green-500/30">

        Explore Properties

      </button>

      <button className="rounded-xl border border-[#B8925A] px-10 py-4 text-lg font-semibold text-[#B8925A] transition duration-300 hover:bg-[#B8925A] hover:text-[#0E211B]">

        Contact Us

      </button>

    </div>

  </div>

</div>

</section>

{/* ================= FOOTER STRIP ================= */}

<section className="border-t border-[#B8925A]/15 bg-[#0E211B] py-8">

<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-center text-[#EFE9DD]/40 md:flex-row">

  <p>

    © {new Date().getFullYear()} GO REALTORS.
    All Rights Reserved.

  </p>

  <div className="flex gap-8">

    <span className="transition hover:text-[#B8925A] cursor-pointer">

      Privacy Policy

    </span>

    <span className="transition hover:text-[#B8925A] cursor-pointer">

      Terms & Conditions

    </span>

    <span className="transition hover:text-[#B8925A] cursor-pointer">

      Support

    </span>

  </div>

</div>

</section>

</main>
);
}