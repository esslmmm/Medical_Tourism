// 'use client';
// import { FiEdit2 } from "react-icons/fi";
// import React, { useState } from 'react';

// interface UserProfile {
//     name: string;
//     phone: string;
//     email: string;
//     password: string;
// }

// const Profile: React.FC = () => {
//     const [user, setUser] = useState<UserProfile>({
//         name: "Ekkarat Singkhala",
//         phone: "+66 819320420",
//         email: "6531501137@lamduan.mfu.ac.th",
//         password: "**********",
//     });
//     const [editingField, setEditingField] = useState<keyof UserProfile | null>(null);
//     const [tempValue, setTempValue] = useState<string>("");

//     const handleEditClick = (field: keyof UserProfile) => {
//         setEditingField(field);
//         setTempValue(user[field]);
//     };

//     const handleSave = () => {
//         if (editingField) {
//             setUser({ ...user, [editingField]: tempValue });
//             setEditingField(null);
//         }
//     };

    

//     return (
//         <main className="flex h-screen w-screen  bg-gray-100 flex-col items-center justify-center p-6">
//             <div className="bg-white p-10 rounded-xl shadow-xl  w-full max-w-6xl text-center flex flex-col items-center h-full m-">
//                 {/* Profile Picture */}
//                 <div className="relative w-40 h-40 m-10">
//                     <div className="w-40 h-40 rounded-full border bg-gray-200"></div>
//                     <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 transition-all cursor-pointer">
//                         <FiEdit2 className="text-gray-600" size={24} />
//                     </div>
//                 </div>
//                 {/* User Details */}
//                 <div className="w-full bg-zinc-50 p-8 rounded-lg shadow-md max-w-4xl flex flex-col gap-6">
//                     <h2 className="text-3xl font-bold text-gray-700 text-center m-2">Profile Details</h2>
//                     <div className="text-2xl">
//                         {(Object.keys(user) as Array<keyof UserProfile>).map((field, index) => (
//                             <div key={index} className="flex flex-col items-start border border-gray-200 pb-10 transition-all hover:bg-gray-100 p-4 rounded-lg m-5">
//                                 <div className="flex justify-between w-full">
//                                     <p className="text-gray-600 font-semibold">{field.charAt(0).toUpperCase() + field.slice(1)}</p>
//                                     {editingField === field ? (
//                                         <></>
//                                     ) : (
//                                         <FiEdit2 className="text-gray-600 cursor-pointer hover:text-teal-600 transition-all self-end text-center" size={20} onClick={() => handleEditClick(field)} />
//                                     )}

//                                 </div>
                                
//                                 {editingField === field ? (
//                                     <input
//                                         type="text"
//                                         className="border border-gray-200 p-3 w-full rounded-md text-black outline-none focus:ring-2 focus:ring-teal-500 transition-all"
//                                         value={tempValue}
//                                         onChange={(e) => setTempValue(e.target.value)}
//                                     />
//                                 ) : (
//                                     <p className="text-black text-2xl font-medium w-full text-start mt-3">{user[field]}</p> 
//                                 )}
//                                 {editingField === field ? (
//                                     <button className="text-teal-600 font-semibold px-4 py-2 bg-teal-100 rounded-lg hover:bg-teal-200 transition-all mt-2" onClick={handleSave}>Save</button>
//                                 ) : (<></>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// };

// export default Profile;
