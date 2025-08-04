import React, { useState } from 'react';
import { validateFile, uploadToCloudinary, formatFileSize } from '@/utils/fileUtils';

interface FileUploadProps {
  onFileUploaded: (fileData: any) => void;
  disabled?: boolean;
}

export const FileUploadComponent: React.FC<FileUploadProps> = ({ 
  onFileUploaded, 
  disabled = false 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateFile(file);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Upload to Cloudinary with progress tracking
      const uploadResult = await uploadToCloudinary(file, setUploadProgress);
      
      // Prepare file data
      const fileData = {
        url: uploadResult.secure_url,
        name: file.name,
        size: file.size,
        type: file.type,
        messageType: validation.fileType,
        publicId: uploadResult.public_id
      };

      onFileUploaded(fileData);
      
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      // Reset input
      event.target.value = '';
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        onChange={handleFileSelect}
        disabled={disabled || isUploading}
        className="hidden"
        id="file-upload"
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
      />
      
      <label
        htmlFor="file-upload"
        className={`cursor-pointer p-2 rounded-full transition-colors ${
          disabled || isUploading
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
      >
        📎
      </label>

      {isUploading && (
        <div className="absolute -top-12 left-0 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {uploadProgress}%
        </div>
      )}
    </div>
  );
};