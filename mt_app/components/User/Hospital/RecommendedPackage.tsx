import {
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Packages {
  package_id: string;
  package_name: string;
  package_type: string;
  rating: number;
  detail: string;
  reviews: number;
  bookings: number;
  image: string;
}

const RecommendPackage: React.FC<{ packages: Packages[] }> = ({packages}) => {
  const router = useRouter();
  // 🔹 Scroll Functions
  const scrollLeft = (id: string) => {
    const container = document.getElementById(id);
    if (container) container.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (id: string) => {
    const container = document.getElementById(id);
    if (container) container.scrollBy({ left: 300, behavior: "smooth" });
  };

  const navigateTodoctor = (DoctorId: string) => {
    router.push(`/user/packages/${DoctorId}`);
  };
  
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
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
  >
    {packages.map((pkg, idx) => (
      <div
        key={idx}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
      >
        <div className="relative">
          <img src={pkg.image} alt={pkg.package_name} className="w-full h-56 object-cover" />
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg ">{pkg.package_name}</h3>
          <div className="flex items-center gap-2 ">
            <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-3">
                {pkg.detail}
              </p>
          </div>
          <div className="inline-block px-3 py-1 bg-teal-100 text-teal-600 rounded-full text-xs mb-3">
            {pkg.package_type}
          </div>
          <button className="w-full font-bold bg-teal-500 text-white py-2.5 rounded-xl hover:bg-teal-600 active:scale-95 transition-all shadow-sm" onClick={() => navigateTodoctor(pkg.package_id.toString())}>
                  View Details
                </button>
        </div>
      </div>
    ))}
  </div>
</section></div>
  )
}
export default RecommendPackage