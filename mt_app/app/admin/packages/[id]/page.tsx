'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { ArrowLeft, Edit, MapPin, Clock, ImageIcon } from 'lucide-react';
import '@/app/admin/styles/globals.css';
import ImageModal from '@/components/admin_component/ui/ImageModal';

const PackageDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const packageId = params?.id as string;
  const [pkg, setPkg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/services/packages/${packageId}`);
        
        if (response.ok) {
          const data = await response.json();
          setPkg(data);
        } else {
          const errorText = await response.text();
          console.error('Failed to fetch package details:', response.status, errorText);
        }
      } catch (error) {
        console.error('Error fetching package:', error);
      } finally {
        setLoading(false);
      }
    };

    if (packageId) {
      fetchPackages();
    }
  }, [packageId]);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!pkg) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900">Package not found</h2>
          <p className="text-gray-600 mt-2">The package you're looking for doesn't exist.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/admin/packages')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Packages
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{pkg.package_name}</h1>
              <p className="text-gray-800">Package Details & Information</p>
            </div>
          </div>
          <button
            onClick={() => router.push(`/admin/packages/edit/${pkg.package_id}`)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Package
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Package Profile */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center space-x-6 mb-4">
                {pkg.image && (
                  <img
                    src={pkg.image}
                    alt={pkg.package_name}
                    className="w-20 h-20 object-cover rounded-full border border-gray-200"
                  />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Package ID: {pkg.package_id}</h3>
                  <p className="text-md text-gray-800">Hospital: {pkg.hospitals?.name || 'N/A'}</p>
                  <p className="text-md text-gray-800">Created: {new Date(pkg.create_at).toLocaleDateString()}</p>
                  <p className="text-md text-blue-600 font-medium">Status: {pkg.status}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">About Package</h2>
              <p className="text-gray-900 leading-relaxed">{pkg.detail}</p>
            </div>

            {/* Images */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Images</h2>
              {pkg.package_image && pkg.package_image.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {pkg.package_image.map((image: any, index: number) => (
                    <div 
                      key={image.image_id} 
                      className="relative group cursor-pointer"
                      onClick={() => handleImageClick(index)}
                    >
                      <img
                        src={image.url}
                        alt={image.name || `Trip image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                            View Full
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No images available.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">Status</span>
                  <span className="font-medium text-gray-900">{pkg.status}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">Hospital</span>
                  <span className="font-medium text-sm text-gray-900">{pkg.hospitals?.name || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">Package ID</span>
                  <span className="font-medium font-mono text-sm text-gray-900">{pkg.package_id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">Created</span>
                  <span className="font-medium text-gray-900">{new Date(pkg.create_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push(`/admin/packages/edit/${pkg.package_id}`)}
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Package
                </button>
                {pkg.hospitals && (
                  <button 
                    onClick={() => router.push(`/admin/hospitals/${pkg.hospital_id}`)}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    View Hospital
                  </button>
                )}
                <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Clock className="h-4 w-4 mr-2" />
                  View Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        images={pkg.package_image || []}
        currentIndex={currentImageIndex}
        onIndexChange={setCurrentImageIndex}
      />
      
    </AdminLayout>
  );
};

export default PackageDetailPage;