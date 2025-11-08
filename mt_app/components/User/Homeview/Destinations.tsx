"use client";
import {
  ChevronRight,
} from "lucide-react";

const Destinations = () => {
    // 🔹 Scroll Functions
  const scrollLeft = (id: string) => {
    const container = document.getElementById(id);
    if (container) container.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (id: string) => {
    const container = document.getElementById(id);
    if (container) container.scrollBy({ left: 300, behavior: "smooth" });
  };

  // 🔹 Destinations
  const destinations = [
    {
      name: "Phuket",
      image:
        "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400&h=300&fit=crop",
    },
    {
      name: "Bangkok",
      image:
        "https://static.independent.co.uk/2025/01/03/14/newFile-12.jpg",
    },
    {
      name: "Chiang Mai",
      image:
        "https://content.r9cdn.net/rimg/dimg/d7/a3/11b8ae51-city-6042-1638dab0fe6.jpg?width=1200&height=630&xhint=1542&yhint=1041&crop=true",
    },
    {
      name: "Chiang Rai",
      image:
        "https://images.unsplash.com/photo-1671188893377-ee825a53d27f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDQ3fHxjaGlhbmclMjByYWl8ZW58MHx8fHwxNjg1MzM5OTUxfDA&ixlib=rb-4.0.3&q=80&w=2000",
    },
  ];
  return (
    <div><section className="max-w-7xl mx-auto px-6 py-5 pb-24 relative">
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-3xl font-bold">Popular Destinations</h2>
    <a href="#" className="text-teal-500 hover:text-teal-600 flex items-center gap-1">
      View All <ChevronRight className="w-4 h-4" />
    </a>
  </div>

  <button
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100"
    onClick={() => scrollLeft("destinations-scroll")}
  >
    <ChevronRight className="w-6 h-6 rotate-180 text-teal-500" />
  </button>
  <button
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100"
    onClick={() => scrollRight("destinations-scroll")}
  >
    <ChevronRight className="w-6 h-6 text-teal-500" />
  </button>

  <div
    id="destinations-scroll"
    className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar pb-4"
  >
    {destinations.map((destination, idx) => (
      <div
        key={idx}
        className="min-w-[300px] relative rounded-lg overflow-hidden h-64 w-99 group cursor-pointer flex-shrink-0"
      >
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <h3 className="absolute bottom-8 left-6 text-white text-3xl font-bold">
          {destination.name}
        </h3>
      </div>
    ))}
  </div>
</section></div>
  )
}
export default Destinations