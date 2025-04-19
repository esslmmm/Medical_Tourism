"use client";

import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import Footer from "../../../components/user_components/Main/Footer";
import "../../../app/globals.css";

const services = [
  { icon: "❤️", name: "Heart" },
  { icon: "🎗", name: "Cancer" },
  { icon: "🦴", name: "Bone" },
  { icon: "🧠", name: "Brain" },
  { icon: "🚑", name: "Trauma" },
  { icon: "✅", name: "Check-up" },
  { icon: "🔪", name: "Surgery" },
  { icon: "🦷", name: "Dental" },
  { icon: "👶", name: "Child" },
  { icon: "💆", name: "Aesthetic" },
  { icon: "👁️", name: "Eye & ENT" },
  { icon: "➕", name: "Others" },
];

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto  space-y-10  p-20">
        {/* Header */}
        <div className="overflow-hidden rounded-2xl  shadow-xl transition-transform duration-300 hover:scale-105 ">
    <Image
      src="/img/hospital1.png"
      alt="Hospital Building"
      width={800}
      height={500}
      className="object-cover w-full h-auto"
    />
  </div>

        {/* Title and Info */}
        <div className="space-y-2 m-10">
          <h1 className="text-3xl font-bold text-gray-800">
            MAE FAH LUANG MEDICAL CENTER HOSPITAL
          </h1>
          <div className="flex items-center text-gray-700">
            <MapPin className="w-5 h-5 mr-1" />
            <p>365 Nang Lae, Mueang Chiang Rai District, Chiang Rai 57100</p>
          </div>
          <p className="text-gray-600 text-sm max-w-4xl">
            MAE FAH LUANG MEDICAL CENTER HOSPITAL was established in 1972 as one
            of the first private hospitals in Thailand. Over the past 50 years
            we have expanded our operations to become a tertiary care facility
            with dedicated hospitals for cancer and cardiology.
          </p>
        </div>

        {/* Services */}
        <div className="space-y-4 m-10 ">
          <h2 className="text-2xl font-semibold text-gray-800">Services</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
            {services.map((service) => (
              <div
                key={service.name}
                className="p-4 text-center rounded-2xl shadow hover:shadow-lg transition"
              >
                <div>
                  <div className="text-2xl mb-2">{service.icon}</div>
                  <p className="text-sm font-medium text-gray-700">
                    {service.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
