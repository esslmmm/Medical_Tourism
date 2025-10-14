'use client';

import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import SingleImageUpload from '@/components/admin_component/ui/SingleImageUpload';
import ImageUpload from '@/components/admin_component/ui/ImageUpload';
import '@/app/admin/styles/globals.css';
import { useToast, ToastContainer } from '@/components/admin_component/ui/Toast';

const AddPlacePage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const placesId = params?.id as string;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toasts, removeToast, showSuccess, showError } = useToast();
  const [saving, setSaving] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [placeImages, setPlaceImages] = useState<Array<{ id: string; url: string; name: string; publicId?: string }>>([]);
  const [formData, setFormData] = useState({
    place_name: '',
    contact_info: '',
    location: '',
    city: '',
    description: '',
    fee: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (imageUrl: string | null) => {
    setImage(imageUrl);
  };

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const response = await fetch(`/api/admin/services/places/${placesId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }
        const data = await response.json();
        setFormData({
          place_name: data.place_name,
          contact_info: data.contact_info,
          location: data.location,
          city: data.city,
          description: data.description,
          fee: data.fee,
        });
        setImage(data.image || null);
        
        // Load existing place_images
        const existingPlaceImages = (data.place_image || []).map((img: any, index: number) => ({
          id: `existing-${img.image_id}`,
          url: img.image,
          name: `Place Image ${index + 1}`,
          publicId: img.image && img.image.includes('cloudinary') 
            ? img.image.split('/').pop()?.split('.')[0] 
            : undefined
        }));
        setPlaceImages(existingPlaceImages);
      } catch (error) {
        setError("Error fetching places. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlaces();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    setSaving(true);
    try {
      // Validate required fields
      if (!formData.place_name.trim()) {
        showError('Missing required field', 'Please enter a place name');
        setSaving(false);
        return;
      }

      const payload: any = {
        place_name: formData.place_name,
        contact_info: formData.contact_info,
        location: formData.location,
        city: formData.city,
        description: formData.description,
        fee: formData.fee ? parseFloat(formData.fee) : 0,
        image: image,
        place_images: placeImages.map(img => img.url),
      };

      const response = await fetch(`/api/admin/services/places/${placesId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to update place');
      }

      showSuccess('Place updated', 'The place has been saved successfully');
      setTimeout(() => router.push(`/admin/places/${placesId}`), 1200);
    } catch (error) {
      console.error('Error updating place:', error);
      showError('Update failed', 'Please check the form and try again');
    } finally {
      setSaving(false);
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
            <h1 className="text-3xl font-bold text-gray-900">Edit Place</h1>
            <p className="text-gray-600">Update {formData.place_name} place</p>
          </div>
        </div>

        {saving && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            Place updated successfully! Redirecting...
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={(e) => handleSave(e)} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          {/* Main Image Upload */}
          <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Place Image
              </label>
              <SingleImageUpload
                image={image}
                onImageChange={handleImageChange}
                disabled={saving}
                placeholder="Click to upload or replace main place image"
              />
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Place Name */}
            <div className="md:col-span-2">
              <label htmlFor="place_name" className="block text-sm font-medium text-gray-700 mb-2">
                Place Name *
              </label>
              <input
                type="text"
                id="place_name"
                name="place_name"
                value={formData.place_name}
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
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter location"
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
                disabled={saving}
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
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Updating...' : 'Update Place'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
    </>
  );
};

export default AddPlacePage;
