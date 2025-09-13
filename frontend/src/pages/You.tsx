import React, { useState } from 'react';
import TripCard from '../components/TripCard';
import Sidebar from "../components/Sidebar.tsx";
import SettingsPopup from '../components/SettingsPopup';
import ProfileSettingsModal from '../components/ProfileSettingsModal';
import ChangePasswordModal from '../components/ChangePasswordModal';
import LogoutModal from '../components/LogoutModal';
import ShareProfileModal from '../components/ShareProfileModal';

const You: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'settings' | 'profile' | 'password' | 'logout' | 'share' | null>(null);

  const handleSettingsClick = () => {
    setActiveModal('settings');
  };

  const handleShareProfileClick = () => {
    setActiveModal('share');
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleBackToSettings = () => {
    setActiveModal('settings');
  };

  const handleProfileSettings = () => {
    setActiveModal('profile');
  };

  const handleChangePassword = () => {
    setActiveModal('password');
  };

  const handleLogout = () => {
    setActiveModal('logout');
  };

  const handleConfirmLogout = () => {
    // Logout işlemi burada yapılacak
    console.log('User logged out');
    setActiveModal(null);
  };

  return (
    <>
      <Sidebar
        onSettingsClick={handleSettingsClick}
        onShareProfileClick={handleShareProfileClick}
      />
      <section id="trips-section" className="grid gap-8">
        <TripCard />
      </section>

      {/* Modals */}
      <SettingsPopup
        isOpen={activeModal === 'settings'}
        onClose={handleCloseModal}
        onProfileSettings={handleProfileSettings}
        onChangePassword={handleChangePassword}
        onLogout={handleLogout}
      />
      <ProfileSettingsModal
        isOpen={activeModal === 'profile'}
        onClose={handleCloseModal}
        onBackToSettings={handleBackToSettings}
      />
      <ChangePasswordModal
        isOpen={activeModal === 'password'}
        onClose={handleCloseModal}
        onBackToSettings={handleBackToSettings}
      />
      <LogoutModal
        isOpen={activeModal === 'logout'}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
        onBackToSettings={handleBackToSettings}
      />
      <ShareProfileModal
        isOpen={activeModal === 'share'}
        onClose={handleCloseModal}
        username="tester"
      />
    </>
  );
};

export default You;
