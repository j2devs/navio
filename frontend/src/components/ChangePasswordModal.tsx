import React from 'react';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToSettings: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose, onBackToSettings }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-slate-100 hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 rounded-full flex items-center justify-center text-slate-600 hover:text-red-600 transition-all duration-300 hover:shadow-md hover:scale-105"
        >
          ×
        </button>

        {/* Back Button  */}
        <button
          onClick={onBackToSettings}
          className="absolute top-4 left-4 w-8 h-8 bg-slate-100 hover:bg-gradient-to-r hover:from-violet-100 hover:to-cyan-100 rounded-full flex items-center justify-center text-slate-600 hover:text-violet-600 transition-all duration-300 hover:shadow-md hover:scale-105"
        >
          ←
        </button>

        {/* Title  */}
        <div className="mb-6 pl-12">
          <h2 className="text-2xl font-bold text-slate-800">Change password</h2>
        </div>

        {/* Current Password */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="Current password"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
          />
        </div>

        {/* New Password */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="New password"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-8">
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
          />
        </div>

        {/* Update Button */}
        <div className="text-center">
          <button className="w-full py-3 px-6 bg-violet-500 text-white rounded-xl font-semibold hover:bg-violet-600 transition-colors">
            Update password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal; 