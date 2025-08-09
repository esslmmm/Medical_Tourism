import React from 'react'
import { useState } from 'react';
import { Edit3, Save, X, Camera, Phone, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

const Profile = () => {
    const [user, setUser] = useState({
        name: "Ekkarat Singkhala",
        phone: "+66 819320420",
        email: "6531501137@lamduan.mfu.ac.th",
        password: "**********",
    });
    const [editingField, setEditingField] = useState(null);
    const [tempValue, setTempValue] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    const handleEditClick = (field: any) => {
        setEditingField(field);
        setTempValue(field === 'password' ? '' : user[field]);
    };

    const handleSave = () => {
        if (tempValue.trim()) {
            setUser({ ...user, [editingField]: tempValue });
        }
        setEditingField(null);
        setTempValue("");
    };

    const handleCancel = () => {
        setEditingField(null);
        setTempValue("");
    };

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const getFieldIcon = (field: any) => {
        switch (field) {
            case 'name': return <User className="w-5 h-5 text-blue-600" />;
            case 'phone': return <Phone className="w-5 h-5 text-green-600" />;
            case 'email': return <Mail className="w-5 h-5 text-purple-600" />;
            case 'password': return <Lock className="w-5 h-5 text-red-600" />;
            default: return null;
        }
    };

    const getFieldLabel = (field: any) => {
        switch (field) {
            case 'name': return 'Full Name';
            case 'phone': return 'Phone Number';
            case 'email': return 'Email Address';
            case 'password': return 'Password';
            default: return field.charAt(0).toUpperCase() + field.slice(1);
        }
    };

    const validateField = (field: any, value: any) => {
        switch (field) {
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            case 'phone':
                return /^\+?[\d\s-()]+$/.test(value) && value.length >= 10;
            case 'password':
                return value.length >= 6;
            case 'name':
                return value.trim().length >= 2;
            default:
                return true;
        }
    };

    const isValidInput = tempValue && validateField(editingField, tempValue);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 w-full space-y-6" >
            <div className="max-w-4xl mx-auto">
                {/* Main Profile Card */}
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
                        
                        <div className="relative z-10 flex flex-col items-center">
                            {/* Profile Picture */}
                            <div className="relative group mb-6">
                                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                                    {profileImage ? (
                                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <User className="w-16 h-16 text-blue-600" />
                                        </div>
                                    )}
                                </div>
                                <label className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer group-hover:scale-110 transition-transform">
                                    <Camera className="w-5 h-5 text-gray-600" />
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>
                            </div>
                            
                            {/* User Info */}
                            <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                            <p className="text-blue-100 text-lg">{user.email}</p>
                        </div>
                    </div>

                    {/* Profile Fields */}
                    <div className="p-8">
                        <div className="grid gap-6">
                            {["name", "phone", "email", "password"].map((field, index) => (
                                <div key={index} className="group">
                                    <div className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100/50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                {/* Field Header */}
                                                <div className="flex items-center gap-3 mb-3">
                                                    {getFieldIcon(field)}
                                                    <h3 className="text-lg font-semibold text-gray-800">
                                                        {getFieldLabel(field)}
                                                    </h3>
                                                </div>

                                                {/* Field Content */}
                                                {editingField === field ? (
                                                    <div className="space-y-3">
                                                        <div className="relative">
                                                            <input
                                                                type={field === 'password' && !showPassword ? 'password' : 'text'}
                                                                className={`w-full p-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                                                                    isValidInput ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
                                                                }`}
                                                                value={tempValue}
                                                                onChange={(e) => setTempValue(e.target.value)}
                                                                placeholder={`Enter your ${field}`}
                                                                autoFocus
                                                            />
                                                            {field === 'password' && (
                                                                <button
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                                >
                                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                                </button>
                                                            )}
                                                        </div>
                                                        
                                                        {/* Validation Message */}
                                                        {tempValue && !validateField(field, tempValue) && (
                                                            <p className="text-sm text-red-600 flex items-center gap-2">
                                                                <X className="w-4 h-4" />
                                                                {field === 'email' && 'Please enter a valid email address'}
                                                                {field === 'phone' && 'Please enter a valid phone number (min 10 digits)'}
                                                                {field === 'password' && 'Password must be at least 6 characters'}
                                                                {field === 'name' && 'Name must be at least 2 characters'}
                                                            </p>
                                                        )}

                                                        {/* Action Buttons */}
                                                        <div className="flex gap-3 pt-2">
                                                            <button
                                                                onClick={handleSave}
                                                                disabled={!isValidInput}
                                                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                                                                    isValidInput 
                                                                        ? 'bg-green-600 text-white hover:bg-green-700 hover:scale-105 shadow-md hover:shadow-lg' 
                                                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                                }`}
                                                            >
                                                                <Save className="w-4 h-4" />
                                                                Save Changes
                                                            </button>
                                                            <button
                                                                onClick={handleCancel}
                                                                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                                                            >
                                                                <X className="w-4 h-4" />
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1">
                                                            <p className="text-gray-900 text-lg font-medium">
                                                                {field === 'password' ? '••••••••••' : user[field]}
                                                            </p>
                                                            {field === 'email' && (
                                                                <p className="text-sm text-gray-500 mt-1">Used for notifications and account recovery</p>
                                                            )}
                                                            {field === 'phone' && (
                                                                <p className="text-sm text-gray-500 mt-1">For two-factor authentication</p>
                                                            )}
                                                        </div>
                                                        <button
                                                            onClick={() => handleEditClick(field)}
                                                            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all group"
                                                        >
                                                            <Edit3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                            <span className="font-medium">Edit</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Additional Actions */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all hover:scale-105 shadow-md hover:shadow-lg">
                                    <Save className="w-5 h-5" />
                                    Save All Changes
                                </button>
                                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all">
                                    Reset to Default
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;