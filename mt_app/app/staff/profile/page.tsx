'use client';
import React, { useState, useEffect } from 'react';
import { ChevronDown } from "lucide-react";
import axios from 'axios';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState({
    id: 0,
    name: '',
    email: '',
    nationality: '',
    role: '',
    image: null as File | null,
    imagePreview: ''
  });

  const [originalProfile, setOriginalProfile] = useState<typeof profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch admin profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/profile');
        const data = res.data;

        const sanitizedProfile = {
          id: data.id ?? 0,
          name: data.name ?? '',
          email: data.email ?? '',
          nationality: data.nationality ?? '',
          role: data.role ?? '',
          image: null,
          imagePreview: data.image || ''
        };

        setProfile(sanitizedProfile);
        setOriginalProfile(sanitizedProfile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await axios.put("/api/profile", {
        name: profile.name || '',
        nationality: profile.nationality || '',
        role: profile.role || '',
      });

      const updatedProfile = res.data;

      const newProfile = {
        id: updatedProfile.id ?? profile.id,
        name: updatedProfile.name ?? profile.name,
        email: updatedProfile.email ?? profile.email,
        nationality: updatedProfile.nationality ?? profile.nationality,
        role: updatedProfile.role ?? profile.role,
        image: null,
        imagePreview: updatedProfile.image || profile.imagePreview,
      };

      setProfile(newProfile);
      setOriginalProfile(newProfile);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (originalProfile) setProfile(originalProfile);
    setIsEditing(false);
  };

  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
    'Bangladesh', 'Belgium', 'Brazil', 'Canada', 'China', 'Denmark',
    'Egypt', 'Finland', 'France', 'Germany', 'India', 'Indonesia',
    'Italy', 'Japan', 'Mexico', 'Netherlands', 'Norway', 'Pakistan',
    'Philippines', 'Poland', 'Russia', 'Saudi Arabia', 'South Africa',
    'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Thailand',
    'Turkey', 'Ukraine', 'United Kingdom', 'United States', 'Vietnam'
  ];

  return (
    <div className="min-h-screen from-teal-50 via-white to-purple-50 bg-gradient-to-br">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-300">
          {/* Header */}
          <div className=" px-8 py-6 rounded-t-2xl  bg-gradient-to-r from-teal-900 to-slate-800 p-8 text-white relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {/* Profile Picture */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-2 border-gray-300">
                    {profile.imagePreview ? (
                      <img
                        src={profile.imagePreview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-white text-2xl font-semibold"
                      >
                        {profile.name
                          ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase()
                          : 'U'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Name + Email */}
                <div>
                  <h2 className="text-2xl font-bold text-white">{profile.name || 'User Name'}</h2>
                  <p className="text-white mt-1">{profile.email || 'Not set'}</p>
                </div>
              </div>

              {/* Edit Button */}
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2.5 text-white rounded-lg hover:opacity-90 transition-opacity bg-teal-500 hover:bg-teal-700 font-bold flex items-center space-x-2"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="px-8 py-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h3>

            <div className="space-y-6">
              {/* Name */}
              <div className="grid grid-cols-3 gap-4 items-start">
                <label className="text-md font-bold text-gray-700 pt-2">Full Name :</label>
                <div className="col-span-2">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profile.name || ''}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-500 text-gray-900"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <p className="text-gray-900 py-2.5">{profile.name || 'Not set'}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="grid grid-cols-3 gap-4 items-start">
                <label className="text-md font-bold text-gray-700 pt-2">Email Address :</label>
                <div className="col-span-2">
                  <p className="text-gray-500 py-2.5 text-md">{profile.email || 'Not set'}</p>
                </div>
              </div>

              {/* Nationality */}
              <div className="grid grid-cols-3 gap-4 items-start">
  <label className="text-md font-bold text-gray-700 pt-2">Nationality :</label>
  <div className="col-span-2">
    {isEditing ? (
      <div className="relative">
        <select
          name="nationality"
          value={profile.nationality || ''}
          onChange={handleInputChange}
          className="w-full appearance-none px-5 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-500 text-gray-900"
        >
          <option value="">Select your nationality</option>
          {countries.map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          size={20}
        />
      </div>
    ) : (
      <p className="text-gray-900 py-2.5">{profile.nationality || 'Not set'}</p>
    )}
  </div>
</div>

              {/* Role */}
              {profile.role !== 'user' && (
  <div className="grid grid-cols-3 gap-4 items-start">
    <label className="text-md font-bold text-gray-700 pt-2">Role :</label>
    <div className="col-span-2">
      <p className="text-gray-500 py-2.5">{profile.role || 'Not set'}</p>
    </div>
  </div>
)}

            </div>

            {/* Buttons */}
            {isEditing && (
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-6 py-2.5 text-white rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center space-x-2 bg-teal-500 hover:bg-teal-700"
                >
                  {loading && (
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// 'use client';
// import React, { useState, useEffect } from 'react';
// import { ChevronDown, Edit3, Save, X, User, Camera } from "lucide-react";
// import axios from 'axios';

// const Profile: React.FC = () => {
//   const [profile, setProfile] = useState({
//     id: 0,
//     name: '',
//     email: '',
//     nationality: '',
//     role: '',
//     image: null as File | null,
//     imagePreview: ''
//   });

//   const [originalProfile, setOriginalProfile] = useState<typeof profile | null>(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get('/api/profile');
//         const data = res.data;

//         const sanitizedProfile = {
//           id: data.id ?? 0,
//           name: data.name ?? '',
//           email: data.email ?? '',
//           nationality: data.nationality ?? '',
//           role: data.role ?? '',
//           image: null,
//           imagePreview: data.image || ''
//         };

//         setProfile(sanitizedProfile);
//         setOriginalProfile(sanitizedProfile);
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setProfile(prev => ({ ...prev, [name]: value }));
//   };

//   // New: handle image selection & preview (does not change how save works)
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0] ?? null;
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setProfile(prev => ({
  //       ...prev,
  //       image: file,
  //       imagePreview: String(reader.result ?? '')
  //     }));
  //   };
  //   reader.readAsDataURL(file);
  // };

//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.put("/api/profile", {
//         name: profile.name || '',
//         nationality: profile.nationality || '',
//         role: profile.role || '',
//       });

//       const updated = res.data;

//       const newProfile = {
//         id: updated.id ?? profile.id,
//         name: updated.name ?? profile.name,
//         email: updated.email ?? profile.email,
//         nationality: updated.nationality ?? profile.nationality,
//         role: updated.role ?? profile.role,
//         image: null,
//         imagePreview: updated.image || profile.imagePreview,
//       };

//       setProfile(newProfile);
//       setOriginalProfile(newProfile);
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     if (originalProfile) setProfile(originalProfile);
//     setIsEditing(false);
//   };

//   const countries = [
//     "Thailand", "Vietnam", "Japan", "China", "Indonesia", "India", "United States",
//     "United Kingdom", "France", "Germany", "Brazil", "Canada", "Australia"
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 w-full space-y-6">
//       <div className="max-w-4xl mx-auto">

//         {/* CARD */}
//         <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

//           {/* HEADER */}
//           <div className="bg-gradient-to-r from-teal-900 to-slate-800 p-8 text-white relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
//             <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

//             <div className="relative z-10 flex flex-col items-center">
//               {/* Profile Image with upload */}
//               <div className="relative group mb-4 w-32 h-32">
//                 <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
//                   {profile.imagePreview ? (
//                     // eslint-disable-next-line @next/next/no-img-element
//                     <img src={profile.imagePreview} alt="Profile" className="w-full h-full object-cover" />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center">
//                       <User className="w-16 h-16 text-blue-600" />
//                     </div>
//                   )}
//                 </div>

//                 {/* camera overlay (always visible on hover; active while editing) */}
                // <label
                //   htmlFor="profile-image-input"
                //   className={`absolute bottom-0 right-0 translate-y-3 translate-x-3 bg-white rounded-full p-2 shadow-md cursor-pointer transition-transform
                //     ${isEditing ? 'opacity-100 scale-100' : 'opacity-90 scale-95 group-hover:scale-105'}`}
                //   title="Change profile image"
                // >
                //   <Camera className="w-5 h-5 text-slate-800" />
                // </label>

                // <input
                //   id="profile-image-input"
                //   type="file"
                //   accept="image/*"
                //   onChange={handleImageChange}
                //   className="hidden"
                // />
//               </div>

//               <h2 className="text-2xl font-bold mb-1">{profile.name || 'User Name'}</h2>
//               <p className="text-blue-100 text-lg">{profile.email || 'No email set'}</p>
//             </div>
//           </div>

//           {/* BODY */}
//           <div className="p-8 space-y-6">

//             <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>

//             {/* Field Group */}
//             <div className="grid gap-6">

//               {/* NAME */}
//               <div className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100/50 transition">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h4 className="text-lg font-semibold text-gray-800 mb-2">Full Name</h4>

//                     {isEditing ? (
//                       <input
//                         name="name"
//                         value={profile.name}
//                         onChange={handleInputChange}
//                         className="w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500"
//                         placeholder="Enter your name"
//                       />
//                     ) : (
//                       <p className="text-gray-900 text-lg font-medium">{profile.name || 'Not set'}</p>
//                     )}
//                   </div>


//                 </div>
//               </div>

//               {/* EMAIL (display only) */}
//               <div className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100/50 transition">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h4 className="text-lg font-semibold text-gray-800 mb-2">Email Address</h4>
//                     <p className="text-gray-900 text-lg font-medium">{profile.email || 'Not set'}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* NATIONALITY */}
//               <div className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100/50 transition">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h4 className="text-lg font-semibold text-gray-800 mb-2">Nationality</h4>

//                     {isEditing ? (
//                       <div className="relative">
//                         <select
//                           name="nationality"
//                           value={profile.nationality}
//                           onChange={handleInputChange}
//                           className="w-full p-4 border-2 rounded-xl appearance-none"
//                         >
//                           <option value="">Select nationality</option>
//                           {countries.map(country => (
//                             <option key={country} value={country}>{country}</option>
//                           ))}
//                         </select>
//                         <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
//                       </div>
//                     ) : (
//                       <p className="text-gray-900 text-lg font-medium">
//                         {profile.nationality || "Not set"}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* ROLE */}
//               {profile.role !== "user" && (
//                 <div className="bg-gray-50 rounded-2xl p-6">
//                   <h4 className="text-lg font-semibold text-gray-800 mb-2">Role</h4>
//                   <p className="text-gray-900 text-lg font-medium">{profile.role || 'Not set'}</p>
//                 </div>
//               )}

//             </div>

//             {/* BUTTONS */}
//             {isEditing && (
//               <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
//                 <button
//                   onClick={handleCancel}
//                   className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={handleSave}
//                   disabled={loading}
//                   className="px-6 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-700 flex items-center gap-2"
//                 >
//                   {loading ? 'Saving...' : 'Save Changes'}
//                 </button>
//               </div>
//             )}

//             {!isEditing && (
//           <div className="mt-8 pt-8 border-t border-gray-200 justify-end flex">
//                             <div className="flex flex-col sm:flex-row gap-4">
//                                 <button  onClick={() => setIsEditing(true)} className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-700 transition-all hover:scale-105 shadow-md hover:shadow-lg">
//                                     <Edit3 className="w-5 h-5" />
//                                     Edit Profile
//                                 </button>
//                             </div>
//                         </div>
//                   )}

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

