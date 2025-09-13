import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import SettingsPopup from '../components/SettingsPopup';
import ProfileSettingsModal from '../components/ProfileSettingsModal';
import ChangePasswordModal from '../components/ChangePasswordModal';
import LogoutModal from '../components/LogoutModal';
import ShareProfileModal from '../components/ShareProfileModal';

type ModalType = 'settings' | 'profile' | 'password' | 'logout' | 'share' | null;

interface ModalContextType {
  activeModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

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

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
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

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}
      
      {/* Global Modals */}
      <SettingsPopup 
        isOpen={activeModal === 'settings'} 
        onClose={closeModal}
        onProfileSettings={() => openModal('profile')}
        onChangePassword={() => openModal('password')}
        onLogout={() => openModal('logout')}
      />
      
      <ProfileSettingsModal 
        isOpen={activeModal === 'profile'} 
        onClose={closeModal}
        onBackToSettings={backToSettings}
      />
      
      <ChangePasswordModal 
        isOpen={activeModal === 'password'} 
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
    </ModalContext.Provider>
  );
}; 