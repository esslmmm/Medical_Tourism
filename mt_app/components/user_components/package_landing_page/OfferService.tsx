"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Packages {
  package_id: number;
  package_name: string;
  description: description[]
}
interface description {
  description_id: number;
  title: string;
  details: string;
}
type ServiceType = "accommodation_booking" | "Interpreter";

interface ServicesProps {
  selectedServices: Record<ServiceType, boolean>;
}

const OfferService: React.FC<ServicesProps> = ({selectedServices}) => {
  const { id } = useParams();
  const [data, setData] = useState<Packages | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  //Getting the Package data
    useEffect(() => {
      const fetchPackage = async () => {
        try {
          const res = await fetch(`/api/services/packages/${id}`);
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Unknown error');
          }
  
          const json = await res.json();
          setData(json);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPackage();
    }, [id]);

  const navigateToMedicalAppointment = () => {
    router.push(`/user/accommodation_booking/${id}`);
  };

  const handleStart = () => {
  const selected = Object.entries(selectedServices)
    .filter(([_, value]) => value)
    .map(([key]) => key as ServiceType);

  if (selected.length === 0) {
    alert('Please select at least one service.');
    return;
  }

  localStorage.setItem('selectedSteps', JSON.stringify(selected));
  localStorage.setItem('currentStepIndex', '0');

  router.push(`/user/${selected[0]}/${id}`);
};

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Book Button Styled as a Div */}
        <div
          onClick={handleStart}
          className="cursor-pointer w-2/3 sm:w-1/2 md:w-2/3 bg-green-400 text-white text-lg px-8 py-4 font-semibold rounded-2xl hover:bg-green-700 transition duration-300 flex justify-center mx-auto"
        >
          Book
        </div>

      {/* Services Section */}
      <section className="py-12 text-center">
        <h2 className="text-2xl text-[#000000] font-bold mb-6">Offer Service</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {data?.description.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-[#000000] text-lg">{service.title}</h3>
              {service.details && (
                <p className="text-gray-600 text-sm mt-2">{service.details}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default OfferService;
