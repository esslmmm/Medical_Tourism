import React from 'react';

interface TopicInputModalProps {
  show: boolean;
  onClose: () => void;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  isSending: boolean;
  isConnected: boolean;
  isUploading: boolean;
  onSubmit: () => void;
  formData: {
    name: string;
    email: string;
    typeofproblem: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    typeofproblem: string;
  }>>;
}

const TopicInputModal: React.FC<TopicInputModalProps> = ({
  show,
  onClose,
  message,
  setMessage,
  isSending,
  isConnected,
  isUploading,
  onSubmit,
  formData,
  setFormData,
}) => {
  const typeofproblem = [
    { value: 'general', label: 'General Support' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'sales', label: 'Sales Inquiry' }
  ];

  const handleSubmitPreChat = () => {
    if (!formData.name || !formData.email || !formData.typeofproblem || !message) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit();
    onClose(); // Close modal after starting
  };

  const handleCancel = () => {
    onClose();
    setFormData({ name: '', email: '', typeofproblem: '' });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-2 text-gray-900">
          Start New Customer Service Chat
        </h3>

        <p className="text-sm text-gray-600 mb-4">
          We're here to help! Please fill out the information below to get started.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your name"
              disabled={isSending || !isConnected || isUploading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
              disabled={isSending || !isConnected || isUploading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type of problem *</label>
            <select
              value={formData.typeofproblem}
              onChange={(e) => setFormData({ ...formData, typeofproblem: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSending || !isConnected || isUploading}
            >
              <option value="">Select department</option>
              {typeofproblem.map((dept) => (
                <option key={dept.value} value={dept.value}>
                  {dept.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">How can we help?</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent h-16"
              placeholder="Describe your issue..."
              disabled={isSending || !isConnected || isUploading}
            />
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              onClick={handleCancel}
              disabled={isSending}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmitPreChat}
              disabled={
                !formData.name ||
                !formData.email ||
                !formData.typeofproblem ||
                !message ||
                isSending
              }
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Starting...</span>
                </div>
              ) : (
                'Start Chat'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicInputModal;