'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SingleImageUpload from '@/components/admin_component/ui/SingleImageUpload';
import ImageUpload from '@/components/admin_component/ui/ImageUpload';
import '@/app/admin/styles/globals.css';
import { ToastContainer, useToast } from '@/components/admin_component/ui/Toast';

const AddPlacePage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toasts, removeToast, showSuccess, showError } = useToast();
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [placeImages, setPlaceImages] = useState<Array<{ id: string; url: string; name: string; publicId?: string }>>([]);
  
  const [formData, setFormData] = useState({
      name: '',
      contact_info: '',
      location: {
        text: '',
        url: '',
      },
      city: '',
      description: '',
      fee: '',
    });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Handle nested location fields separately
    if (name === 'text' || name === 'url') {
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [name]: value,
        },
      }));
    } else {
      // Handle all other top-level fields
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (imageUrl: string | null) => {
    setImage(imageUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/services/places', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          fee: formData.fee ? parseFloat(formData.fee) : null,
          image: image,
          place_images: placeImages.map(img => img.url),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create place');
      }

      showSuccess('Place updated', 'The place has been saved successfully');
      setTimeout(() => {
        router.push('/admin/places');
      }, 2000);
    } catch (error) {
      console.error('Error creating place:', error);
      showError('Create failed', 'Please check the form and try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <ToastContainer toasts={toasts} onRemove={removeToast} />
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Place</h1>
            <p className="text-gray-600">Create a new tourist destination</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          {/* Main Image Upload */}
          <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Place Image
              </label>
              <SingleImageUpload
                image={image}
                onImageChange={handleImageChange}
                disabled={loading}
                placeholder="Click to upload main place image or drag and drop"
              />
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Place Name */}
            <div className="md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Place Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter place name"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>

              <input
                type="text"
                id="text"
                name="text"
                value={formData.location?.text}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                placeholder="Enter location name"
              />

              <input
                type="text"
                id="url"
                name="url"
                value={formData.location?.url}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter location URL"
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter city"
              />
            </div>

            {/* Contact Info */}
            <div>
              <label htmlFor="contact_info" className="block text-sm font-medium text-gray-700 mb-2">
                Contact Information
              </label>
              <input
                type="text"
                id="contact_info"
                name="contact_info"
                value={formData.contact_info}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Phone, email, or website"
              />
            </div>

            {/* Fee */}
            <div>
              <label htmlFor="fee" className="block text-sm font-medium text-gray-700 mb-2">
                Entry Fee ($)
              </label>
              <input
                type="number"
                id="fee"
                name="fee"
                value={formData.fee}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter place description"
              />
            </div>

            {/* Additional Images Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Images
              </label>
              <ImageUpload
                images={placeImages}
                onImagesChange={setPlaceImages}
                maxImages={10}
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Place'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
    </>
  );
};

export default AddPlacePage;
