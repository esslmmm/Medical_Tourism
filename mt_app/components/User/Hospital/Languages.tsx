import React from "react";

interface languageProps {
  hospital: Hospital | null;
}
interface Hospital {
  Thai: boolean;
  Arabic: boolean;
  Myanmar: boolean;
  English: boolean;
}

const Languages: React.FC<languageProps> = ({ hospital }) => {{
  if(!hospital) return;
  return (
    <div className="max-w-7xl mx-auto py-6 relative  ">
      <h2 className="text-3xl font-bold mb-8 text-black">Available Languages</h2>
      <div className="flex gap-4">
        {hospital.English && <div className="flex items-center gap-4 bg-white  text-lg px-4 py-2 rounded-full border border-gray-300"><span className="font-bold text-black">🇬🇧 English</span></div>}
        {hospital.Thai && <div className="flex items-center gap-4 bg-white  text-lg px-4 py-2 rounded-full border border-gray-300"><span className="font-bold text-black">🇹🇭 Thai</span></div>}
        {hospital.Arabic && <div className="flex items-center gap-4 bg-white  text-lg px-4 py-2 rounded-full border border-gray-300"><span className="font-bold text-black">🇸🇦 Arabic</span></div>}
        {hospital.Myanmar && <div className="flex items-center gap-4 bg-white  text-lg px-4 py-2 rounded-full border border-gray-300"><span className="font-bold text-black">🇲🇲 Myanmar</span></div>}
      </div>
    </div>
  )
}
};
export default Languages