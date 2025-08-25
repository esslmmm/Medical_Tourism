'use client';
import React from 'react';
import { Trash2, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  doctorName?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  doctorName
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop with blur - Google style */}
      <div 
        className="absolute inset-0 backdrop-blur-md" 
        onClick={onClose}
        style={{ backdropFilter: 'blur(8px)' }}
      />
      
      {/* Modal */}
      <div className="relative z-10 transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all max-w-lg w-full">
        {/* Header with close button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
            <Trash2 className="h-8 w-8 text-red-600" />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {title}
          </h3>

          {/* Message */}
          <div className="mb-8">
            <p className="text-gray-600 text-lg leading-relaxed mb-3">
              {message}
            </p>
            {doctorName && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-semibold">
                  Dr. {doctorName}
                </p>
                <p className="text-red-600 text-sm mt-1">
                  This action cannot be undone
                </p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 justify-center">
            <button
              type="button"
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-colors duration-200 min-w-24"
              onClick={onClose}
            >
              {cancelText}
            </button>
            <button
              type="button"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors duration-200 min-w-24 shadow-lg"
              onClick={handleConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;