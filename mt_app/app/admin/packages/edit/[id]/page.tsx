"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin_component/Layout/AdminLayout';
import { Save, Trash2, ArrowLeft, Package as PackageIcon, Plus } from 'lucide-react';
import { useToast, ToastContainer } from '@/components/admin_component/ui/Toast';

interface Description {
  id?: number;
  title: string;
  details: string;
}

interface PackageImage {
  id?: number;
  title: string;
  detail: string;
  images: string;
}

interface RouteItem {
  tour_id: number;
}

interface HospitalDoctor {
  doctor_id: string;
  name: string;
  specialization: string;
}

interface Hospital {
  hospital_id: string;
  name: string;
  doctors: HospitalDoctor[];
}

const EditPackagePage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { toasts, removeToast, showSuccess, showError } = useToast();

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    package_name: '',
    hospital_id: '',
    image: '',
    detail: '',
    duration: '',
    expired_date: '',
    status: 'Active',
  });

  const [descriptions, setDescriptions] = useState<Description[]>([]);
  const [packageImages, setPackageImages] = useState<PackageImage[]>([]);
  const [routes, setRoutes] = useState<RouteItem[]>([]);
  const [selectedDoctorIds, setSelectedDoctorIds] = useState<string[]>([]);
  const [selectedHotelIds, setSelectedHotelIds] = useState<number[]>([]);
  const [selectedGuideIds, setSelectedGuideIds] = useState<number[]>([]);

  // Data from APIs
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [guides, setGuides] = useState<{ guide_id: number; name: string }[]>([]);
  const [hotels, setHotels] = useState<{ hotel_id: number; name: string | null }[]>([]);
  const [trips, setTrips] = useState<{ tour_id: number; description: string | null; duration: number | null }[]>([]);

  // Prefill data
  useEffect(() => {
    const loadAll = async () => {
      try {
        const [pkgRes, hRes, gRes, hoRes, tRes] = await Promise.all([
          fetch(`/api/admin/services/packages/${id}`),
          fetch('/api/admin/services/hospitals'),
          fetch('/api/admin/services/guides'),
          fetch('/api/admin/services/hotels'),
          fetch('/api/admin/services/trips'),
        ]);

        if (!pkgRes.ok) throw new Error('Failed to load package');
        const pkg = await pkgRes.json();

        setFormData({
          package_name: pkg.package_name || '',
          hospital_id: pkg.hospital_id || '',
          image: pkg.image || '',
          detail: pkg.detail || '',
          duration: pkg.duration || '',
          expired_date: pkg.expired_date ? String(pkg.expired_date).slice(0, 10) : '',
          status: pkg.status || 'Active',
        });

        setDescriptions(
          (pkg.description || []).map((d: any) => ({ id: d.description_id, title: d.title || '', details: d.details || '' }))
        );
        setPackageImages(
          (pkg.package_image || []).map((img: any) => ({ id: img.image_id, title: img.title || '', detail: img.detail || '', images: img.images || '' }))
        );
        setRoutes((pkg.routes || []).map((r: any) => ({ tour_id: r.tour_id })));
        setSelectedDoctorIds((pkg.package_doc || []).map((pd: any) => pd.doctor_id));
        setSelectedHotelIds((pkg.package_hotels || []).map((ph: any) => ph.hotel_id));
        setSelectedGuideIds((pkg.package_guides || []).map((pg: any) => pg.guide_id));

        if (hRes.ok) setHospitals(await hRes.json());
        if (gRes.ok) setGuides(await gRes.json());
        if (hoRes.ok) setHotels(await hoRes.json());
        if (tRes.ok) setTrips(await tRes.json());
      } catch (err) {
        console.error(err);
        showError('Failed to load data', 'Please refresh and try again');
      } finally {
        setLoading(false);
      }
    };

    if (id) loadAll();
  }, [id]);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (field === 'hospital_id') {
      setSelectedDoctorIds([]);
    }
  };

  const handleDescriptionChange = (index: number, field: keyof Description, value: string) => {
    const updated = [...descriptions];
    updated[index] = { ...updated[index], [field]: value };
    setDescriptions(updated);
  };

  const handleImageChange = (index: number, field: keyof PackageImage, value: string) => {
    const updated = [...packageImages];
    updated[index] = { ...updated[index], [field]: value };
    setPackageImages(updated);
  };

  const addDescription = () => setDescriptions([...descriptions, { title: '', details: '' }]);
  const removeDescription = (index: number) => setDescriptions(descriptions.filter((_, i) => i !== index));
  const addImage = () => setPackageImages([...packageImages, { title: '', detail: '', images: '' }]);
  const removeImage = (index: number) => setPackageImages(packageImages.filter((_, i) => i !== index));
  const removeRoute = (index: number) => setRoutes(routes.filter((_, i) => i !== index));

  const selectedHospital = useMemo(
    () => hospitals.find(h => String(h.hospital_id) === String(formData.hospital_id)),
    [hospitals, formData.hospital_id]
  );
  const availableDoctors = selectedHospital?.doctors ?? [];
  const allDoctors = useMemo(() => hospitals.flatMap(h => h.doctors || []), [hospitals]);

  // Auto-compute duration from selected routes' trips
  useEffect(() => {
    const selectedDurations = routes
      .map(r => trips.find(t => t.tour_id === r.tour_id)?.duration)
      .filter((d): d is number => typeof d === 'number' && !isNaN(d) && d > 0);

    if (selectedDurations.length === 0) {
      setFormData(prev => ({ ...prev, duration: '' }));
      return;
    }

    const min = Math.min(...selectedDurations);
    const max = Math.max(...selectedDurations);
    const durationStr = min === max ? `${min}` : `${min}-${max}`;
    setFormData(prev => ({ ...prev, duration: durationStr }));
  }, [routes, trips]);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Validate: all feature rows must have a title
      if (descriptions.some(desc => (desc.title || '').trim() === '')) {
        showError('Missing feature titles', 'Please fill Title for all package features');
        setSaving(false);
        return;
      }
      const cleanedDescriptions = descriptions.filter(d => d.title && d.title.trim() !== '');
      const cleanedImages = packageImages.filter(img => img.images && img.images.trim() !== '');

      const payload: any = {
        package_name: formData.package_name,
        hospital_id: formData.hospital_id,
        image: formData.image,
        detail: formData.detail,
        duration: formData.duration || null,
        expired_date: formData.expired_date,
        // For services PUT route expectations
        descriptions: cleanedDescriptions.map(d => ({ id: d.id, title: d.title, text: d.details })),
        images: cleanedImages.map(i => ({ id: i.id, title: i.title, detail: i.detail, images: i.images })),
        routes: routes.map(r => ({ tour_id: r.tour_id })),
        // Keep parity with add page in case backend supports updating these
        doctor_ids: selectedDoctorIds,
        hotel_ids: selectedHotelIds,
        guide_ids: selectedGuideIds,
      };

      const response = await fetch(`/api/admin/services/packages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to update package');
      }

      showSuccess('Package updated', 'The package has been saved successfully');
      setTimeout(() => router.push(`/admin/packages/${id}`), 1200);
    } catch (error) {
      console.error('Error updating package:', error);
      showError('Update failed', 'Please check the form and try again');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push(`/admin/packages/${id}`)}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Package
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Package</h1>
                <p className="text-gray-800">Update medical tourism package</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => router.push(`/admin/packages/${id}`)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-6 text-gray-900">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Package Name *</label>
                    <input
                      type="text"
                      value={formData.package_name}
                      onChange={(e) => handleInputChange('package_name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      placeholder="Enter package name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hospital *</label>
                    <select
                      value={formData.hospital_id}
                      onChange={(e) => handleInputChange('hospital_id', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      required
                    >
                      <option value="">Select Hospital</option>
                      {hospitals.map((hospital) => (
                        <option key={hospital.hospital_id} value={hospital.hospital_id}>
                          {hospital.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      placeholder="e.g., 5 days"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expired Date *</label>
                    <input
                      type="date"
                      value={formData.expired_date}
                      onChange={(e) => handleInputChange('expired_date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Main Image URL *</label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      placeholder="https://example.com/package-image.jpg"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      value={formData.detail}
                      onChange={(e) => handleInputChange('detail', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      placeholder="Detailed description of the package"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Package Features</h2>
                  <button
                    onClick={addDescription}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Feature
                  </button>
                </div>
                <div className="space-y-4">
                  {descriptions.map((description, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium text-gray-900">Feature {index + 1}</h4>
                        <button
                          onClick={() => removeDescription(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                          <input
                            type="text"
                            value={description.title}
                            onChange={(e) => handleDescriptionChange(index, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                            placeholder="e.g., Medical Consultation"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                          <input
                            type="text"
                            value={description.details}
                            onChange={(e) => handleDescriptionChange(index, 'details', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                            placeholder="e.g., Comprehensive health check-up with specialist"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {descriptions.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No package features. Click "Add Feature" to add one.</p>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Gallery Images</h2>
                  <button
                    onClick={addImage}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Image
                  </button>
                </div>
                <div className="space-y-4">
                  {packageImages.map((image, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium text-gray-900">Image {index + 1}</h4>
                        <button
                          onClick={() => removeImage(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                          <input
                            type="text"
                            value={image.title}
                            onChange={(e) => handleImageChange(index, 'title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                            placeholder="e.g., Hospital Exterior"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <input
                            type="text"
                            value={image.detail}
                            onChange={(e) => handleImageChange(index, 'detail', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                            placeholder="e.g., Modern hospital building"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                          <input
                            type="text"
                            value={image.images || ''}
                            onChange={(e) => handleImageChange(index, 'images', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {packageImages.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No gallery images. Click "Add Image" to add one.</p>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Tour Routes</h2>
                  <select
                    value=""
                    onChange={(e) => {
                      const tourId = Number(e.target.value);
                      if (e.target.value && !routes.some(r => r.tour_id === tourId)) {
                        setRoutes([...routes, { tour_id: tourId }]);
                      }
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                  >
                    <option value="">Select Trip</option>
                    {trips.filter(trip => !routes.some(r => r.tour_id === trip.tour_id)).map((trip) => (
                      <option key={trip.tour_id} value={trip.tour_id}>
                        {trip.description || `Trip ${trip.tour_id}`} ({trip.duration || 0} days)
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  {routes.map((route, index) => {
                    const trip = trips.find(t => t.tour_id === route.tour_id);
                    return (
                      <div key={index} className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
                        <span className="text-sm text-gray-900">
                          {trip?.description || `Trip ${route.tour_id}`} ({trip?.duration || 0} days)
                        </span>
                        <button
                          onClick={() => removeRoute(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                  {routes.length === 0 && (
                    <p className="text-gray-500 text-sm py-2">No tour routes selected</p>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-6 text-gray-900">Associated Services</h2>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Doctors</h3>
                    <select
                      value=""
                      onChange={(e) => {
                        if (e.target.value && !selectedDoctorIds.includes(e.target.value)) {
                          setSelectedDoctorIds([...selectedDoctorIds, e.target.value]);
                        }
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                    >
                      <option value="">Select Doctor</option>
                      {availableDoctors
                        .filter(doctor => doctor && doctor.doctor_id && !selectedDoctorIds.includes(doctor.doctor_id))
                        .map((doctor) => (
                          <option key={`doc-${doctor.doctor_id}`} value={doctor.doctor_id}>
                            {doctor.name}{doctor.specialization ? ` - ${doctor.specialization}` : ''}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    {selectedDoctorIds.map((doctorId) => {
                      const doctor = allDoctors.find(d => d && d.doctor_id === doctorId);
                      return (
                        <div key={`doc-${doctorId}`} className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
                          <span className="text-sm text-gray-900">
                            {doctor ? (
                              <>
                                {doctor.name}{doctor.specialization ? ` - ${doctor.specialization}` : ''}
                              </>
                            ) : (
                              String(doctorId)
                            )}
                          </span>
                          <button
                            onClick={() => setSelectedDoctorIds(selectedDoctorIds.filter(id2 => id2 !== doctorId))}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      );
                    })}
                    {selectedDoctorIds.length === 0 && (
                      <p className="text-gray-500 text-sm py-2">No doctors selected</p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Hotels</h3>
                    <select
                      value=""
                      onChange={(e) => {
                        const hotelId = Number(e.target.value);
                        if (e.target.value && !selectedHotelIds.includes(hotelId)) {
                          setSelectedHotelIds([...selectedHotelIds, hotelId]);
                        }
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                    >
                      <option value="">Select Hotel</option>
                      {hotels
                        .filter(h => h && h.hotel_id != null && !selectedHotelIds.includes(h.hotel_id))
                        .map((hotel) => (
                        <option key={`hotel-${hotel.hotel_id}`} value={hotel.hotel_id}>
                          {hotel.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    {selectedHotelIds.map((hotelId) => {
                      const hotel = hotels.find(h => h.hotel_id === hotelId);
                      return (
                        <div key={`hotel-${hotelId}`} className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                          <span className="text-sm text-gray-900">{hotel?.name}</span>
                          <button
                            onClick={() => setSelectedHotelIds(selectedHotelIds.filter(id2 => id2 !== hotelId))}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      );
                    })}
                    {selectedHotelIds.length === 0 && (
                      <p className="text-gray-500 text-sm py-2">No hotels selected</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Guides</h3>
                    <select
                      value=""
                      onChange={(e) => {
                        const guideId = Number(e.target.value);
                        if (e.target.value && !selectedGuideIds.includes(guideId)) {
                          setSelectedGuideIds([...selectedGuideIds, guideId]);
                        }
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
                    >
                      <option value="">Select Guide</option>
                      {guides
                        .filter(g => g && g.guide_id != null && !selectedGuideIds.includes(g.guide_id))
                        .map((guide) => (
                        <option key={`guide-${guide.guide_id}`} value={guide.guide_id}>
                          {guide.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    {selectedGuideIds.map((guideId) => {
                      const guide = guides.find(g => g.guide_id === guideId);
                      return (
                        <div key={`guide-${guideId}`} className="flex items-center justify-between bg-purple-50 border border-purple-200 rounded-lg px-3 py-2">
                          <span className="text-sm text-gray-900">{guide?.name}</span>
                          <button
                            onClick={() => setSelectedGuideIds(selectedGuideIds.filter(id2 => id2 !== guideId))}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      );
                    })}
                    {selectedGuideIds.length === 0 && (
                      <p className="text-gray-500 text-sm py-2">No guides selected</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Package Preview</h3>
                <div className="text-center">
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt={formData.package_name}
                      className="w-full h-32 object-cover rounded-lg mb-3 border border-gray-200"
                    />
                  )}
                  <div className="text-center">
                    <PackageIcon className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  </div>
                  <h4 className="font-semibold text-gray-900">{formData.package_name || 'Package Name'}</h4>
                  <p className="text-sm text-blue-600 font-medium">{formData.duration || 'Duration'}</p>
                  <p className="text-sm text-gray-800 mt-2">{formData.status}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-800">Features</span>
                    <span className="font-medium text-gray-900">{descriptions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800">Gallery Images</span>
                    <span className="font-medium text-gray-900">{packageImages.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800">Tour Routes</span>
                    <span className="font-medium text-gray-900">{routes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800">Doctors</span>
                    <span className="font-medium text-gray-900">{selectedDoctorIds.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800">Hotels</span>
                    <span className="font-medium text-gray-900">{selectedHotelIds.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800">Guides</span>
                    <span className="font-medium text-gray-900">{selectedGuideIds.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default EditPackagePage;
