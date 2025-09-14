import React, {useState} from 'react';

interface ProfileSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBackToSettings: () => void;
}

const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
                                                                       isOpen, onClose, onBackToSettings
                                                                   }) => {
    const [measurementSystem, setMeasurementSystem] = useState<'metric' | 'imperial'>('metric');
    const [followSettings, setFollowSettings] = useState<'everyone' | 'approve'>('approve');
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);

    if (!isOpen) return null;

    const handleDeleteAccount = () => {
        setShowDeleteWarning(true);
    };

    const confirmDeleteAccount = () => {
        // Delete account işlemi burada yapılacak
        console.log('Account deleted');
        setShowDeleteWarning(false);
        onClose();
    };

    const cancelDeleteAccount = () => {
        setShowDeleteWarning(false);
    };

    return (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 relative shadow-2xl">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 bg-slate-100 hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 rounded-full flex items-center justify-center text-slate-600 hover:text-red-600 transition-all duration-300 hover:shadow-md hover:scale-105 z-10"
            >
                ×
            </button>

            {/* Back Button */}
            <button
                onClick={onBackToSettings}
                className="absolute top-4 left-4 w-8 h-8 bg-slate-100 hover:bg-gradient-to-r hover:from-violet-100 hover:to-cyan-100 rounded-full flex items-center justify-center text-slate-600 hover:text-violet-600 transition-all duration-300 hover:shadow-md hover:scale-105 z-10"
            >
                ←
            </button>

            {/* Title with gradient */}
            <div className="mb-6 pl-12">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
                    Profile settings
                </h2>
            </div>

            {/* Username */}
            <div className="mb-6">
                <label className="block text-slate-600 text-sm font-medium mb-2">Username</label>
                <div
                    className="text-lg font-semibold text-slate-800 bg-gradient-to-r from-violet-100 to-cyan-100 p-3 rounded-xl">
                    tester
                </div>
            </div>

            {/* Your name */}
            <div className="mb-6">
                <label className="block text-slate-600 text-sm font-medium mb-2">Your name</label>
                <input
                    type="text"
                    defaultValue="Tester User"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-300"
                />
            </div>

            {/* Measurement System */}
            <div className="mb-6">
                <label className="block text-slate-600 text-sm font-medium mb-3">Measurement System</label>
                <div className="relative bg-slate-100 rounded-xl p-1">
                    {/* Background  */}
                    <div
                        className={`absolute top-1 bottom-1 left-1 w-1/2 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-lg transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_2px_10px_rgba(139,92,246,0.3)] ${measurementSystem === 'imperial' ? 'translate-x-full' : ''}`}
                    ></div>
                    <div className="flex relative">
                        <button
                            onClick={() => setMeasurementSystem('metric')}
                            className={`flex-1 py-3 px-4 text-sm font-semibold transition-colors duration-300 z-10 ${measurementSystem === 'metric' ? 'text-white' : 'text-slate-600'}`}
                        >
                            Metric (km)
                        </button>
                        <button
                            onClick={() => setMeasurementSystem('imperial')}
                            className={`flex-1 py-3 px-4 text-sm font-semibold transition-colors duration-300 z-10 ${measurementSystem === 'imperial' ? 'text-white' : 'text-slate-600'}`}
                        >
                            Imperial (miles)
                        </button>
                    </div>
                </div>
            </div>

            {/* follow */}
            <div className="mb-8">
                <label className="block text-slate-600 text-sm font-medium mb-3">Who can follow you?</label>
                <div className="relative bg-slate-100 rounded-xl p-1">
                    {/* Background */}
                    <div
                        className={`absolute top-1 bottom-1 left-1 w-1/2 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-lg transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_2px_10px_rgba(139,92,246,0.3)] ${followSettings === 'approve' ? 'translate-x-full' : ''}`}
                    ></div>
                    <div className="flex relative">
                        <button
                            onClick={() => setFollowSettings('everyone')}
                            className={`flex-1 py-3 px-4 text-sm font-semibold transition-colors duration-300 z-10 ${followSettings === 'everyone' ? 'text-white' : 'text-slate-600'}`}
                        >
                            Everyone
                        </button>
                        <button
                            onClick={() => setFollowSettings('approve')}
                            className={`flex-1 py-3 px-4 text-sm font-semibold transition-colors duration-300 z-10 ${followSettings === 'approve' ? 'text-white' : 'text-slate-600'}`}
                        >
                            Only the people I approve
                        </button>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mb-6">
                <button
                    className="px-6 py-3 bg-gradient-to-r from-violet-500 to-cyan-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 shadow-lg">
                    Save settings
                </button>
                <button
                    onClick={handleDeleteAccount}
                    className="flex items-center gap-2 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 border border-transparent hover:border-red-200 hover:shadow-md font-medium"
                >
                    <span className="text-lg">🗑️</span>
                    <span>Delete my account</span>
                </button>
            </div>

            {/* Delete Account Warning */}
            {showDeleteWarning && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[100]">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-sm mx-4 relative shadow-2xl">
                        {/* Close Button */}
                        <button
                            onClick={cancelDeleteAccount}
                            className="absolute top-4 right-4 w-8 h-8 bg-slate-100 hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 rounded-full flex items-center justify-center text-slate-600 hover:text-red-600 transition-all duration-300 hover:shadow-md hover:scale-105"
                        >
                            ×
                        </button>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Delete Account</h3>

                        {/* Message */}
                        <p className="text-slate-600 mb-6">
                            Are you sure you want to delete your account? This action cannot be undone and all your
                            data will be permanently lost.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={cancelDeleteAccount}
                                className="flex-1 py-3 px-6 bg-slate-100 text-slate-600 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeleteAccount}
                                className="flex-1 py-3 px-6 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>)}
        </div>
    </div>);
};

export default ProfileSettingsModal; 