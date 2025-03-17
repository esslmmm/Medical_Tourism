import React, { useState } from "react";

interface EditPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newData: { place: string; departTime: string; returnTime: string }) => void;
  currentPlace: string;
  currentDepartTime: string;
  currentReturnTime: string;
}

const EditPopup: React.FC<EditPopupProps> = ({ isOpen, onClose, onSave, currentPlace, currentDepartTime, currentReturnTime }) => {
  const [place, setPlace] = useState(currentPlace);
  const [departTime, setDepartTime] = useState(currentDepartTime);
  const [returnTime, setReturnTime] = useState(currentReturnTime);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">

      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative border border-gray-300">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          ✖
        </button>

        <h2 className="text-lg font-bold mb-4 text-center">Edit Details</h2>

        {/* Select Place to Visit */}
        <label className="block font-bold mb-1">Place to Visit</label>
        <select value={place} onChange={(e) => setPlace(e.target.value)} className="w-full border p-2 rounded-md mb-3">
          <option value="Chiang Rai Hotel">Chiang Rai Hotel</option>
          <option value="Bangkok Hospital">Bangkok Hospital</option>
          <option value="Phuket Beach">Phuket Beach</option>
          <option value="Chiang Mai Temple">Chiang Mai Temple</option>
        </select>

        {/* Select Depart Time */}
        <label className="block font-bold mb-1">Depart Time</label>
        <select value={departTime} onChange={(e) => setDepartTime(e.target.value)} className="w-full border p-2 rounded-md mb-3">
          {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"].map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>

        {/* Select Return Time */}
        <label className="block font-bold mb-1">Return Time</label>
        <select value={returnTime} onChange={(e) => setReturnTime(e.target.value)} className="w-full border p-2 rounded-md mb-3">
          {["2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"].map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">Cancel</button>
          <button onClick={() => onSave({ place, departTime, returnTime })} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditPopup;
