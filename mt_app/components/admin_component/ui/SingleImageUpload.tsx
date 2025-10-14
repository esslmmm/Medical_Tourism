'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useFileUpload } from '@/hooks/useFileUpload';

interface SingleImageUploadProps {
  image?: string | null;
  onImageChange: (imageUrl: string | null) => void;
  disabled?: boolean;
  placeholder?: string;
}

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  image,
  onImageChange,
  disabled = false,
  placeholder = "Click to upload image or drag and drop"
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, isUploading, uploadProgress, error } = useFileUpload();
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0]; // Only take the first file
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    try {
      const result = await uploadFile(file);
      onImageChange(result.url);
    } catch (err) {
      console.error('Upload failed:', err);
      alert(`Failed to upload ${file.name}`);
    }
  };

  const handleRemoveImage = () => {
    onImageChange(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={disabled}
        />
        
        {isUploading ? (
          <div className="space-y-2">
            <Loader2 className="h-8 w-8 mx-auto animate-spin text-blue-600" />
            <p className="text-sm text-gray-600">Uploading... {uploadProgress}%</p>
          </div>
        ) : image ? (
          <div className="space-y-2">
            <img
              src={image}
              alt="Uploaded"
              className="h-32 w-full object-cover rounded-lg mx-auto"
            />
            <p className="text-sm text-gray-600">Click to replace image</p>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="h-8 w-8 mx-auto text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">{placeholder}</p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      {/* Remove Button */}
      {image && !isUploading && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleRemoveImage}
            disabled={disabled}
            className="inline-flex items-center px-3 py-1 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors disabled:opacity-50"
          >
            <X className="h-4 w-4 mr-1" />
            Remove Image
          </button>
        </div>
      )}

      {/* Image Status */}
      <div className="text-sm text-gray-600 text-center">
        {image ? '1 image uploaded' : 'No image uploaded'}
      </div>
    </div>
  );
};

export default SingleImageUpload;
