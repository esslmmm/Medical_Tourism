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
    <div>
      <div className="bg-green-400 text-center text-green-600  m-10 p-3 mx-50 rounded-2xl hover:bg-green-500 hover:text-white transition duration-300">
      <button className="px-6 py-2   font-semibold rounded-xl  transition" onClick={navigateToMedicalAppointment}>Book</button>
      </div>

      <section className="py-12 px-6 bg-white text-center">
        <h2 className="text-2xl font-bold mb-6">Offer Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
            >
              <h3 className="font-semibold text-lg">{service.title}</h3>
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
