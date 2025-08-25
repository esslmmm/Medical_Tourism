'use client';
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastComponent: React.FC<ToastProps> = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'error':
        return <XCircle className="h-8 w-8 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-8 w-8 text-yellow-500" />;
      default:
        return <CheckCircle className="h-8 w-8 text-blue-500" />;
    }
  };

  const getColors = () => {
    switch (toast.type) {
      case 'success':
        return 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 shadow-green-100';
      case 'error':
        return 'border-red-300 bg-gradient-to-r from-red-50 to-pink-50 shadow-red-100';
      case 'warning':
        return 'border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-yellow-100';
      default:
        return 'border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-blue-100';
    }
  };

  return (
    <div className={`min-w-96 w-auto shadow-2xl rounded-xl pointer-events-auto border-2 ${getColors()} transform transition-all duration-500 ease-in-out scale-100 hover:scale-105 backdrop-blur-sm`}>
      <div className="p-6">
        <div className="flex items-center justify-center">
          <div className="flex-shrink-0 mr-4">
            {getIcon()}
          </div>
          <div className="flex-1 text-center">
            <p className="text-lg font-bold text-gray-900 mb-2">{toast.title}</p>
            {toast.message && (
              <p className="text-sm text-gray-700 leading-relaxed">{toast.message}</p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 inline-flex text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
              onClick={() => onRemove(toast.id)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] space-y-4">
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showSuccess = (title: string, message?: string) => {
    addToast({ type: 'success', title, message });
  };

  const showError = (title: string, message?: string) => {
    addToast({ type: 'error', title, message });
  };

  const showWarning = (title: string, message?: string) => {
    addToast({ type: 'warning', title, message });
  };

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
  };
};