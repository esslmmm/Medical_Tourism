"use client";
import {
  ChevronRight,
} from "lucide-react";

const Provider = () => {

      // 🔹 Hospital List
  const hospitals = [
    {
      name: "Mae Fah Luang Medical Center",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=300&fit=crop",
    },
    {
      name: "Ladprao General Hospital",
      image:
        "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=500&h=300&fit=crop",
    },
    {
      name: "Bangkok Hospital",
      image:
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=500&h=300&fit=crop",
    },
    {
      name: "Bumrungrad International Hospital",
      image:
        "https://images.unsplash.com/photo-1598536329656-20f6f7b9a2f7?w=500&h=300&fit=crop",
    },
    {
      name: "Kasemrad Hospital",
      image:
        "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=500&h=300&fit=crop",
    },
  ];
  return (
    <div><section className="max-w-7xl mx-auto px-6 py-7">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Hospital & Clinic</h2>
          <a href="#" className="text-teal-500 hover:text-teal-600 flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          {hospitals.slice(0, 2).map((hospital, idx) => (
            <div key={idx} className="relative rounded-md overflow-hidden h-64 group cursor-pointer">
              <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <h3 className="absolute bottom-6 left-6 text-white text-2xl font-bold">{hospital.name}</h3>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-6">
          {hospitals.slice(2).map((hospital, idx) => (
            <div key={idx} className="relative rounded-lg overflow-hidden h-48 group cursor-pointer">
              <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">{hospital.name}</h3>
            </div>
          ))}
        </div>
      </section></div>
  )
}
export default Provider