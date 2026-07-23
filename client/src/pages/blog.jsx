import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUser, FaArrowRight, FaSearch } from "react-icons/fa";

// ---- palette reference (matches Home.jsx & Header.jsx) ----
// ink        #0E211B   page background
// ink-panel  #132A22   cards / structured panels
// parchment  #EFE9DD   primary text on dark
// brass      #B8925A   accent, CTAs, highlights
// brass-lt   #D9B383   hover state

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Investing in Luxury Real Estate in 2026",
    excerpt: "Discover the top emerging markets, architectural trends, and financial strategies for high-net-worth real estate investments.",
    category: "Market Trends",
    author: "Shashwat Kashyap",
    date: "June 14, 2026",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "How Vastu Principles Can Transform Your Modern Apartment's Energy",
    excerpt: "Blending ancient architectural wisdom with contemporary design layouts to invite harmony, peace, and abundance into your home.",
    category: "Vastu & Design",
    author: "Ananya Sharma",
    date: "June 08, 2026",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Navigating NRI Property Investments: Documentation & Legal Safety",
    excerpt: "A comprehensive roadmap for Non-Resident Indians looking to purchase hassle-free residential or commercial properties in India.",
    category: "Legal & Advisory",
    author: "Vikram Malhotra",
    date: "May 29, 2026",
    readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Sustainable Living: Why Eco-Friendly Homes Are the Future",
    excerpt: "Exploring energy-efficient materials, solar integrations, and green building certifications that reduce carbon footprints and utility bills.",
    category: "Sustainability",
    author: "Priya Menon",
    date: "May 20, 2026",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Top 5 Architectural Styles Dominating Metropolitan Skylines",
    excerpt: "From minimalist Scandinavian penthouses to neo-classical suburban villas, find out what affluent buyers are demanding right now.",
    category: "Architecture",
    author: "Shashwat Kashyap",
    date: "May 12, 2026",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Home Loan Interest Rates: What Buyers Need to Know Before Applying",
    excerpt: "An expert analysis of current banking policies, fixed vs. floating rates, and how to secure the best mortgage deal for your dream house.",
    category: "Finance",
    author: "Rahul Verma",
    date: "May 02, 2026",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
  },
];

const categories = ["All", "Market Trends", "Vastu & Design", "Legal & Advisory", "Sustainability", "Architecture", "Finance"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on category and search query
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0E211B] text-[#EFE9DD] flex flex-col">
      {/* ================= HERO HEADER ================= */}
      <section className="relative py-24 px-6 text-center border-b border-[#B8925A]/15 bg-[#132A22]/30">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E211B]/60 via-transparent to-[#0E211B]" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <span className="rounded-full bg-[#B8925A]/15 border border-[#B8925A]/40 px-5 py-2 text-[#D9B383] text-sm tracking-wide">
            Insights & Perspectives
          </span>
          
          <h1 className="mt-6 font-serif text-5xl md:text-6xl font-bold text-[#EFE9DD]">
            Our Real Estate <span className="text-[#B8925A]">Journal</span>
          </h1>
          
          <p className="mt-4 text-[#EFE9DD]/60 text-lg">
            Expert advice, market analysis, and architectural inspiration for smart property decisions.
          </p>

          {/* Search Bar Input */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <div className="flex items-center gap-3 rounded-2xl bg-[#132A22] border border-[#B8925A]/30 px-4 py-3.5 shadow-lg">
              <FaSearch className="text-[#B8925A]" />
              <input
                type="text"
                placeholder="Search articles, topics, or trends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-[#EFE9DD] placeholder:text-[#EFE9DD]/40 text-base"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= CATEGORY TABS ================= */}
      <div className="mx-auto max-w-7xl px-6 py-10 w-full overflow-x-auto">
        <div className="flex items-center justify-start md:justify-center gap-3 min-w-max pb-2">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-[#B8925A] text-[#0E211B] shadow-md scale-105"
                  : "bg-[#132A22] text-[#EFE9DD]/70 border border-[#B8925A]/20 hover:border-[#B8925A] hover:text-[#EFE9DD]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ================= BLOG GRID SECTION ================= */}
      <section className="mx-auto max-w-7xl px-6 pb-28 flex-1 w-full">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-[#EFE9DD]/40 font-serif">No articles found matching your criteria.</p>
            <button
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              className="mt-6 rounded-xl bg-[#B8925A] px-6 py-3 font-semibold text-[#0E211B] hover:bg-[#D9B383] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-3xl bg-[#132A22] border border-[#B8925A]/15 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#B8925A]/40"
              >
                {/* Thumbnail Image */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#132A22] via-transparent to-transparent opacity-80" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 rounded-lg bg-[#0E211B]/80 backdrop-blur-md border border-[#B8925A]/30 px-3 py-1 text-xs font-semibold text-[#D9B383]">
                    {post.category}
                  </span>
                </div>

                {/* Content Body */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-xs text-[#EFE9DD]/50 mb-3">
                      <span className="flex items-center gap-1.5">
                        <FaCalendarAlt className="text-[#B8925A]" /> {post.date}
                      </span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="font-serif text-2xl font-semibold text-[#EFE9DD] group-hover:text-[#D9B383] transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="mt-3 text-sm text-[#EFE9DD]/60 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer details */}
                  <div className="mt-6 pt-4 border-t border-[#B8925A]/15 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-[#EFE9DD]/80">
                      <div className="w-7 h-7 rounded-full bg-[#B8925A]/20 flex items-center justify-center text-[#B8925A] font-bold">
                        {post.author.charAt(0)}
                      </div>
                      <span>{post.author}</span>
                    </div>

                    {/* Link placeholder (Change to navigate to individual post route later e.g. /blog/${post.id}) */}
                    <Link
                      to="#"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B8925A] hover:text-[#D9B383] transition-colors"
                    >
                      Read Article <FaArrowRight className="text-xs" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}