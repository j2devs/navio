import React from 'react';

interface SettingsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileSettings: () => void;
  onChangePassword: () => void;
  onLogout: () => void;
}

const SettingsPopup: React.FC<SettingsPopupProps> = ({
  isOpen,
  onClose,
  onProfileSettings,
  onChangePassword,
  onLogout
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm mx-4 relative shadow-2xl">
        {/* Close Button  */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-slate-100 hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 rounded-full flex items-center justify-center text-slate-600 hover:text-red-600 transition-all duration-300 hover:shadow-md hover:scale-105"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Settings</h2>

        {/* Options */}
        <div className="space-y-3">
          <button
            onClick={onProfileSettings}
            className="w-full text-left py-4 px-6 text-slate-700 bg-slate-50 hover:text-violet-600 hover:bg-gradient-to-r hover:from-violet-100 hover:to-cyan-100 rounded-xl transition-all duration-300 border border-slate-200 hover:border-violet-300 hover:shadow-md cursor-pointer font-medium"
          >
            Profile settings
          </button>

          <button
            onClick={onChangePassword}
            className="w-full text-left py-4 px-6 text-slate-700 bg-slate-50 hover:text-violet-600 hover:bg-gradient-to-r hover:from-violet-100 hover:to-cyan-100 rounded-xl transition-all duration-300 border border-slate-200 hover:border-violet-300 hover:shadow-md cursor-pointer font-medium"
          >
            Change password
          </button>

          <button
            onClick={onLogout}
            className="w-full text-left py-4 px-6 text-slate-700 bg-slate-50 hover:text-red-600 hover:bg-red-100 rounded-xl transition-all duration-300 border border-slate-200 hover:border-red-300 hover:shadow-md cursor-pointer font-medium"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPopup; 