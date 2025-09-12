import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="profile-container">
      <Navigation />
      
      <div className="profile-content">
        <div className="profile-card">
          <h1 className="profile-title">Profile Settings</h1>
          
          {/* User Information */}
          <div className="profile-section">
            <h2 className="profile-section-title">Account Information</h2>
            <div className="profile-info-grid">
              <div className="profile-info-item">
                <label className="profile-info-label">Display Name</label>
                <div className="profile-info-value">
                  {currentUser?.displayName || 'Not set'}
                </div>
              </div>
              <div className="profile-info-item">
                <label className="profile-info-label">Email Address</label>
                <div className="profile-info-value">
                  {currentUser?.email}
                </div>
              </div>
              <div className="profile-info-item">
                <label className="profile-info-label">User ID</label>
                <div className="profile-info-value mono">
                  {currentUser?.uid}
                </div>
              </div>
              <div className="profile-info-item">
                <label className="profile-info-label">Account Created</label>
                <div className="profile-info-value">
                  {currentUser?.metadata?.creationTime ? 
                    new Date(currentUser.metadata.creationTime).toLocaleDateString() : 
                    'Unknown'
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="profile-actions">
            <h2 className="profile-section-title">Actions</h2>
            <div className="profile-action">
              <button
                onClick={handleLogout}
                className="profile-action-button"
              >
                Sign Out
              </button>
              <p className="profile-action-description">
                Sign out of your account on this device
              </p>
            </div>
          </div>

          {/* App Information */}
          <div className="profile-about">
            <h2 className="profile-section-title">About</h2>
            <div className="profile-about-text">
              <p>
                <strong>Mess Menu Dashboard</strong> - Version 1.1.0
              </p>
              <p>
                A comprehensive solution for managing your mess menu selections and tracking monthly expenses.
              </p>
              <p>
                Built with React, Firebase, and custom CSS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
