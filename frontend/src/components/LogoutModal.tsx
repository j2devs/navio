import React from 'react';

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    onBackToSettings: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({isOpen, onClose, onConfirm, onBackToSettings}) => {
    if (!isOpen) return null;

    return (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 relative">
            {/* Close Button - Enhanced */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 bg-slate-100 hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 rounded-full flex items-center justify-center text-slate-600 hover:text-red-600 transition-all duration-300 hover:shadow-md hover:scale-105"
            >
                ×
            </button>

            {/* Back Button - Enhanced */}
            <button
                onClick={onBackToSettings}
                className="absolute top-4 left-4 w-8 h-8 bg-slate-100 hover:bg-gradient-to-r hover:from-violet-100 hover:to-cyan-100 rounded-full flex items-center justify-center text-slate-600 hover:text-violet-600 transition-all duration-300 hover:shadow-md hover:scale-105"
            >
                ←
            </button>

            {/* Title - added left padding for back button */}
            <div className="mb-6 pl-12">
                <h2 className="text-2xl font-bold text-slate-800">Log out</h2>
            </div>

            {/* Message */}
            <p className="text-slate-600 mb-8">
                Are you sure you want to log out? You'll need to sign in again to access your account.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={onClose}
                    className="flex-1 py-3 px-6 bg-slate-100 text-slate-600 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="flex-1 py-3 px-6 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
                >
                    Log out
                </button>
            </div>
        </div>
    </div>);
};

export default LogoutModal; 