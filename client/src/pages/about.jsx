import {
  FaHome,
  FaUsers,
  FaAward,
  FaHandshake,
  FaCheckCircle,
} from "react-icons/fa";

export default function About() {
  return (
    <main className="bg-green-50 text-black overflow-hidden">

      {/* ================= HERO ================= */}

      <section className="relative bg-gradient-to-r bg-green-50">

        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,#16a34a_0%,transparent_60%)]"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-24">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}

            <div>

              <span className="inline-block rounded-full bg-green-100 text-green-700 px-5 py-2 font-semibold tracking-wide">
                ABOUT GO REALTORS
              </span>

              <h1 className="mt-8 text-5xl lg:text-7xl font-extrabold leading-tight">

                Building Trust.
                <br />

                Finding
                <span className="text-green-600">
                  {" "}Dream Homes.
                </span>

              </h1>

              <p className="mt-8 text-lg leading-8 text-gray-600">

                Go Realtors is a premium real estate consultancy dedicated to
                helping families, investors and first-time buyers discover
                exceptional residential and commercial properties across India.

                <br />
                <br />

                We believe every property purchase should be transparent,
                stress-free and rewarding.

              </p>

              <div className="mt-10 flex flex-wrap gap-5">

                <button className="rounded-xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700">

                  Explore Properties

                </button>

                <button className="rounded-xl border border-green-600 px-8 py-4 font-semibold text-green-600 transition hover:bg-green-50">

                  Contact Us

                </button>

              </div>

            </div>

            {/* Right */}

            <div>

              <img
                loading="lazy"
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury Home"
                className="rounded-3xl shadow-2xl object-cover w-full h-600px"
              />

            </div>

          </div>

        </div>

      </section>

      {/* ================= WHO WE ARE ================= */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Image */}

            <div>

              <img
                loading="lazy"
                src="https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80"
                alt="Office"
                className="rounded-3xl shadow-xl"
              />

            </div>

            {/* Content */}

            <div>

              <p className="uppercase tracking-[4px] text-green-600 font-semibold">
                Who We Are
              </p>

              <h2 className="mt-4 text-5xl font-bold leading-tight">

                More Than Real Estate.
                <br />

                We Build Relationships.

              </h2>

              <p className="mt-8 text-lg text-gray-600 leading-8">

                At Go Realtors, we understand that buying a property is one of
                life's biggest decisions.

                That's why our experienced consultants focus on understanding
                your goals before recommending any property.

              </p>

              <p className="mt-6 text-lg text-gray-600 leading-8">

                Whether you're purchasing your first home, investing in premium
                real estate or expanding your commercial portfolio, we provide
                personalized guidance from property discovery to final
                registration.

              </p>

              <div className="mt-10 space-y-5">

                <div className="flex items-center gap-4">

                  <FaCheckCircle className="text-green-600 text-xl" />

                  <span>Verified Property Listings</span>

                </div>

                <div className="flex items-center gap-4">

                  <FaCheckCircle className="text-green-600 text-xl" />

                  <span>Experienced Real Estate Consultants</span>

                </div>

                <div className="flex items-center gap-4">

                  <FaCheckCircle className="text-green-600 text-xl" />

                  <span>Transparent Buying Process</span>

                </div>

                <div className="flex items-center gap-4">

                  <FaCheckCircle className="text-green-600 text-xl" />

                  <span>Complete Legal & Documentation Support</span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
            {/* ================= TIMELINE ================= */}

            <section className="bg-green-50 py-24">

<div className="max-w-7xl mx-auto px-6 lg:px-12">

  <div className="text-center">

    <p className="uppercase tracking-[4px] text-green-600 font-semibold">
      Our Journey
    </p>

    <h2 className="mt-4 text-5xl font-bold">
      Growing With Trust
    </h2>

    <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
      Every milestone reflects our commitment to helping families,
      investors, and businesses make confident real estate decisions.
    </p>

  </div>

  <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-4">

    <div className="relative rounded-3xl bg-white p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition">

      <span className="text-5xl font-extrabold text-green-600">
        2020
      </span>

      <h3 className="mt-5 text-2xl font-semibold">
        Company Founded
      </h3>

      <p className="mt-4 text-gray-600 leading-7">
        Go Realtors was established with a vision to simplify the real
        estate experience through honesty and transparency.
      </p>

    </div>

    <div className="rounded-3xl bg-white p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition">

      <span className="text-5xl font-extrabold text-green-600">
        2022
      </span>

      <h3 className="mt-5 text-2xl font-semibold">
        Delhi NCR Expansion
      </h3>

      <p className="mt-4 text-gray-600 leading-7">
        Expanded operations across Delhi NCR, partnering with leading
        developers and residential communities.
      </p>

    </div>

    <div className="rounded-3xl bg-white p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition">

      <span className="text-5xl font-extrabold text-green-600">
        2024
      </span>

      <h3 className="mt-5 text-2xl font-semibold">
        500+ Deals Closed
      </h3>

      <p className="mt-4 text-gray-600 leading-7">
        Successfully assisted hundreds of buyers and investors in
        finding premium homes and commercial spaces.
      </p>

    </div>

    <div className="rounded-3xl bg-white p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition">

      <span className="text-5xl font-extrabold text-green-600">
        Today
      </span>

      <h3 className="mt-5 text-2xl font-semibold">
        Trusted Across India
      </h3>

      <p className="mt-4 text-gray-600 leading-7">
        Continuing to grow with a customer-first approach, innovative
        technology, and unmatched service quality.
      </p>

    </div>

  </div>

</div>

</section>

{/* ================= STATS ================= */}

<section className="py-24">

<div className="max-w-7xl mx-auto px-6 lg:px-12">

  <div className="text-center">

    <p className="uppercase tracking-[4px] text-green-600 font-semibold">
      Our Achievements
    </p>

    <h2 className="mt-4 text-5xl font-bold">
      Numbers That Speak
    </h2>

  </div>

  <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

    <div className="rounded-3xl bg-white border border-gray-200 p-10 text-center shadow-lg hover:-translate-y-2 hover:shadow-2xl transition">

      <h3 className="text-5xl font-extrabold text-green-600">
        500+
      </h3>

      <p className="mt-4 text-gray-600 text-lg">
        Premium Properties
      </p>

    </div>

    <div className="rounded-3xl bg-white border border-gray-200 p-10 text-center shadow-lg hover:-translate-y-2 hover:shadow-2xl transition">

      <h3 className="text-5xl font-extrabold text-green-600">
        20+
      </h3>

      <p className="mt-4 text-gray-600 text-lg">
        Cities Served
      </p>

    </div>

    <div className="rounded-3xl bg-white border border-gray-200 p-10 text-center shadow-lg hover:-translate-y-2 hover:shadow-2xl transition">

      <h3 className="text-5xl font-extrabold text-green-600">
        250+
      </h3>

      <p className="mt-4 text-gray-600 text-lg">
        Happy Families
      </p>

    </div>

    <div className="rounded-3xl bg-white border border-gray-200 p-10 text-center shadow-lg hover:-translate-y-2 hover:shadow-2xl transition">

      <h3 className="text-5xl font-extrabold text-green-600">
        8+
      </h3>

      <p className="mt-4 text-gray-600 text-lg">
        Years of Experience
      </p>

    </div>

  </div>

</div>

</section>

{/* ================= MISSION ================= */}

<section className="bg-green-50 py-24">

<div className="max-w-5xl mx-auto px-6 text-center">

  <p className="uppercase tracking-[4px] text-green-600 font-semibold">
    Our Mission
  </p>

  <h2 className="mt-4 text-5xl font-bold text-black">
    Real Estate Made Simple.
  </h2>

  <p className="mt-8 text-xl leading-9 text-grey-100">

    Our mission is to make buying, selling and investing in real estate
    transparent, secure and stress-free. We strive to build lasting
    relationships by providing trusted advice, verified properties and
    exceptional customer service at every step of the journey.

  </p>

</div>

</section>
      {/* ================= WHY CHOOSE US ================= */}

      <section className="py-24 bg-green-50">

        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="text-center">

            <p className="uppercase tracking-[4px] text-green-600 font-semibold">
              Why Choose Us
            </p>

            <h2 className="mt-4 text-5xl font-bold">
              The Go Realtors Difference
            </h2>

            <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600">
              We combine local market expertise with modern technology to deliver
              a seamless property buying and selling experience.
            </p>

          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-md hover:-translate-y-2 hover:shadow-2xl hover:border-green-600 transition duration-300">

              <FaHome className="text-5xl text-green-600 mb-6" />

              <h3 className="text-2xl font-semibold">
                Verified Listings
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Every property undergoes verification to ensure complete
                transparency and peace of mind.
              </p>

            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-md hover:-translate-y-2 hover:shadow-2xl hover:border-green-600 transition duration-300">

              <FaUsers className="text-5xl text-green-600 mb-6" />

              <h3 className="text-2xl font-semibold">
                Expert Advisors
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Our experienced consultants help you choose the right property
                based on your goals and budget.
              </p>

            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-md hover:-translate-y-2 hover:shadow-2xl hover:border-green-600 transition duration-300">

              <FaAward className="text-5xl text-green-600 mb-6" />

              <h3 className="text-2xl font-semibold">
                Trusted Brand
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Hundreds of successful transactions and satisfied clients make
                us a trusted name in Indian real estate.
              </p>

            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-md hover:-translate-y-2 hover:shadow-2xl hover:border-green-600 transition duration-300">

              <FaHandshake className="text-5xl text-green-600 mb-6" />

              <h3 className="text-2xl font-semibold">
                End-to-End Support
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                From your first property visit to final registration, we stay
                with you at every stage.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CORE VALUES ================= */}

      <section className="bg-green-50 py-24">

        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="text-center">

            <p className="uppercase tracking-[4px] text-green-600 font-semibold">
              Our Values
            </p>

            <h2 className="mt-4 text-5xl font-bold">
              Principles That Guide Us
            </h2>

          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-3xl bg-white p-8 shadow-lg">

              <h3 className="text-2xl font-bold text-green-600">
                Transparency
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Honest communication and complete clarity throughout every
                transaction.
              </p>

            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg">

              <h3 className="text-2xl font-bold text-green-600">
                Integrity
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Every recommendation is made with our clients' best interests
                in mind.
              </p>

            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg">

              <h3 className="text-2xl font-bold text-green-600">
                Innovation
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Leveraging technology to make real estate faster, easier and
                smarter.
              </p>

            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg">

              <h3 className="text-2xl font-bold text-green-600">
                Commitment
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Building lifelong relationships through exceptional service and
                trust.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="py-24 bg-gradient-to-r from-green-700 via-green-800 to-black">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Ready to Find Your
            <br />
            Dream Property?
          </h2>

          <p className="mt-8 text-xl text-green-100 leading-8 max-w-3xl mx-auto">
            Whether you're buying your first home, upgrading to luxury living,
            or investing in premium real estate, Go Realtors is here to guide
            you every step of the way.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-6">

            <button className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-green-700 hover:scale-105 transition">
              Explore Properties
            </button>

            <button className="rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white hover:text-green-700 transition">
              Contact Us
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}