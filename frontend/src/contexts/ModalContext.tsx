import type {ReactNode} from 'react';
import React, {createContext, useContext, useMemo, useState} from 'react';
import SettingsPopup from '../components/SettingsPopup';
import ProfileSettingsModal from '../components/ProfileSettingsModal';

import LogoutModal from '../components/LogoutModal';
import ShareProfileModal from '../components/ShareProfileModal';

type ModalType = 'settings' | 'profile' | 'logout' | 'share' | null;

interface ModalContextType {
    activeModal: ModalType;
    openModal: (modal: ModalType) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

interface ModalProviderProps {
    children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({children}) => {
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    const openModal = (modal: ModalType) => {
        setActiveModal(modal);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    const backToSettings = () => {
        setActiveModal('settings');
    };

    const handleLogout = () => {
        console.log('User logged out');
        setActiveModal(null);
    };

    const value = useMemo(() => ({ activeModal, openModal, closeModal }), [activeModal]);

    return (<ModalContext.Provider value={value}>
            {children}

            {/* Global Modals */}
            <SettingsPopup
                isOpen={activeModal === 'settings'}
                onClose={closeModal}
                onProfileSettings={() => openModal('profile')}
                
                onLogout={() => openModal('logout')}
            />

            <ProfileSettingsModal
                isOpen={activeModal === 'profile'}
                onClose={closeModal}
                onBackToSettings={backToSettings}
            />

            

            <LogoutModal
                isOpen={activeModal === 'logout'}
                onClose={closeModal}
                onConfirm={handleLogout}
                onBackToSettings={backToSettings}
            />

            <ShareProfileModal
                isOpen={activeModal === 'share'}
                onClose={closeModal}
                username="tester"
            />
        </ModalContext.Provider>);
}; 