// "use client";

// import { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { format } from "date-fns";
// import emailjs from "emailjs-com";

// const timeSlots = [
//   "7:00 - 7:30", "7:30 - 8:00", "8:00 - 8:30", "8:30 - 9:00",
//   "9:00 - 9:30", "9:30 - 10:00", "10:00 - 10:30", "10:30 - 11:00",
//   "11:00 - 11:30", "11:30 - 12:00", "12:00 - 12:30", "12:30 - 13:00"
// ];

// const countries = [
//   { name: "United States", dial_code: "+1" },
//   { name: "United Kingdom", dial_code: "+44" },
//   { name: "Thailand", dial_code: "+66" },
//   { name: "India", dial_code: "+91" },
//   { name: "Germany", dial_code: "+49" },
//   { name: "Australia", dial_code: "+61" },
//   { name: "Japan", dial_code: "+81" },
//   { name: "France", dial_code: "+33" }
// ];

// export default function MedicalAppointment() {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);
//   const [file, setFile] = useState<File | null>(null);
//   const [details, setDetails] = useState("");
//   const [contact, setContact] = useState({
//     firstName: "", lastName: "", email: "", country: "", dialCode: "", phoneNumber: ""
//   });
//   const [patient, setPatient] = useState({
//     gender: "", firstName: "", lastName: "", dob: "", passportId: ""
//   });

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setFile(event.target.files[0]);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!selectedDate || !selectedTime || !details || !contact.firstName || !contact.lastName || !contact.email || !contact.country || !contact.phoneNumber || !patient.firstName || !patient.lastName || !patient.dob) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     const templateParams = {
//       date: format(selectedDate, "MMMM d, yyyy"),
//       time: selectedTime,
//       details: details,
//       filename: file ? file.name : "No file uploaded",
//       contactFirstName: contact.firstName,
//       contactLastName: contact.lastName,
//       contactEmail: contact.email,
//       contactCountry: contact.country,
//       contactDialCode: contact.dialCode,
//       contactPhone: contact.phoneNumber,
//       patientFirstName: patient.firstName,
//       patientLastName: patient.lastName,
//       patientDob: patient.dob,
//       patientGender: patient.gender,
//       patientPassportId: patient.passportId,
//     };

//     emailjs.send(
//       "service_rp6jko5",
//       "template_xk05doq",
//       templateParams,
//       "spzglw6UCiNIkx_OG"
//     ).then(
//       (response) => {
//         console.log("SUCCESS!", response.status, response.text);
//         alert("Appointment request sent successfully!");
//         setSelectedDate(new Date());
//         setSelectedTime(null);
//         setFile(null);
//         setDetails("");
//         setContact({ firstName: "", lastName: "", email: "", country: "", dialCode: "", phoneNumber: "" });
//         setPatient({ gender: "", firstName: "", lastName: "", dob: "", passportId: "" });
//       },
//       (err) => {
//         console.error("FAILED...", err);
//         alert("Failed to send appointment. Please try again.");
//       }
//     );
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-6 py-10 space-y-10">
//       <div className="text-center text-green-700 py-4">
//         <h1 className="text-4xl font-bold">Book an Appointment</h1>
//       </div>

//       {/* Date & Time */}
//       <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 space-y-6">
//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <label className="block font-semibold mb-2">📅 Select Date</label>
//             <DatePicker
//               selected={selectedDate}
//               onChange={(date) => setSelectedDate(date)}
//               dateFormat="MMMM d, yyyy"
//               className="border border-gray-300 bg-gray-50 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//             />
//             <p className="text-sm text-gray-500 mt-2">
//               {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Choose a date"}
//             </p>
//           </div>

//           <div>
//             <label className="block font-semibold mb-2">⏰ Select Time</label>
//             <div className="grid grid-cols-2 gap-2">
//               {timeSlots.map((time) => (
//                 <button
//                   type="button"
//                   key={time}
//                   onClick={() => setSelectedTime(time)}
//                   className={`p-2 text-sm border rounded-lg transition ${
//                     selectedTime === time
//                       ? "bg-green-100 text-green-700 border-green-500 font-medium"
//                       : "bg-gray-50 border-gray-300 hover:bg-gray-100"
//                   }`}
//                 >
//                   {time}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Symptoms & File */}
//       <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 space-y-6">
//         <h2 className="text-xl font-bold text-center text-green-600">Symptoms Details</h2>
//         {/* <div>
//           <label className="block font-semibold mb-2">📄 Upload Medical Report (Optional)</label>
//           <label className="flex items-center justify-between w-full p-3 border bg-gray-50 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition">
//             <span className="text-gray-500 text-sm">{file ? file.name : "Click to select a file"}</span>
//             <input type="file" className="hidden" onChange={handleFileChange} />
//           </label>
//         </div> */}
//         <div>
//           <label className="block font-semibold mb-2">📝 Describe Your Symptoms</label>
//           <textarea
//             rows={4}
//             value={details}
//             onChange={(e) => setDetails(e.target.value)}
//             className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//             placeholder="Write here..."
//           />
//         </div>
//       </div>

//       {/* Contact Details */}
//       <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 space-y-6">
//   <h2 className="text-lg font-semibold mb-4 text-black">Contact Details</h2>
//   <div className="grid grid-cols-2 gap-4">
//     {[
//       { label: "First Name", value: contact.firstName, key: "firstName" },
//       { label: "Last Name", value: contact.lastName, key: "lastName" },
//       { label: "Email", value: contact.email, key: "email" },
//     ].map(({ label, value, key }) => (
//       <label
//         key={key}
//         className="flex flex-col gap-1 p-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
//       >
//         <span className="font-medium text-sm text-black">{label}</span>
//         <input
//           type="text"
//           value={value}
//           onChange={(e) => setContact({ ...contact, [key]: e.target.value })}
//           className="bg-transparent outline-none text-black"
//         />
//       </label>
//     ))}

//     {/* Country Dropdown */}
//     <label className="flex flex-col gap-1 p-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition col-span-1">
//       <span className="font-medium text-sm text-black">Country</span>
//       <select
//         value={contact.country}
//         onChange={(e) => {
//           const selected = countries.find(c => c.name === e.target.value);
//           setContact({
//             ...contact,
//             country: e.target.value,
//             dialCode: selected?.dial_code || ""
//           });
//         }}
//         className="bg-transparent outline-none text-black"
//       >
//         <option value="">Select Country</option>
//         {countries.map((c) => (
//           <option key={c.name} value={c.name}>{c.name}</option>
//         ))}
//       </select>
//     </label>

//     {/* Dial Code + Phone Number */}
//     <div className="col-span-2 grid grid-cols-2 gap-4">
//       <label className="flex flex-col gap-1 p-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
//         <span className="font-medium text-sm text-black">Dial Code</span>
//         <select
//           value={contact.dialCode}
//           onChange={(e) => setContact({ ...contact, dialCode: e.target.value })}
//           className="bg-transparent outline-none text-black"
//         >
//           <option value="">Select Code</option>
//           {countries.map((c) => (
//             <option key={c.dial_code} value={c.dial_code}>
//               {c.name} ({c.dial_code})
//             </option>
//           ))}
//         </select>
//       </label>

//       <label className="flex flex-col gap-1 p-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
//         <span className="font-medium text-sm text-black">Phone Number</span>
//         <input
//           type="text"
//           value={contact.phoneNumber}
//           onChange={(e) => setContact({ ...contact, phoneNumber: e.target.value })}
//           className="bg-transparent outline-none text-black"
//         />
//       </label>
//     </div>
//   </div>


//         {/* Patient Details */}
//         <h2 className="text-lg font-semibold mt-6 mb-4 text-black">Patient Details</h2>
// <div className="grid grid-cols-2 gap-4">
//   {/* Gender */}
//   <div className="col-span-2">
//     <span className="font-medium text-sm text-black">Gender</span>
//     <div className="flex items-center gap-6 mt-2">
//       {["male", "female"].map((g) => (
//         <label key={g} className="flex items-center gap-2 text-black cursor-pointer">
//           <input
//             type="radio"
//             name="gender"
//             value={g}
//             checked={patient.gender === g}
//             onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
//           />
//           {g.charAt(0).toUpperCase() + g.slice(1)}
//         </label>
//       ))}
//     </div>
//   </div>

//   {[
//     { label: "First Name", value: patient.firstName, key: "firstName" },
//     { label: "Last Name", value: patient.lastName, key: "lastName" },
//     { label: "Date of Birth", value: patient.dob, key: "dob", type: "date" },
//     { label: "Passport ID", value: patient.passportId, key: "passportId" },
//   ].map(({ label, value, key, type = "text" }) => (
//     <label
//       key={key}
//       className={`flex flex-col gap-1 p-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition ${
//         key === "dob" || key === "passportId" ? "col-span-2" : ""
//       }`}
//     >
//       <span className="font-medium text-sm text-black">{label}</span>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => setPatient({ ...patient, [key]: e.target.value })}
//         className="bg-transparent outline-none text-black"
//       />
//     </label>
//   ))}
// </div>

//       </div>

//       {/* Submit */}
//       <div className="text-center">
//         <button
//           type="submit"
//           className="px-8 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition"
//         >
//           Continue
//         </button>
//       </div>
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import emailjs from "emailjs-com";
import { useRouter } from "next/navigation"; // ✅ Import router for redirection

const timeSlots = [
  "7:00 - 7:30", "7:30 - 8:00", "8:00 - 8:30", "8:30 - 9:00",
  "9:00 - 9:30", "9:30 - 10:00", "10:00 - 10:30", "10:30 - 11:00",
  "11:00 - 11:30", "11:30 - 12:00", "12:00 - 12:30", "12:30 - 13:00"
];

const countries = [
  { name: "United States", dial_code: "+1" },
  { name: "United Kingdom", dial_code: "+44" },
  { name: "Thailand", dial_code: "+66" },
  { name: "India", dial_code: "+91" },
  { name: "Germany", dial_code: "+49" },
  { name: "Australia", dial_code: "+61" },
  { name: "Japan", dial_code: "+81" },
  { name: "France", dial_code: "+33" }
];

export default function MedicalAppointment() {
  const router = useRouter(); // ✅ Initialize router
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [details, setDetails] = useState("");
  const [contact, setContact] = useState({
    firstName: "", lastName: "", email: "", country: "", dialCode: "", phoneNumber: ""
  });
  const [patient, setPatient] = useState({
    gender: "", firstName: "", lastName: "", dob: "", passportId: ""
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime || !details || !contact.firstName || !contact.lastName || !contact.email || !contact.country || !contact.phoneNumber || !patient.firstName || !patient.lastName || !patient.dob) {
      alert("Please fill in all required fields.");
      return;
    }

    const templateParams = {
      date: format(selectedDate, "MMMM d, yyyy"),
      time: selectedTime,
      details: details,
      filename: file ? file.name : "No file uploaded",
      contactFirstName: contact.firstName,
      contactLastName: contact.lastName,
      contactEmail: contact.email,
      contactCountry: contact.country,
      contactDialCode: contact.dialCode,
      contactPhone: contact.phoneNumber,
      patientFirstName: patient.firstName,
      patientLastName: patient.lastName,
      patientDob: patient.dob,
      patientGender: patient.gender,
      patientPassportId: patient.passportId,
    };

    emailjs.send(
      "service_rp6jko5",
      "template_xk05doq",
      templateParams,
      "spzglw6UCiNIkx_OG"
    ).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Appointment request sent successfully!");
        router.push("/"); // ✅ Redirect to homepage
      },
      (err) => {
        console.error("FAILED...", err);
        alert("Failed to send appointment. Please try again.");
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-6 py-10 space-y-10">
      <div className="text-center text-green-700 py-4">
        <h1 className="text-4xl font-bold">Book an Appointment</h1>
      </div>

      {/* Date & Time */}
      <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2">📅 Select Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              className="border border-gray-300 bg-gray-50 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <p className="text-sm text-gray-500 mt-2">
              {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Choose a date"}
            </p>
          </div>

          <div>
            <label className="block font-semibold mb-2">⏰ Select Time</label>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <button
                  type="button"
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 text-sm border rounded-lg transition ${
                    selectedTime === time
                      ? "bg-green-100 text-green-700 border-green-500 font-medium"
                      : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Symptoms & File */}
      <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 space-y-6">
        <h2 className="text-xl font-bold text-center text-green-600">Symptoms Details</h2>
        {/* <div>
          <label className="block font-semibold mb-2">📄 Upload Medical Report (Optional)</label>
          <label className="flex items-center justify-between w-full p-3 border bg-gray-50 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition">
            <span className="text-gray-500 text-sm">{file ? file.name : "Click to select a file"}</span>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div> */}
        <div>
          <label className="block font-semibold mb-2">📝 Describe Your Symptoms</label>
          <textarea
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Write here..."
          />
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 space-y-6">
  <h2 className="text-lg font-semibold mb-4 text-black">Contact Details</h2>
  <div className="grid grid-cols-2 gap-4">
    {[
      { label: "First Name", value: contact.firstName, key: "firstName" },
      { label: "Last Name", value: contact.lastName, key: "lastName" },
      { label: "Email", value: contact.email, key: "email" },
    ].map(({ label, value, key }) => (
      <label
        key={key}
        className="flex flex-col gap-1 p-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
      >
        <span className="font-medium text-sm text-black">{label}</span>
        <input
          type="text"
          value={value}
          onChange={(e) => setContact({ ...contact, [key]: e.target.value })}
          className="bg-transparent outline-none text-black"
        />
      </label>
    ))}

    {/* Country Dropdown */}
    <label className="flex flex-col gap-1 p-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition col-span-1">
      <span className="font-medium text-sm text-black">Country</span>
      <select
        value={contact.country}
        onChange={(e) => {
          const selected = countries.find(c => c.name === e.target.value);
          setContact({
            ...contact,
            country: e.target.value,
            dialCode: selected?.dial_code || ""
          });
        }}
        className="bg-transparent outline-none text-black"
      >
        <option value="">Select Country</option>
        {countries.map((c) => (
          <option key={c.name} value={c.name}>{c.name}</option>
        ))}
      </select>
    </label>

    {/* Dial Code + Phone Number */}
    <div className="col-span-2 grid grid-cols-2 gap-4">
      <label className="flex flex-col gap-1 p-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
        <span className="font-medium text-sm text-black">Dial Code</span>
        <select
          value={contact.dialCode}
          onChange={(e) => setContact({ ...contact, dialCode: e.target.value })}
          className="bg-transparent outline-none text-black"
        >
          <option value="">Select Code</option>
          {countries.map((c) => (
            <option key={c.dial_code} value={c.dial_code}>
              {c.name} ({c.dial_code})
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 p-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
        <span className="font-medium text-sm text-black">Phone Number</span>
        <input
          type="text"
          value={contact.phoneNumber}
          onChange={(e) => setContact({ ...contact, phoneNumber: e.target.value })}
          className="bg-transparent outline-none text-black"
        />
      </label>
    </div>
  </div>


        {/* Patient Details */}
        <h2 className="text-lg font-semibold mt-6 mb-4 text-black">Patient Details</h2>
<div className="grid grid-cols-2 gap-4">
  {/* Gender */}
  <div className="col-span-2">
    <span className="font-medium text-sm text-black">Gender</span>
    <div className="flex items-center gap-6 mt-2">
      {["male", "female"].map((g) => (
        <label key={g} className="flex items-center gap-2 text-black cursor-pointer">
          <input
            type="radio"
            name="gender"
            value={g}
            checked={patient.gender === g}
            onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
          />
          {g.charAt(0).toUpperCase() + g.slice(1)}
        </label>
      ))}
    </div>
  </div>

  {[
    { label: "First Name", value: patient.firstName, key: "firstName" },
    { label: "Last Name", value: patient.lastName, key: "lastName" },
    { label: "Date of Birth", value: patient.dob, key: "dob", type: "date" },
    { label: "Passport ID", value: patient.passportId, key: "passportId" },
  ].map(({ label, value, key, type = "text" }) => (
    <label
      key={key}
      className={`flex flex-col gap-1 p-3 bg-gray-50 border border-gray-300 rounded-lg hover:bg-gray-100 transition ${
        key === "dob" || key === "passportId" ? "col-span-2" : ""
      }`}
    >
      <span className="font-medium text-sm text-black">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => setPatient({ ...patient, [key]: e.target.value })}
        className="bg-transparent outline-none text-black"
      />
    </label>
  ))}
</div>

      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="px-8 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition"
        >
          Continue
        </button>
      </div>
    </form>
  );
}