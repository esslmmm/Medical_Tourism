"use client";
import { useRouter } from "next/navigation";

export default function OfferService() {
  const router = useRouter();

  const services = [
    {
      title: "General health screening",
      description: "Blood tests, cholesterol, diabetes check, etc.",
    },
    {
      title: "Physical examination",
      description: "By a certified doctor.",
    },
    {
      title: "ECG and chest X-ray.",
      description: "",
    },
    {
      title: "Consultation and health report",
      description: "With recommendations.",
    },
    {
      title: "Ultrasound or other diagnostic tests.",
      description: "",
    },
  ];

  const navigateToMedicalAppointment = () => {
    router.push(`/user/medical_appointment`);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Book Button Styled as a Div */}
        <div
          onClick={navigateToMedicalAppointment}
          className="cursor-pointer w-2/3 sm:w-1/2 md:w-2/3 bg-green-400 text-white text-lg px-8 py-4 font-semibold rounded-2xl hover:bg-green-700 transition duration-300 flex justify-center mx-auto"
        >
          Book
        </div>

      {/* Services Section */}
      <section className="py-12 text-center">
        <h2 className="text-2xl text-[#000000] font-bold mb-6">Offer Service</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-[#000000] text-lg">{service.title}</h3>
              {service.description && (
                <p className="text-gray-600 text-sm mt-2">{service.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
