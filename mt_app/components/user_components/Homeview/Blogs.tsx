"use client";
import {
  ChevronRight,
} from "lucide-react";

const Blogs = () => {
    // 🔹 Blogs
  const blogs = [
    {
      title: "Top 5 Hospital in ASEAN 2025",
      tag: "Ranking",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=300&fit=crop",
    },
    {
      title: "Top 5 Hospital in Thailand 2025",
      tag: "Ranking",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop",
    },
    {
      title: "Tips for Medical Abroad",
      tag: "Medical Service",
      image:
        "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&h=250&fit=crop",
    },
    {
      title: "Top 5 Hospital in ASEAN 2025",
      tag: "Ranking",
      image:
        "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400&h=300&fit=crop",
    },
  ];

    // 🔹 Scroll Functions
  const scrollLeft = (id: string) => {
    const container = document.getElementById(id);
    if (container) container.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (id: string) => {
    const container = document.getElementById(id);
    if (container) container.scrollBy({ left: 300, behavior: "smooth" });
  };


  return (
    <div><section className="max-w-7xl mx-auto px-6 py-7 pb-3 relative">
  <h2 className="text-3xl font-bold mb-8">Blogs</h2>

  <button
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100"
    onClick={() => scrollLeft("blogs-scroll")}
  >
    <ChevronRight className="w-6 h-6 rotate-180 text-teal-500" />
  </button>
  <button
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100"
    onClick={() => scrollRight("blogs-scroll")}
  >
    <ChevronRight className="w-6 h-6 text-teal-500" />
  </button>

  <div
    id="blogs-scroll"
    className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar pb-4"
  >
    {blogs.map((blog, idx) => (
      <div
        key={idx}
        className="min-w-[320px] relative rounded-2xl overflow-hidden h-64 w-99 group cursor-pointer flex-shrink-0"
      >
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <span className="inline-block px-3 py-1 bg-teal-400 text-white rounded-full text-xs mb-3">
            {blog.tag}
          </span>
          <h3 className="text-white text-xl font-bold mb-3">{blog.title}</h3>
          <a
            href="#"
            className="text-white hover:text-teal-300 font-medium flex items-center gap-1"
          >
            Learn more <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    ))}
  </div>
</section></div>
  )
}
export default Blogs