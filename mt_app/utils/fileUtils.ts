// utils/fileUtils.ts
export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  fileType?: 'image' | 'file';
}

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  resource_type: string;
  format: string;
  bytes: number;
  url: string;
  created_at: string;
}

// File type configurations
export const FILE_CONFIG = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: {
    image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    file: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ]
  }
};

/**
 * Validate file before upload
 */
export const validateFile = (file: File): FileValidationResult => {
  // Check file size
  if (file.size > FILE_CONFIG.maxSize) {
    return {
      isValid: false,
      error: `File size must be less than ${formatFileSize(FILE_CONFIG.maxSize)}`
    };
  }

  // Check file type and determine category
  let fileType: 'image' | 'video' | 'audio' | 'file' | undefined;
  
  if (FILE_CONFIG.allowedTypes.image.includes(file.type)) {
    fileType = 'image';
  } else if (FILE_CONFIG.allowedTypes.file.includes(file.type)) {
    fileType = 'file';
  } else {
    return {
      isValid: false,
      error: 'File type not supported. Supported types: Images, Videos, Audio, PDF, Word documents, Text files, ZIP files'
    };
  }

  return {
    isValid: true,
    fileType
  };
};

/**
 * Format file size in human readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Get file icon based on file type
 */
export const getFileIcon = (fileType: string): string => {
  if (fileType.startsWith('image/')) return '🖼️';
  if (fileType === 'application/pdf') return '📄';
  if (fileType.includes('word') || fileType.includes('document')) return '📝';
  if (fileType === 'text/plain') return '📄';
  return '📎';
};

/**
 * Upload file to Cloudinary with progress tracking
 */
export const uploadToCloudinary = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<CloudinaryUploadResult> => {
  const endpoint = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
  formData.append('folder', 'chat_files');

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        const progress = Math.round((event.loaded / event.total) * 100);
        onProgress(progress);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText);
          if (response.error) {
            reject(new Error(response.error.message));
          } else {
            resolve(response);
          }
        } catch (error) {
          reject(new Error('Failed to parse response'));
        }
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed'));
    });

    xhr.open('POST', endpoint);
    xhr.send(formData);
  });
};

/**
 * Generate thumbnail for video files using Cloudinary transformations
 */
export const generateVideoThumbnail = (videoUrl: string): string => {
  // Extract public_id from Cloudinary URL
  const publicId = videoUrl.split('/').pop()?.split('.')[0];
  if (!publicId) return videoUrl;
  
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/so_0,w_300,h_200,c_fill/${publicId}.jpg`;
};

/**
 * Get optimized image URL with transformations
 */
export const getOptimizedImageUrl = (
  imageUrl: string, 
  width?: number, 
  height?: number,
  quality: number = 80
): string => {
  if (!imageUrl.includes('cloudinary.com')) return imageUrl;
  
  const publicId = imageUrl.split('/').pop()?.split('.')[0];
  if (!publicId) return imageUrl;
  
  let transformation = `q_${quality}`;
  if (width && height) {
    transformation += `,w_${width},h_${height},c_fill`;
  } else if (width) {
    transformation += `,w_${width}`;
  }
  
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transformation}/${publicId}`;
};

/**
 * Check if URL is a Cloudinary URL
 */
export const isCloudinaryUrl = (url: string): boolean => {
  return url.includes('cloudinary.com');
};

/**
 * Extract file extension from URL or filename
 */
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

/**
 * Check if file is an image
 */
export const isImageFile = (fileType: string): boolean => {
  return fileType.startsWith('image/');
};

/**
 * Check if file is a video
 */
export const isVideoFile = (fileType: string): boolean => {
  return fileType.startsWith('video/');
};

/**
 * Check if file is audio
 */
export const isAudioFile = (fileType: string): boolean => {
  return fileType.startsWith('audio/');
};

/**
 * Get display name for file
 */
export const getFileDisplayName = (fileName: string, maxLength: number = 30): string => {
  if (fileName.length <= maxLength) return fileName;
  
  const extension = getFileExtension(fileName);
  const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
  const truncated = nameWithoutExt.substring(0, maxLength - extension.length - 4) + '...';
  
  return `${truncated}.${extension}`;
};