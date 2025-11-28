import {
  Star,
  ChevronRight,
} from "lucide-react";

interface Packages {
  package_name: string;
  package_type: string;
  rating: number;
  detail: string;
  reviews: number;
  bookings: number;
  image: string;
}

const RecommendPackage: React.FC<{ packages: Packages[] }> = ({packages}) => {
  // 🔹 Scroll Functions
  const scrollLeft = (id: string) => {
    const container = document.getElementById(id);
    if (container) container.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (id: string) => {
    const container = document.getElementById(id);
    if (container) container.scrollBy({ left: 300, behavior: "smooth" });
  };

  // const packages = [
  //   {
  //     name: "Metal Health Package",
  //     rating: 4.8,
  //     reviews: 180,
  //     bookings: 150,
  //     tag: "Medical Package",
  //     discount: "34% OFF",
  //     oldPrice: 3000,
  //     price: 2000,
  //     image:
  //       "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop",
  //   },
  //   {
  //     name: "Dental Package",
  //     rating: 4.8,
  //     reviews: 180,
  //     bookings: 150,
  //     tag: "Medical Package",
  //     discount: "33% OFF",
  //     oldPrice: 3000,
  //     price: 2000,
  //     image:
  //       "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=250&fit=crop",
  //   },
  //   {
  //     name: "Physical Therapy Package",
  //     rating: 4.8,
  //     reviews: 160,
  //     bookings: 150,
  //     tag: "Medical Tourism Package",
  //     discount: "33% OFF",
  //     oldPrice: 3000,
  //     price: 2000,
  //     image:
  //       "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
  //   },
  //   {
  //     name: "Mental Health Package",
  //     rating: 4.8,
  //     reviews: 180,
  //     bookings: 150,
  //     tag: "Medical Package",
  //     discount: "34% OFF",
  //     oldPrice: 3000,
  //     price: 2000,
  //     image:
  //       "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop",
  //   },
  //   {
  //     name: "Metal Health Package",
  //     rating: 4.8,
  //     reviews: 180,
  //     bookings: 150,
  //     tag: "Medical Package",
  //     discount: "34% OFF",
  //     oldPrice: 3000,
  //     price: 2000,
  //     image:
  //       "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop",
  //   },
  // ];
  
  return (
    <div><section className="max-w-7xl mx-auto py-8 pb-5 relative">
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-3xl font-bold">Recommended Packages</h2>
    <a href="#" className="text-teal-500 hover:text-teal-600 flex items-center gap-1">
      View All <ChevronRight className="w-4 h-4" />
    </a>
  </div>

  {/* Scroll Buttons */}
  <button
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100"
    onClick={() => scrollLeft("packages-scroll")}
  >
    <ChevronRight className="w-6 h-6 rotate-180 text-teal-500" />
  </button>
  <button
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 z-10 hover:bg-gray-100"
    onClick={() => scrollRight("packages-scroll")}
  >
    <ChevronRight className="w-6 h-6 text-teal-500" />
  </button>

  {/* Scrollable Container */}
  <div
    id="packages-scroll"
    className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar scrollbar-hide pb-4"
  >
    {packages.map((pkg, idx) => (
      <div
        key={idx}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
      >
        <div className="relative">
          <img src={pkg.image} alt={pkg.package_name} className="w-full h-48 object-cover" />
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg mb-2">{pkg.package_name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-3">
                {pkg.detail}
              </p>
          </div>
          <div className="inline-block px-3 py-1 bg-teal-100 text-teal-600 rounded-full text-xs mb-3">
            {pkg.package_type}
          </div>
        </div>
      </div>
    ))}
  </div>
</section></div>
  )
}
export default RecommendPackage