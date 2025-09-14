import React, {useEffect, useRef, useState} from 'react';

interface ShareProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    username?: string;
}

const ShareProfileModal: React.FC<ShareProfileModalProps> = ({
                                                                 isOpen, onClose, username = 'tester'
                                                             }) => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const profileUrl = `${window.location.origin}/profile/${username}`;

    const showToastMessage = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(profileUrl);
            showToastMessage('Profile link copied to clipboard!');
        } catch {

            const textArea = document.createElement('textarea');
            textArea.value = profileUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToastMessage('Profile link copied!');
        }
    };

    const shareViaEmail = () => {
        const subject = 'Check out my Navio profile!';
        const body = `Hey! Check out my travel profile on Navio: ${profileUrl}`;
        const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = emailUrl;
    };

    const shareOnWhatsApp = () => {
        const text = `Check out my travel profile on Navio: ${profileUrl}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div ref={modalRef} className="bg-white rounded-2xl p-8 w-full max-w-sm mx-4 relative shadow-2xl">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 bg-slate-100 hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 rounded-full flex items-center justify-center text-slate-600 hover:text-red-600 transition-all duration-300 hover:shadow-md hover:scale-105"
            >
                ×
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Share Profile</h2>

            {/* Share Options */}
            <div className="space-y-3">
                {/* Copy Link */}
                <button
                    onClick={copyToClipboard}
                    className="w-full text-left py-4 px-6 text-slate-700 bg-slate-50 hover:text-violet-600 hover:bg-gradient-to-r hover:from-violet-100 hover:to-cyan-100 rounded-xl transition-all duration-300 border border-slate-200 hover:border-violet-300 hover:shadow-md cursor-pointer font-medium flex items-center gap-4"
                >
                    <div
                        className="w-10 h-10 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">📋</span>
                    </div>
                    <div>
                        <div className="font-semibold">Copy Link</div>
                        <div className="text-sm text-slate-500">Copy profile link to clipboard</div>
                    </div>
                </button>

                {/* Email */}
                <button
                    onClick={shareViaEmail}
                    className="w-full text-left py-4 px-6 text-slate-700 bg-slate-50 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 border border-slate-200 hover:border-blue-300 hover:shadow-md cursor-pointer font-medium flex items-center gap-4"
                >
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">📧</span>
                    </div>
                    <div>
                        <div className="font-semibold">Share via Email</div>
                        <div className="text-sm text-slate-500">Send profile link via email</div>
                    </div>
                </button>

                {/* WhatsApp */}
                <button
                    onClick={shareOnWhatsApp}
                    className="w-full text-left py-4 px-6 text-slate-700 bg-slate-50 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-300 border border-slate-200 hover:border-green-300 hover:shadow-md cursor-pointer font-medium flex items-center gap-4"
                >
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">💬</span>
                    </div>
                    <div>
                        <div className="font-semibold">Share on WhatsApp</div>
                        <div className="text-sm text-slate-500">Share profile on WhatsApp</div>
                    </div>
                </button>
            </div>

            {/* Toast Notification */}
            {showToast && (<div
                className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-violet-500 to-cyan-400 text-white px-6 py-3 rounded-xl shadow-lg z-[60] animate-bounce font-semibold">
                <div className="flex items-center gap-2">

                    <span>{toastMessage}</span>
                </div>
            </div>)}
        </div>
    </div>);
};

export default ShareProfileModal; 