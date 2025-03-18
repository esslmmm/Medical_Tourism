"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const timeSlots = [
  "7:00 - 7:30", "7:30 - 8:00", "8:00 - 8:30", "8:30 - 9:00", 
  "9:00 - 9:30", "9:30 - 10:00", "10:00 - 10:30", "10:30 - 11:00", 
  "11:00 - 11:30", "11:30 - 12:00", "12:00 - 12:30", "12:30 - 13:00"
];

export default function MedicalAppointment() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [details, setDetails] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Appointment Booking Section */}
      <div className="p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-xl font-bold text-center mb-4">Book an Appointment</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Date Picker */}
          <div>
            <p className="font-medium mb-2">📅 Date</p>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              className="border bg-gray-50 border-gray-300 p-2 w-full rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-2">
              {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"}
            </p>
          </div>
          {/* Time Slots */}
          <div>
            <p className="font-medium mb-2">⏰ Time</p>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  className={`p-2 border bg-gray-50 border-gray-300 rounded-lg text-center ${
                    selectedTime === time ? "bg-green-100 text-green-600 border-green-500" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Symptoms Details Section */}
      <div className="p-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-xl font-bold text-center mb-4">Symptoms Details</h2>
        {/* File Upload */}
        <div className="mb-4">
          <label className="block font-medium mb-2">Medical Report</label>
          <label className="flex items-center justify-between w-full p-3 border bg-gray-50 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100">
            <span className="text-gray-500">{file ? file.name : "Select File"}</span>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
        {/* Textarea for Symptoms Details */}
        <div className="mb-4">
          <label className="block font-medium mb-2">More details about symptoms</label>
          <textarea
            className="w-full p-3 border bg-gray-50 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Fill details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
      </div>

      {/* Continue Button */}
      <button className="w-full py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
        Continue
      </button>
    </div>
  );
}
