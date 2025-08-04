import { useState, useCallback } from 'react';
import { validateFile, uploadToCloudinary } from '../utils/fileUtils';

interface UseFileUploadResult {
  uploadFile: (file: File) => Promise<any>;
  isUploading: boolean;
  uploadProgress: number;
  error: string | null;
}

export const useFileUpload = (): UseFileUploadResult => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(async (file: File) => {
    const validation = validateFile(file);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid file');
      throw new Error(validation.error);
    }

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      const result = await uploadToCloudinary(file, setUploadProgress);
      return {
        url: result.secure_url,
        name: file.name,
        size: file.size,
        type: file.type,
        messageType: validation.fileType,
        publicId: result.public_id
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, []);

  return {
    uploadFile,
    isUploading,
    uploadProgress,
    error
  };
};