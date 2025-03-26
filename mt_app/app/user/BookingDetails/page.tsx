'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


// import ContactDetails from '../../../components/user_components/BookingDetails/ContactDetails';
// import PatientDetails from '../../../components/user_components/BookingDetails/PatientDetails';
import MedicalService from '../../../components/user_components/BookingDetails/MedicalService';
import PlaceToVisit from '../../../components/user_components/BookingDetails/PlaceToVisit';
import Accommodation from '../../../components/user_components/BookingDetails/Accommodation';
import Interpreter from '../../../components/user_components/BookingDetails/Interpreter';
import CarService from '../../../components/user_components/BookingDetails/CarService';
// import NavbarBookingDetails from "../../../components/user_components/BookingDetails/NavbarBookingDetails";
// import Footer from "../../../components/user_components/BookingDetails/Footer";

export default function UserForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false); // Prevent multiple clicks
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        
        
        if (loading) return; // Avoid duplicate requests
        setLoading(true);

        try {
            const response = await axios.post('/api/contact_us', {
                firstName,
                lastName,
                email,
                country,
            });

            console.log("Success:", response.data);
            router.refresh(); // Redirect on success
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            {/* <NavbarBookingDetails /> */}
            <div className="flex min-h-screen bg-gray-100 p-10">
                <form className="bg-white p-6 rounded-lg shadow-lg w-2/3">
                <div><h2 className="text-lg font-semibold mb-4 text-black">Contact detail</h2>
          <div className="grid grid-cols-2 gap-4">
              <div>
                  <label className="block text-sm font-medium text-black">First Name</label>
                  <input type="text" className="border p-2 rounded-lg w-full text-black" />
              </div>
              <div>
                  <label className="block text-sm font-medium text-black">Last Name</label>
                  <input type="text" className="border p-2 rounded-lg w-full text-black" />
              </div>
              <div>
                  <label className="block text-sm font-medium text-black">Email</label>
                  <input type="email" className="border p-2 rounded-lg w-full text-black" />
              </div>
              <div>
                  <label className="block text-sm font-medium text-black">Country</label>
                  <select className="border p-2 rounded-lg w-full text-black">
                      <option>Country</option>
                  </select>
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                  <div>
                      <label className="block text-sm font-medium text-black">Phone</label>
                      <select className="border p-2 rounded-lg w-full text-black">
                          <option>Country code</option>
                      </select>
                  </div>
                  <div className="flex items-end">
                      <input type="text" className="border p-2 rounded-lg w-full text-black" placeholder="Number" />
                  </div>
              </div>
          </div></div>
          <div><h2 className="text-lg font-semibold mt-6 mb-4 text-black">Patient detail</h2>
          <div className="grid grid-cols-2 gap-4">
              <div>
                  <label className="block text-sm font-medium text-black">Gender</label>
                  <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-black">
                          <input type="radio" name="gender" value="male" /> Male
                      </label>
                      <label className="flex items-center gap-2 text-black">
                          <input type="radio" name="gender" value="female" /> Female
                      </label>
                  </div>
              </div>
              <div>
              </div>
              <div>
                  <label className="block text-sm font-medium text-black">First Name</label>
                  <input type="text" className="border p-2 rounded-lg w-full text-black" />
              </div>
              <div>
                  <label className="block text-sm font-medium text-black">Last Name</label>
                  <input type="text" className="border p-2 rounded-lg w-full text-black" />
              </div>
              <div className="col-span-2">
                  <label className="block text-sm font-medium text-black">Date of Birth</label>
                  <input type="date" className="border p-2 rounded-lg w-full text-black" />
              </div>
              <div className="col-span-2">
                  <label className="block text-sm font-medium text-black">Passport ID</label>
                  <input type="text" className="border p-2 rounded-lg w-full text-black" />
              </div>
          </div></div>
                    <button type='submit' className="bg-blue-600 text-white p-2 rounded-lg mt-4 w-full">Continue</button>
                </form>
                <div className="w-1/3 ml-6">
                    <MedicalService />
                    <PlaceToVisit />
                    <Accommodation />
                    <Interpreter />
                    <CarService />
                    <div className="mt-4 text-right">
                        <a href="#" className="text-blue-500 text-sm font-semibold">Show all detail</a>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}
