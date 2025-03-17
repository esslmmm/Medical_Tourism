import React from "react";

const UserDetail: React.FC = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">👤 User Detail</h2>

      {/* Contact Detail */}
      <div className="bg-white border border-blue-300 shadow-md p-5 rounded-lg mb-6 
                      transition-transform transform hover:-translate-y-1 hover:shadow-lg">
        <h3 className="text-lg font-bold text-blue-600 mb-3">📞 Contact Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <p><span className="font-semibold">First Name:</span> Ekkarat</p>
          <p><span className="font-semibold">Last Name:</span> Singkhala</p>
          <p><span className="font-semibold">Country:</span> Thailand</p>
          <p><span className="font-semibold">Phone:</span> +66 812511440</p>
          <p className="col-span-2"><span className="font-semibold">Email:</span> 6531501137@lamduan.mfu.ac.th</p>
        </div>
      </div>

      {/* Patient Detail */}
      <div className="bg-white border border-green-300 shadow-md p-5 rounded-lg
                      transition-transform transform hover:-translate-y-1 hover:shadow-lg">
        <h3 className="text-lg font-bold text-green-600 mb-3">🏥 Patient Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <p><span className="font-semibold">First Name:</span> Ekkarat</p>
          <p><span className="font-semibold">Last Name:</span> Singkhala</p>
          <p><span className="font-semibold">Gender:</span> Male</p>
          <p><span className="font-semibold">Nationality:</span> Thai</p>
          <p><span className="font-semibold">Date of Birth:</span> 10-10-1990</p>
          <p><span className="font-semibold">Passport ID:</span> AB-365-134-1345</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
